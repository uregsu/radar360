export const PASSWORD_MIN_LENGTH = 10;

export type PasswordRequirement = {
  key: "length" | "lowercase" | "uppercase" | "number";
  label: string;
  valid: boolean;
};

export function getPasswordRequirements(password: string): PasswordRequirement[] {
  return [
    { key: "length", label: `Ao menos ${PASSWORD_MIN_LENGTH} caracteres`, valid: password.length >= PASSWORD_MIN_LENGTH },
    { key: "lowercase", label: "Uma letra minúscula", valid: /[a-z]/.test(password) },
    { key: "uppercase", label: "Uma letra maiúscula", valid: /[A-Z]/.test(password) },
    { key: "number", label: "Um número", valid: /\d/.test(password) },
  ];
}

export function isStrongPassword(password: string) {
  return getPasswordRequirements(password).every((requirement) => requirement.valid);
}

export function maskEmail(email: string) {
  const [local, domain] = email.split("@");
  if (!local || !domain) return "E-mail institucional";
  const visible = local.slice(0, Math.min(2, local.length));
  return `${visible}${"•".repeat(Math.max(3, Math.min(8, local.length - visible.length)))}@${domain}`;
}
