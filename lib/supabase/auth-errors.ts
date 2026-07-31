type AuthErrorLike = {
  code?: string;
  message?: string;
  status?: number;
};

export type AuthOperation = "login" | "recovery" | "update" | "reauth";

export function getAuthErrorMessage(
  error: AuthErrorLike | null | undefined,
  operation: AuthOperation,
) {
  if (!error) return "Não foi possível concluir a operação.";

  const code = error.code?.toLowerCase();
  const message = error.message?.toLowerCase() ?? "";

  if (code === "invalid_credentials") {
    return operation === "reauth"
      ? "A senha atual está incorreta."
      : "E-mail ou senha incorretos.";
  }
  if (code === "email_not_confirmed") {
    return "O e-mail deste usuário ainda não foi confirmado.";
  }
  if (code === "weak_password") {
    return "A nova senha não atende à política de segurança do Supabase.";
  }
  if (code === "same_password") {
    return "A nova senha deve ser diferente da senha atual.";
  }
  if (
    code === "session_not_found" ||
    code === "refresh_token_not_found" ||
    code === "refresh_token_already_used"
  ) {
    return "A sessão expirou. Solicite um novo link de recuperação.";
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

  if (operation === "recovery") {
    return "Não foi possível enviar o e-mail de recuperação. Tente novamente mais tarde.";
  }
  if (operation === "update") {
    return "Não foi possível atualizar a senha. Solicite um novo link e tente novamente.";
  }
  return "Não foi possível autenticar. Tente novamente.";
}

export function validateNewPassword(password: string, confirmation: string) {
  if (!password || !confirmation) return "Preencha os dois campos de senha.";
  if (password !== confirmation) return "As senhas informadas não são iguais.";
  if (password.length < 8) return "A senha deve ter pelo menos 8 caracteres.";
  if (!/[A-Za-zÀ-ÿ]/.test(password) || !/\d/.test(password)) {
    return "Use pelo menos uma letra e um número na senha.";
  }
  return "";
}
