# RADAR 360

Hub institucional do ecossistema Portal Comunica! da URE Guarulhos Sul. O frontend preserva a identidade visual existente e usa o Supabase como fonte oficial para autenticação, perfis e dados reais.

## Ambiente

Copie `.env.example` para `.env.local` e preencha:

- `NEXT_PUBLIC_SUPABASE_URL`: Project URL do projeto Supabase.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: Publishable Key do projeto.

As duas variáveis são públicas por definição. O acesso efetivo aos registros é controlado por RLS. Nunca use Secret Key, Service Role ou senha do banco em variável `NEXT_PUBLIC_*`.

`SUPABASE_DB_PASSWORD` é opcional, server-only e usada apenas pelos scripts locais de migração/teste. Não é necessária em produção e não deve ser versionada.

## Supabase e schema

As migrations reproduzíveis estão em `supabase/migrations/`:

- `20260731000100_radar360_schema.sql`: enums, 14 tabelas, índices, timestamps e histórico automático.
- `20260731000200_radar360_rls.sql`: grants mínimos, funções de contexto e políticas RLS.

O seed separado em `supabase/seed.sql` contém 1 organização, 16 setores, 82 escolas, 100 perfis institucionais, 251 categorias deduplicadas disponíveis no projeto e 3 hubs externos. A planilha original com aproximadamente 340 categorias não estava disponível; categorias ausentes não foram inventadas.

Para regenerar e aplicar localmente:

```text
npm run seed:generate
npm run db:apply
npm run test:rls
```

## Auth e perfis

O Supabase Auth é a única fonte de identidade. O cliente implementa login por e-mail/senha, logout, persistência e renovação de sessão, recuperação e redefinição de senha. Não existem senhas fixas ou autenticação em `localStorage`.

Cada `auth.users` precisa de um registro ativo em `profiles`, vinculado a um dos 100 `institutional_profiles`:

- 1 REGIONAL (`ADMIN`)
- 16 SECTOR (`GESTAO`)
- 82 SCHOOL (`ESCOLA`)
- 1 DEMO (`VISITANTE`)

Perfis institucionais são contextos de autorização, não contas de usuário. A criação de usuários deve ocorrer pelo fluxo seguro do Supabase Auth; nenhuma senha é criada manualmente pela aplicação.

## RLS

As políticas do banco são a barreira principal:

- `ADMIN`: contexto regional.
- `GESTAO`: grava somente no próprio setor e lê compartilhamentos permitidos.
- `ESCOLA`: lê apenas itens da própria escola com visibilidade escolar.
- `VISITANTE`: não consulta itens, evidências ou perfis reais.

`lib/permissions.ts` centraliza as mesmas regras para navegação e experiência da interface, sem substituir RLS.

## Dados reais e modo demo

Dashboards, escolas, usuários e demandas autenticadas consultam o Supabase. Base vazia exibe zero ou “sem registros”.

O modo Visitante é um provider local isolado em `lib/demo/`; usa quatro escolas e itens fictícios, não cria sessão Auth e não consulta tabelas reais. O selo de ambiente demonstrativo permanece visível.

## Usuários e demandas

`/radar360/usuarios` lista perfis reais para `ADMIN` e permite ativar/desativar conforme RLS. Convites não criam senha local; devem ser feitos pelo serviço administrativo seguro do Supabase.

`/radar360/demandas` lista `institutional_items` autorizados. `ADMIN` seleciona setor; `GESTAO` recebe o setor da sessão bloqueado e categorias filtradas. `ESCOLA` é somente leitura nesta versão.

## Migração e deploy

O Supabase é a fonte oficial depois da carga estrutural. Arquivos TypeScript em `config/` permanecem apenas para metadados visuais e compatibilidade de navegação, não como banco de registros operacionais.

No ambiente hospedado, configure somente as duas variáveis públicas. A senha do banco e chaves administrativas não devem ser enviadas ao frontend nem ao runtime público.

## Validação

- `npm run lint`
- `npm run typecheck`
- `npm test`
- `npm run test:rls`
- `npm run build`

Os testes RLS cobrem leitura administrativa, escrita setorial, bloqueio entre setores, isolamento entre escolas e bloqueio do visitante.
