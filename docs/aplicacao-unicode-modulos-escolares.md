# Transporte UTF-8 da migration corretiva

A corrupção ocorreu quando o SQL UTF-8 foi lido pelo PowerShell e enviado ao Supabase CLI por `stdin`. Nessa conversão textual, caracteres fora de ASCII chegaram ao PostgreSQL como `?`. O arquivo versionado permaneceu íntegro; o problema ocorreu somente no transporte.

## Aplicação futura

Não transmitir esta migration por pipeline textual do PowerShell. O método recomendado é um executor dedicado que:

1. leia `20260813000100_repair_school_modules_unicode.sql` diretamente como bytes;
2. valide os bytes com `TextDecoder("utf-8", { fatal: true })`;
3. confirme o Project Ref `vkmoxrqahweapmojdsox`;
4. abra uma única transação PostgreSQL;
5. execute exclusivamente o conteúdo da migration;
6. valide no catálogo o default, os comentários e as funções;
7. registre `20260813000100_repair_school_modules_unicode.sql` em `public.radar360_schema_migrations` apenas após as validações;
8. faça `COMMIT` somente se todas as etapas passarem.

O executor não deve chamar `npm run db:apply`, processar `supabase/seed.sql` ou reenviar as migrations `00100` e `00200`.

## Prova descartável antes da aplicação

No início da mesma conexão, executar uma transação separada que envie um literal como `ação – período – experiência`, compare `encode(convert_to(valor, 'UTF8'), 'hex')` com o hexadecimal calculado localmente e finalize obrigatoriamente com `ROLLBACK`. Somente prosseguir se os bytes forem idênticos.

Uma alternativa segura é construir previamente um arquivo SQL de aplicação em UTF-8 e passá-lo diretamente com `supabase db query --linked --file <arquivo>`. Esse arquivo deve conter `BEGIN`, a migration, as validações de catálogo, o registro no ledger e `COMMIT`; deve ser revisado e ter seu hash conferido antes da execução. Não usar `Get-Content | supabase db query`.

## Idempotência

A migration usa `ALTER COLUMN SET DEFAULT`, `CREATE OR REPLACE FUNCTION` e `COMMENT ON`, operações que produzem o mesmo estado textual quando repetidas. O fluxo normal, porém, é executá-la apenas uma vez e usar o ledger customizado para impedir reaplicação.
