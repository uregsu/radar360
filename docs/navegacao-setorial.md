# Navegação setorial — entrega para preview

## Base auditada e local da mudança

- Repositório original: `C:\Projetos\SuperBI360`.
- Branch original: `feature/integracao-planos-setoriais`.
- HEAD base: `842a28c12354dc9bd72233f1cfbd3834677f0b47`, working tree limpo.
- Cópia independente: `work/sector-navigation`, branch `codex/sector-navigation`.
- O checkout original e a entrega anterior de integrações não receberam mudanças.
- Nenhum commit, push, merge ou deploy foi realizado.

A auditoria encontrou `config/sectors.ts`, `SectorView`, a visão geral `Sectors`
e a rota catch-all `app/[...slug]/page.tsx`. Foram reutilizados; não foram criadas
páginas individuais nem uma segunda lista de setores. O antigo reconhecimento
por prefixo admitia slugs parecidos e não verificava o vínculo do perfil GESTAO
antes de montar a página setorial; agora há uma verificação explícita.

## Fonte única

`config/sectors.ts` mantém os 17 setores existentes e agora fornece:

| Campo | Uso |
| --- | --- |
| key / slug | Identificador estável do setor |
| name | Nome completo e título |
| label | Sigla exibida nos atalhos |
| route | `/radar360/setores/{slug}` |
| icon | Ícone já existente |
| enabled | Habilitação conjunta de menu e página |
| permissions.roles | Perfis explicitamente autorizados |
| permissions.public | Liberação explícita da prévia ao VISITANTE |
| menu | Módulos e áreas funcionais existentes |

A configuração alimenta o menu, Setores e hubs, os atalhos da página central do
SuperBI, títulos e resolução de rotas. O antigo campo `visibility` de Sector foi
substituído por `permissions`, evitando duas fontes de regras para navegação.
Os demais campos existentes foram preservados. Nenhuma lista foi replicada em
outros componentes. Integrações futuras podem reutilizar `key` e o mesmo catálogo.

## Acesso

`canAccessSector()` e `getVisibleSectors()` são a regra central de navegação.
`canAccessNavigation()` a aplica antes de montar o conteúdo, tanto por URL direta
quanto por cliques e histórico do navegador. Não se limita a esconder atalhos.
Rotas inventadas e slugs como `setec-extra` não abrem a página SETEC.

| Perfil | Comportamento |
| --- | --- |
| ADMIN | Todos os setores habilitados que permitem ADMIN |
| GESTAO | Somente o setor correspondente ao `sector_id` do perfil |
| ESCOLA | Nenhum setor administrativo liberado por padrão |
| VISITANTE | Somente setores marcados explicitamente como públicos |

Nenhum setor foi declarado público nesta etapa. Assim, VISITANTE mantém a visão
geral demonstrativa, sem atalhos ou páginas administrativas internas. ESCOLA não
recebe acesso automático à visão administrativa.

O ID do perfil é UUID de banco e não deve ser comparado com uma sigla. O hook
`useSectorScope()` realiza somente uma consulta de leitura na tabela `sectors`
existente para resolver o código do setor ativo vinculado. Não usa o nome do
perfil para conceder acesso. Enquanto carrega, mostra estado de verificação;
em erro ou vínculo desconhecido, não concede acesso. Respostas antigas são
descartadas quando o perfil muda.

Ouvidorias conserva sua rota e sua política própria preexistente (ADMIN/GESTAO),
inclusive para GESTAO de outro setor. Essa exceção pertence ao módulo existente
e foi preservada porque a solicitação proíbe alterá-lo. O mesmo vale para as
permissões e conteúdo de Experiência Escolar. As páginas setoriais de primeiro
nível usam a nova regra, enquanto o módulo protegido mantém a sua regra anterior.

Não houve alteração de Auth, Supabase, migrations, RLS, usuários ou dados. As
policies existentes continuam responsáveis pela segurança dos dados no servidor;
esta entrega acrescenta controle de navegação/renderização no cliente existente.

## UX

