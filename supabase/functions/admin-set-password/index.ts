import { createClient } from "npm:@supabase/supabase-js@2";
import {
  canManageUserCredentials,
  isStrongAdminPassword,
  isTargetInOrganization,
  isValidAuthUserId,
} from "./policy.mjs";

const productionOrigin = "https://radar360-six.vercel.app";
const recoveryPath = "/redefinir-senha";
const allowedOrigins = new Set([productionOrigin, "http://localhost:3000"]);

function corsHeaders(request: Request) {
  const origin = request.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin) ? origin : productionOrigin,
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    Vary: "Origin",
  };
}

function json(request: Request, status: number, body: Record<string, unknown>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders(request), "Content-Type": "application/json" },
  });
}

function isAllowedRecoveryRedirect(value: string) {
  try {
    const redirect = new URL(value);
    return allowedOrigins.has(redirect.origin) && redirect.pathname === recoveryPath;
  } catch {
    return false;
  }
}

function safeAuthFailure(error: { message?: string; status?: number; code?: string }) {
  const details = `${error.code ?? ""} ${error.message ?? ""}`;
  if (error.status === 429 || /rate|limit/i.test(details)) {
    return { status: 429, code: "RATE_LIMITED", error: "Muitas tentativas. Aguarde alguns minutos e tente novamente." };
  }
  if (/weak|password|character/i.test(details)) {
    return { status: 400, code: "PASSWORD_REJECTED", error: "A senha foi recusada pela política de segurança do Supabase Auth." };
  }
  if (error.status === 404 || /not found/i.test(details)) {
    return { status: 404, code: "AUTH_USER_NOT_FOUND", error: "O usuário correspondente não foi encontrado no Supabase Auth." };
  }
  return { status: 400, code: "AUTH_OPERATION_FAILED", error: "O Supabase Auth recusou a operação administrativa." };
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") return new Response("ok", { headers: corsHeaders(request) });
  if (request.method !== "POST") return json(request, 405, { code: "METHOD_NOT_ALLOWED", error: "Método não permitido." });

  const authorization = request.headers.get("authorization") ?? "";
  const accessToken = authorization.replace(/^Bearer\s+/i, "").trim();
  if (!accessToken) return json(request, 401, { code: "SESSION_MISSING", error: "Sessão administrativa ausente." });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return json(request, 500, { code: "SERVER_CONFIG_MISSING", error: "Serviço administrativo não configurado." });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: callerData, error: callerError } = await admin.auth.getUser(accessToken);
  if (callerError || !callerData.user) {
    return json(request, 401, { code: "SESSION_INVALID", error: "Sessão administrativa inválida ou expirada." });
  }

  const { data: callerProfile, error: profileError } = await admin
    .from("profiles")
    .select("id,role,active,organization_id")
    .eq("user_id", callerData.user.id)
    .maybeSingle();

  if (profileError || !canManageUserCredentials(callerProfile)) {
    return json(request, 403, { code: "ADMIN_REQUIRED", error: "Apenas administradores ativos podem gerenciar credenciais." });
  }

  let payload: { action?: unknown; targetUserId?: unknown; newPassword?: unknown; redirectTo?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json(request, 400, { code: "INVALID_JSON", error: "Requisição inválida." });
  }

  const action = payload.action === "send_recovery" ? "send_recovery" : "set_password";
  const targetUserId = typeof payload.targetUserId === "string" ? payload.targetUserId.trim() : "";
  if (!isValidAuthUserId(targetUserId)) {
    return json(request, 400, { code: "INVALID_TARGET", error: "Usuário de destino inválido." });
  }

  const { data: targetProfile, error: targetError } = await admin
    .from("profiles")
    .select("id,email,organization_id,active")
    .eq("user_id", targetUserId)
    .maybeSingle();

  if (targetError || !isTargetInOrganization(targetProfile, callerProfile.organization_id)) {
    return json(request, 404, { code: "TARGET_NOT_FOUND", error: "Usuário não encontrado nesta organização." });
  }
  if (!targetProfile.active) {
    return json(request, 409, { code: "TARGET_INACTIVE", error: "O usuário está inativo. Ative o acesso antes de gerenciar a senha." });
  }

  const audit = async (auditAction: string, result: "SUCCESS" | "FAILURE", reasonCode?: string) => {
    await admin.from("audit_logs").insert({
      organization_id: callerProfile.organization_id,
      actor_user_id: callerData.user.id,
      action: auditAction,
      resource_type: "auth_user",
      resource_id: targetUserId,
      metadata: { target_profile_id: targetProfile.id, result, ...(reasonCode ? { reason_code: reasonCode } : {}) },
    });
  };

  if (action === "send_recovery") {
    const redirectTo = typeof payload.redirectTo === "string" ? payload.redirectTo.trim() : "";
    if (!targetProfile.email || !isAllowedRecoveryRedirect(redirectTo)) {
      await audit("ADMIN_PASSWORD_RESET_REQUESTED", "FAILURE", "INVALID_RECOVERY_REQUEST");
      return json(request, 400, { code: "INVALID_RECOVERY_REQUEST", error: "E-mail ou endereço de retorno inválido." });
    }

    const { error: recoveryError } = await admin.auth.resetPasswordForEmail(targetProfile.email, { redirectTo });
    if (recoveryError) {
      const failure = safeAuthFailure(recoveryError);
      await audit("ADMIN_PASSWORD_RESET_REQUESTED", "FAILURE", failure.code);
      return json(request, failure.status, failure);
    }

    await audit("ADMIN_PASSWORD_RESET_REQUESTED", "SUCCESS");
    return json(request, 200, { success: true });
  }

  const newPassword = typeof payload.newPassword === "string" ? payload.newPassword : "";
  if (!isStrongAdminPassword(newPassword)) {
    await audit("ADMIN_PASSWORD_CHANGED", "FAILURE", "WEAK_PASSWORD");
    return json(request, 400, {
      code: "WEAK_PASSWORD",
      error: "A senha deve ter ao menos 10 caracteres, com maiúscula, minúscula e número.",
    });
  }

  const { error: updateError } = await admin.auth.admin.updateUserById(targetUserId, { password: newPassword });
  if (updateError) {
    const failure = safeAuthFailure(updateError);
    await audit("ADMIN_PASSWORD_CHANGED", "FAILURE", failure.code);
    return json(request, failure.status, failure);
  }

  await audit("ADMIN_PASSWORD_CHANGED", "SUCCESS");
  return json(request, 200, { success: true });
});
