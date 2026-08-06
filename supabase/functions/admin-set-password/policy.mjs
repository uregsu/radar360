export const PASSWORD_MIN_LENGTH = 10;

export function canManageUserCredentials(profile) {
  return Boolean(
    profile
      && profile.active === true
      && profile.role === "ADMIN"
      && typeof profile.organization_id === "string"
      && profile.organization_id.length > 0,
  );
}

export function isTargetInOrganization(targetProfile, organizationId) {
  return Boolean(
    targetProfile
      && targetProfile.organization_id === organizationId,
  );
}

export function isValidAuthUserId(value) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export function isStrongAdminPassword(password) {
  return password.length >= PASSWORD_MIN_LENGTH
    && /[a-z]/.test(password)
    && /[A-Z]/.test(password)
    && /\d/.test(password);
}
