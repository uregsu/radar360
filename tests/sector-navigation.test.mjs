import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import { tsImport } from 'tsx/esm/api';

const { sectors } = await tsImport('../config/sectors.ts', import.meta.url);
const { getSectorByRoute, getVisibleSectors, canAccessSector, resolveSectorKey } = await tsImport('../lib/sector-navigation.ts', import.meta.url);
const { canAccessNavigation } = await tsImport('../lib/permissions.ts', import.meta.url);
const { ASURE_OUVIDORIAS_ROUTE } = await tsImport('../config/ouvidorias.ts', import.meta.url);
const user = (role, sectorId) => ({ id: 'test-profile', name: 'Test', email: '', status: 'ativo', role, sectorId });

test('one registry supplies unique keys, labels and canonical routes for every sector', () => {
  for (const field of ['key', 'route', 'slug']) assert.equal(new Set(sectors.map(s => s[field])).size, sectors.length);
  for (const sector of sectors) {
    assert.equal(sector.route, `/radar360/setores/${sector.slug}`);
    assert.equal(sector.key, sector.slug);
    assert.equal(sector.label, sector.shortName);
    assert.ok(sector.name && sector.icon && sector.menu.length);
    assert.equal(getSectorByRoute(sector.route)?.key, sector.key);
  }
  assert.ok(fs.existsSync('app/[...slug]/page.tsx'));
  assert.equal(fs.existsSync('app/radar360/setores'), false, 'existing catch-all handles every sector; no duplicated page files');
});

test('ADMIN sees enabled authorized sectors; disabling a sector blocks its route', () => {
  assert.equal(getVisibleSectors(user('ADMIN')).length, sectors.length);
  for (const sector of sectors) assert.equal(canAccessNavigation(user('ADMIN'), sector.route), true);
  assert.equal(canAccessSector(user('ADMIN'), { ...sectors[0], enabled: false }), false);
  assert.equal(canAccessSector({ ...user('ADMIN'), status: 'inativo' }, sectors[0]), false);
  assert.equal(canAccessSector(user('ADMIN'), { ...sectors[0], permissions: { roles: [], public: false } }), false);
});

test('GESTAO uses the trusted UUID-to-code mapping and never a slug or profile name as permission', () => {
  const manager = { ...user('GESTAO', 'uuid-asure'), institutionalProfileName: 'SETEC' };
  assert.equal(resolveSectorKey({ id: 'uuid-asure', code: 'ASURE' }, manager.sectorId), 'asure');
  assert.equal(resolveSectorKey({ id: 'another-uuid', code: 'ASURE' }, manager.sectorId), undefined);
  assert.equal(resolveSectorKey({ id: 'uuid-asure', code: 'NOT_REGISTERED' }, manager.sectorId), undefined);
  assert.deepEqual(getVisibleSectors(manager, 'asure').map(s => s.key), ['asure']);
  for (const sector of sectors) assert.equal(canAccessNavigation(manager, sector.route, 'asure'), sector.key === 'asure');
  assert.deepEqual(getVisibleSectors(manager), []);
  assert.deepEqual(getVisibleSectors(user('GESTAO'), 'asure'), []);
});

test('ESCOLA has no internal sector access; VISITANTE requires explicit public permission', () => {
  for (const role of ['ESCOLA', 'VISITANTE']) {
    assert.deepEqual(getVisibleSectors(user(role)), []);
    for (const sector of sectors) assert.equal(canAccessNavigation(user(role), sector.route), false);
  }
  const publicSector = { ...sectors[0], permissions: { roles: ['ADMIN'], public: true } };
  assert.equal(canAccessSector(user('VISITANTE'), publicSector), true);
  assert.equal(canAccessSector(user('ESCOLA'), publicSector), false);
  assert.equal(canAccessSector(user('VISITANTE'), { ...publicSector, enabled: false }), false);
});

test('direct URLs and similar/prefix slugs cannot bypass the route guard', () => {
  for (const path of ['/radar360/setores/setec-extra', '/radar360/setores/setec/invented', '/radar360/setores/unknown', '/radar360/setores/%73etec']) {
    assert.equal(getSectorByRoute(path), undefined);
    assert.equal(canAccessNavigation(user('ADMIN'), path), false);
  }
  assert.equal(canAccessNavigation(user('ADMIN'), '/radar360/setores/setec/'), true);
  assert.equal(canAccessNavigation(user('ESCOLA'), '/radar360/setores'), false);
  assert.equal(canAccessNavigation(user('VISITANTE'), '/radar360/setores'), true, 'ecossystem overview remains available');
});

test('existing protected modules keep their independent access rules', () => {
  for (const role of ['ADMIN', 'GESTAO', 'ESCOLA', 'VISITANTE']) {
    assert.equal(canAccessNavigation(user(role), ASURE_OUVIDORIAS_ROUTE), ['ADMIN', 'GESTAO'].includes(role));
    assert.equal(canAccessNavigation(user(role), '/radar360/experiencia-escolar'), role !== 'VISITANTE');
  }
});
