import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import React, { act } from 'react';
import { JSDOM } from 'jsdom';
import { register } from 'tsx/esm/api';

// Entirely local DOM and HTTP fixtures. Never authenticates or queries a real project.
const dom = new JSDOM('<!doctype html><html><body></body></html>', { url: 'http://localhost/radar360/setores' });
for (const name of ['window', 'document', 'navigator', 'HTMLElement', 'Node', 'MutationObserver']) {
  Object.defineProperty(globalThis, name, { configurable: true, value: dom.window[name] });
}
globalThis.IS_REACT_ACT_ENVIRONMENT = true;
window.scrollTo = () => {};
let compact = false;
window.matchMedia = () => ({ matches: compact, addEventListener() {}, removeEventListener() {} });
process.env.NEXT_PUBLIC_SUPABASE_URL = 'https://sector-navigation.invalid';
process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY = 'local-fixture-public-key';
const requests = [];
let failLookup = false;
const mockHubs = [
  { id: 'h1', name: 'Allowed hub', external_url: null, sector_id: 'id-asure', sectors: { code: 'ASURE' }, status: 'ATIVO', integration_type: 'LINK_EXTERNO' },
  { id: 'h2', name: 'Other hub', external_url: null, sector_id: 'id-setec', sectors: { code: 'SETEC' }, status: 'ATIVO', integration_type: 'LINK_EXTERNO' },
];
const originalFetch = globalThis.fetch;
globalThis.fetch = async input => {
  const url = new URL(typeof input === 'string' ? input : input.url ?? String(input));
  assert.equal(url.hostname, 'sector-navigation.invalid', 'only the test endpoint may be called');
  requests.push(url);
  let data = [];
  if (url.pathname.endsWith('/sectors')) {
    if (failLookup) return new Response(JSON.stringify({ message: 'local lookup failure' }), { status: 403 });
    const id = url.searchParams.get('id')?.replace('eq.', '');
    const code = url.searchParams.get('code')?.replace('eq.', '');
    data = [{ id: id ?? `id-${code?.toLowerCase()}`, code: id === 'id-setec' ? 'SETEC' : code ?? 'ASURE' }];
  }
  if (url.pathname.endsWith('/hubs')) data = mockHubs;
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
};
const { createRoot } = await import('react-dom/client');
const loader = register({ namespace: 'sector-ui-tests' });
const { AppShell } = await loader.import('../app/RadarApp.tsx', import.meta.url);
const { SectorNavigation } = await loader.import('../app/SectorNavigation.tsx', import.meta.url);
const { sectors } = await loader.import('../config/sectors.ts', import.meta.url);
const { getSupabaseBrowserClient } = await loader.import('../lib/supabase/client.ts', import.meta.url);
const user = (role, sectorId) => ({ id: `profile-${role}`, name: 'Test User', email: '', role, sectorId, status: 'ativo' });

async function settle() { await act(async () => { await new Promise(resolve => setTimeout(resolve, 30)); }); }
async function mount(element) {
  const host = document.createElement('div'); document.body.append(host);
  const root = createRoot(host);
  await act(async () => { root.render(element); }); await settle();
  return { host, root, dispose: async () => { await act(async () => root.unmount()); host.remove(); } };
}
async function click(element) { assert.ok(element); await act(async () => { element.click(); }); await settle(); }
async function keyboard(element, key, shiftKey = false) {
  await act(async () => element.dispatchEvent(new window.KeyboardEvent('keydown', { key, shiftKey, bubbles: true, cancelable: true })));
}
async function visit(path) {
  await act(async () => { window.history.pushState({}, '', path); window.dispatchEvent(new window.PopStateEvent('popstate')); }); await settle();
}
after(async () => {
  await getSupabaseBrowserClient().auth.dispose();
  getSupabaseBrowserClient().realtime.disconnect();
  globalThis.fetch = originalFetch; dom.window.close();
  await loader.unregister();
});

test('sector group renders registry links, toggles, keeps focus and highlights one active sector', async () => {
  const visited = [];
  const view = await mount(React.createElement(SectorNavigation, { sectors, onNavigate: path => visited.push(path) }));
  try {
    const toggle = view.host.querySelector('button'); const list = view.host.querySelector('ul');
    assert.equal(toggle.getAttribute('aria-expanded'), 'false'); assert.equal(list.hidden, true);
    toggle.focus(); await click(toggle);
    assert.equal(toggle.getAttribute('aria-expanded'), 'true'); assert.equal(list.hidden, false);
    assert.equal(document.activeElement, toggle);
    assert.deepEqual([...view.host.querySelectorAll('a')].map(a => a.getAttribute('href')), sectors.map(s => s.route));
    await click(view.host.querySelector('a[href$="/setec"]')); assert.deepEqual(visited, ['/radar360/setores/setec']);
    await click(toggle); assert.equal(list.hidden, true);
    await act(async () => view.root.render(React.createElement(SectorNavigation, { key: 'asure', sectors, activeKey: 'asure', onNavigate() {} })));
    assert.equal(view.host.querySelector('button').getAttribute('aria-expanded'), 'true');
    assert.equal(view.host.querySelectorAll('[aria-current="page"]').length, 1);
    assert.equal(view.host.querySelector('[aria-current="page"]').textContent.includes('ASURE'), true);
  } finally { await view.dispose(); }
});

