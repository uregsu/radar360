import { createClient } from "npm:@supabase/supabase-js@2";

const allowedOrigins = new Set([
  "https://radar360-six.vercel.app",
  "http://localhost:3000",
]);

function corsHeaders(request: Request) {
  const origin = request.headers.get("origin") ?? "";
  return {
    "Access-Control-Allow-Origin": allowedOrigins.has(origin)
      ? origin
      : "https://radar360-six.vercel.app",
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

function isStrongPassword(password: string) {
  return password.length >= 10 && /[a-z]/.test(password) && /[A-Z]/.test(password) && /\d/.test(password);
}

Deno.serve(async (request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders(request) });
  }
  if (request.method !== "POST") {
    return json(request, 405, { error: "Método não permitido." });
  }

  const authorization = request.headers.get("authorization") ?? "";
  const accessToken = authorization.replace(/^Bearer\s+/i, "").trim();
  if (!accessToken) {
    return json(request, 401, { error: "Sessão administrativa ausente." });
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return json(request, 500, { error: "Serviço administrativo não configurado." });
  }

  const admin = createClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  });

  const { data: callerData, error: callerError } = await admin.auth.getUser(accessToken);
  if (callerError || !callerData.user) {
    return json(request, 401, { error: "Sessão administrativa inválida ou expirada." });
  }

  const { data: callerProfile, error: profileError } = await admin
    .from("profiles")
    .select("id,role,active,organization_id")
    .eq("user_id", callerData.user.id)
    .maybeSingle();

  if (
    profileError ||
    !callerProfile ||
    !callerProfile.active ||
    callerProfile.role !== "ADMIN" ||
    !callerProfile.organization_id
  ) {
    return json(request, 403, { error: "Apenas administradores ativos podem alterar senhas." });
  }

  let payload: { targetUserId?: unknown; newPassword?: unknown };
  try {
    payload = await request.json();
  } catch {
    return json(request, 400, { error: "Requisição inválida." });
  }

  const targetUserId = typeof payload.targetUserId === "string" ? payload.targetUserId.trim() : "";
  const newPassword = typeof payload.newPassword === "string" ? payload.newPassword : "";
  const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  if (!uuidPattern.test(targetUserId)) {
    return json(request, 400, { error: "Usuário de destino inválido." });
  }
  if (!isStrongPassword(newPassword)) {
    return json(request, 400, {
      error: "A senha deve ter ao menos 10 caracteres, com maiúscula, minúscula e número.",
    });
  }

  const { data: targetProfile, error: targetError } = await admin
    .from("profiles")
    .select("id,organization_id")
    .eq("user_id", targetUserId)
    .maybeSingle();

  if (
    targetError ||
    !targetProfile ||
    targetProfile.organization_id !== callerProfile.organization_id
  ) {
    return json(request, 404, { error: "Usuário não encontrado nesta organização." });
  }

  const { error: updateError } = await admin.auth.admin.updateUserById(targetUserId, {
    password: newPassword,
  });
  if (updateError) {
    return json(request, 400, { error: "Não foi possível atualizar a senha no Supabase Auth." });
  }

  await admin.from("audit_logs").insert({
    organization_id: callerProfile.organization_id,
    actor_user_id: callerData.user.id,
    action: "ADMIN_PASSWORD_CHANGED",
    resource_type: "auth_user",
    resource_id: targetUserId,
    metadata: { target_profile_id: targetProfile.id },
  });

  return json(request, 200, { success: true });
});