O grupo **SETORES DA URE** fica após a visão institucional. “Setores e hubs”
permanece na seção Ecossistema como visão geral. O grupo começa recolhido fora de
uma página setorial e abre ao entrar em um setor. É possível recolhê-lo mesmo
com um setor ativo. A página ativa recebe destaque e `aria-current`.

O botão nativo suporta Enter/Espaço, `aria-expanded` e `aria-controls`. Links
possuem href canônico e preservam abertura em nova aba com modificadores.
O foco permanece visível. O menu mobile abre com foco no botão de fechar,
mantém Tab dentro da navegação, fecha com Escape ou seleção, devolve foco ao
acionador e impede foco na barra lateral fechada usando `inert`.

A barra lateral ocupa 100dvh, mantém marca/rodapé e usa uma única área de
rolagem vertical para os itens. Não há submenu sobreposto nem corte dos setores.
Ao trocar de setor, `SectorView` é remontado pela key para não conservar o módulo
ativo ou dados da página anterior. Layout e módulos específicos são reutilizados.

## Arquivos

Novos:

- `app/SectorNavigation.tsx`
- `app/useSectorScope.ts`
- `app/useSidebarDrawer.ts`
- `lib/sector-navigation.ts`
- `tests/sector-navigation.test.mjs`
- `tests/sector-navigation-ui.test.mjs`
- `docs/navegacao-setorial.md`

Atualizados:

- `config/sectors.ts`, `types/index.ts`: contrato central.
- `lib/permissions.ts`: composição da regra de navegação, preservando módulos existentes.
- `app/RadarApp.tsx`: menu, visão geral, proteção de rota e reutilização da página.
- `app/RadarModules.tsx`: atalhos setoriais consomem rotas e permissões do catálogo.
- `app/globals.css`: foco, destaque, rolagem e comportamento mobile.
- `package.json`, `package-lock.json`: jsdom e tsx somente para testes de desenvolvimento.

## Validação

| Comando | Resultado |
| --- | --- |
| npm run lint | Aprovado |
| npm run typecheck | Aprovado |
| npm test | 72 aprovados, 0 falhas; inclui build Vinext |
| npm run build:vercel | Aprovado |
| git diff --check | Aprovado |

São 12 testes novos de contrato e interface, cobrindo os quatro perfis, setores
habilitados, rotas únicas, URLs diretas/semelhantes, falha de consulta, mudança de
vínculo, renderização, expansão/recolhimento, destaque, histórico, troca de módulos,
menu mobile, foco, Escape, Tab e manutenção das permissões de módulos protegidos.
As chamadas Supabase dos testes usam respostas locais simuladas; não há login
nem acesso ao projeto remoto.

Também foi verificado em navegador real numa prévia local com dados fictícios:
desktop, mobile 390 × 844, ativação por Enter/Espaço, fechamento após seleção e
bloqueio de GESTAO da ASURE ao abrir SETEC. No mobile, documento e viewport tiveram
largura de 390 px; a barra lateral teve 844 px, com rolagem interna da lista.

O build Next apresentou aviso sobre múltiplos lockfiles por esta cópia estar
dentro de outro workspace. O build Vinext manteve seu aviso de classificação
estática de rotas. Ambos concluíram. Não foi necessário alterar configuração de
build ou arquivos dos módulos protegidos.

## Preview e próximos passos

Prévia local temporária: `http://127.0.0.1:4176/`. Ela renderiza o AppShell real com
respostas fictícias, oferece seletor de perfil e não autentica usuários reais.
O harness está fora do repositório, em `.codex-tmp/sector-preview`, e não integra
o patch ou o build de produção. A prévia depende do processo local estar ativo.

O patch pode ser revisado e aplicado ao HEAD base após conferência do checkout
de destino. As alterações permanecem sem commit. Antes de qualquer publicação,
homologar com perfis institucionais reais em ambiente autorizado. A liberação de
setores públicos deve ser uma decisão explícita em `config/sectors.ts`.

NAVEGAÇÃO SETORIAL IMPLEMENTADA — PRONTA PARA PREVIEW
