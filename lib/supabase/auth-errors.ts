type AuthErrorLike = {
  code?: string;
  message?: string;
  status?: number;
};

export function getAuthErrorMessage(
  error: AuthErrorLike | null | undefined,
) {
  if (!error) return "Não foi possível concluir a operação.";

  const code = error.code?.toLowerCase();
  const message = error.message?.toLowerCase() ?? "";

  if (code === "invalid_credentials") {
    return "E-mail ou senha incorretos.";
  }
  if (code === "email_not_confirmed") {
    return "O e-mail deste usuário ainda não foi confirmado.";
  }
  if (
    code === "session_not_found" ||
    code === "refresh_token_not_found" ||
    code === "refresh_token_already_used"
  ) {
    return "A sessão expirou. Entre novamente com suas credenciais.";
  }
  if (code === "over_email_send_rate_limit" || error.status === 429) {
    return "Muitas solicitações foram feitas. Aguarde alguns minutos e tente novamente.";
  }
  if (
    message.includes("failed to fetch") ||
    message.includes("network") ||
    message.includes("fetch failed")
  ) {
    return "Não foi possível conectar ao serviço de autenticação. Verifique sua conexão e tente novamente.";
  }
  if (
    message.includes("supabaseurl") ||
    message.includes("api key") ||
    message.includes("jwt") ||
    message.includes("not configured") ||
    message.includes("não configurado")
  ) {
    return "O serviço de autenticação não está configurado corretamente. Informe o administrador.";
  }

  return "Não foi possível autenticar. Tente novamente.";
}