test('ADMIN overview and sidebar use the same registry; history and sector changes reset module state', async () => {
  compact = false; window.history.replaceState({}, '', '/radar360/setores');
  const view = await mount(React.createElement(AppShell, { user: user('ADMIN'), onLogout() {} }));
  try {
    assert.equal(view.host.querySelectorAll('.sector-card').length, sectors.length);
    assert.equal(view.host.querySelectorAll('.sector-navigation-list a').length, sectors.length);
    assert.match(view.host.querySelector('main').textContent, /Setores e hubs/);
    await visit('/radar360/setores/asure');
    assert.match(view.host.querySelector('main h1').textContent, /ASURE/);
    const moduleButton = [...view.host.querySelectorAll('.subnav button')].find(b => b.textContent.includes('Plano de Trabalho'));
    await click(moduleButton); assert.match(view.host.querySelector('.sector-content h2').textContent, /Plano de Trabalho/);
    await visit('/radar360/setores/setec');
    assert.match(view.host.querySelector('.sector-content h2').textContent, /Painel Operacional/);
    assert.equal(view.host.querySelectorAll('.sidebar [aria-current="page"]').length, 1);
    assert.match(view.host.querySelector('.sidebar [aria-current="page"]').textContent, /SETEC/);
    await visit('/radar360/setores/setec-extra');
    assert.match(view.host.querySelector('main h1').textContent, /Acesso não autorizado/);
    assert.equal(view.host.querySelector('.sector-layout'), null);
  } finally { await view.dispose(); }
});

test('GESTAO sees only its linked sector and URL denial never mounts another sector or its queries', async () => {
  requests.length = 0; window.history.replaceState({}, '', '/radar360/setores/setec');
  const view = await mount(React.createElement(AppShell, { user: user('GESTAO', 'id-asure'), onLogout() {} }));
  try {
    assert.match(view.host.querySelector('main h1').textContent, /Acesso não autorizado/);
    assert.deepEqual([...view.host.querySelectorAll('.sector-navigation-list a')].map(a => a.getAttribute('href')), ['/radar360/setores/asure']);
    assert.equal(requests.some(u => u.searchParams.has('code')), false, 'denied SectorView did not query data');
    await visit('/radar360/setores');
    assert.equal(view.host.querySelectorAll('.sector-card').length, 1);
    assert.match(view.host.querySelector('main').textContent, /Allowed hub/);
    assert.doesNotMatch(view.host.querySelector('main').textContent, /Other hub/);
    await visit('/radar360/setores/asure');
    assert.match(view.host.querySelector('main h1').textContent, /ASURE/);
    await act(async () => view.root.render(React.createElement(AppShell, { user: user('GESTAO', 'id-setec'), onLogout() {} })));
    await settle();
    assert.match(view.host.querySelector('main h1').textContent, /Acesso não autorizado/);
    assert.equal(view.host.querySelector('a[href$="/asure"]'), null, 'previous profile scope is discarded');
  } finally { await view.dispose(); }
});

test('ESCOLA and VISITANTE have no internal shortcuts and cannot open a sector directly', async () => {
  for (const role of ['ESCOLA', 'VISITANTE']) {
    requests.length = 0; window.history.replaceState({}, '', '/radar360/setores/asure');
    const view = await mount(React.createElement(AppShell, { user: user(role), onLogout() {} }));
    try {
      assert.equal(view.host.querySelector('.sector-navigation'), null);
      assert.match(view.host.querySelector('main h1').textContent, /Acesso não autorizado/);
      assert.equal(requests.length, 0);
    } finally { await view.dispose(); }
  }
});

test('failed sector lookup fails closed', async () => {
  failLookup = true; window.history.replaceState({}, '', '/radar360/setores/asure');
  const view = await mount(React.createElement(AppShell, { user: user('GESTAO', 'id-asure'), onLogout() {} }));
  try {
    assert.match(view.host.querySelector('main h1').textContent, /Acesso não autorizado/);
    assert.equal(view.host.querySelector('.sector-navigation'), null);
  } finally { failLookup = false; await view.dispose(); }
});

test('mobile drawer opens, traps Tab, closes on Escape/selection and restores trigger focus', async () => {
  compact = true; window.history.replaceState({}, '', '/radar360/setores');
  const view = await mount(React.createElement(AppShell, { user: user('ADMIN'), onLogout() {} }));
  try {
    const trigger = view.host.querySelector('.hamburger'); const sidebar = view.host.querySelector('.sidebar');
    assert.equal(sidebar.hasAttribute('inert'), true);
    await click(trigger);
    assert.equal(trigger.getAttribute('aria-expanded'), 'true'); assert.equal(sidebar.hasAttribute('inert'), false);
    const close = view.host.querySelector('.close-menu'); assert.equal(document.activeElement, close);
    await keyboard(close, 'Tab', true);
    const focusables = [...sidebar.querySelectorAll('button, a')].filter(e => !e.closest('[hidden]'));
    assert.equal(document.activeElement, focusables.at(-1));
    await keyboard(document.activeElement, 'Tab'); assert.equal(document.activeElement, close);
    await keyboard(close, 'Escape');
    assert.equal(trigger.getAttribute('aria-expanded'), 'false'); assert.equal(document.activeElement, trigger);
    await click(trigger); await click(view.host.querySelector('.sector-navigation-toggle'));
    await click(view.host.querySelector('.sector-navigation-list a[href$="/seom"]'));
    assert.equal(trigger.getAttribute('aria-expanded'), 'false'); assert.equal(sidebar.hasAttribute('inert'), true);
    assert.match(view.host.querySelector('main h1').textContent, /SEOM/);
    assert.equal(document.body.style.overflow, '');
  } finally { await view.dispose(); compact = false; }
});
