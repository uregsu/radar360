import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import {
  canManageUserCredentials,
  isStrongAdminPassword,
  isTargetInOrganization,
  isValidAuthUserId,
} from "../supabase/functions/admin-set-password/policy.mjs";

const appUrl = new URL("../app/RadarApp.tsx", import.meta.url);
const functionUrl = new URL("../supabase/functions/admin-set-password/index.ts", import.meta.url);
const policyUrl = new URL("../lib/password-policy.ts", import.meta.url);

test("keeps administrative password changes on the protected server surface", async () => {
  const [app, edgeFunction] = await Promise.all([
    readFile(appUrl, "utf8"),
    readFile(functionUrl, "utf8"),
  ]);

  assert.match(app, /functions\.invoke\("admin-set-password"/);
  assert.doesNotMatch(app, /auth\.admin\.updateUserById|service_role|SUPABASE_SERVICE_ROLE_KEY/);
  assert.match(edgeFunction, /canManageUserCredentials\(callerProfile\)/);
  assert.match(edgeFunction, /return json\(request, 403, \{ code: "ADMIN_REQUIRED"/);
  assert.match(edgeFunction, /auth\.admin\.updateUserById\(targetUserId/);
  assert.match(edgeFunction, /isTargetInOrganization\(targetProfile, callerProfile\.organization_id\)/);
});

test("authorizes only an active regional ADMIN on the server policy", () => {
  const organization_id = "org-gsu";
  const profile = { active: true, organization_id };

  assert.equal(canManageUserCredentials({ ...profile, role: "ADMIN" }), true);
  assert.equal(canManageUserCredentials({ ...profile, role: "GESTAO" }), false);
  assert.equal(canManageUserCredentials({ ...profile, role: "ESCOLA" }), false);
  assert.equal(canManageUserCredentials({ ...profile, role: "VISITANTE" }), false);
  assert.equal(canManageUserCredentials({ ...profile, role: "ADMIN", active: false }), false);
  assert.equal(canManageUserCredentials(null), false);

  assert.equal(isTargetInOrganization({ organization_id }, organization_id), true);
  assert.equal(isTargetInOrganization({ organization_id: "outra-org" }, organization_id), false);
});

test("rejects invalid UUIDs and weak provisional passwords", () => {
  assert.equal(isValidAuthUserId("7bbecfbd-d156-4314-ac41-8ef7b59251b7"), true);
  assert.equal(isValidAuthUserId("perfil-institucional"), false);
  assert.equal(isStrongAdminPassword("Fraca123"), false);
  assert.equal(isStrongAdminPassword("SenhaSegura123"), true);
});

test("implements official recovery and password update flows without storing secrets", async () => {
  const [app, edgeFunction] = await Promise.all([
    readFile(appUrl, "utf8"),
    readFile(functionUrl, "utf8"),
  ]);

  assert.match(app, /event === "PASSWORD_RECOVERY"/);
  assert.match(app, /auth\.exchangeCodeForSession\(code\)/);
  assert.match(app, /auth\.updateUser\(\{ password: newPassword \}\)/);
  assert.match(edgeFunction, /auth\.resetPasswordForEmail\(targetProfile\.email, \{ redirectTo \}\)/);
  assert.match(edgeFunction, /ADMIN_PASSWORD_RESET_REQUESTED/);
  assert.match(edgeFunction, /ADMIN_PASSWORD_CHANGED/);
  assert.doesNotMatch(edgeFunction, /metadata:[^\n]*newPassword|localStorage|console\.log/);
});

test("enforces password policy and masks the selected email", async () => {
  const [app, policy] = await Promise.all([
    readFile(appUrl, "utf8"),
    readFile(policyUrl, "utf8"),
  ]);

  assert.match(policy, /PASSWORD_MIN_LENGTH = 10/);
  assert.match(policy, /\[a-z\]/);
  assert.match(policy, /\[A-Z\]/);
  assert.match(policy, /\\d/);
  assert.match(policy, /export function maskEmail/);
  assert.match(app, /maskEmail\(passwordUser\.email\)/);
  assert.match(app, /newPassword!==confirmPassword/);
});
