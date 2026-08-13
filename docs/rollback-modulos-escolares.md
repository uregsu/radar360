# Plano de rollback — módulos escolares

Este documento é um plano técnico. Não contém automação de execução e não autoriza alterações em produção.

## Aplicação controlada

Aplicar isoladamente e dentro de transações, nesta ordem:

1. `20260812000100_school_experience_metrics.sql`;
2. `20260812000200_school_quality_indicators.sql`.

Não utilizar `npm run db:apply`: o executor atual também processa `supabase/seed.sql` e pode atualizar dados institucionais existentes.

## Preparação para rollback

Antes da aplicação, registrar o catálogo dos objetos, as versões no ledger de migrations e um backup lógico das tabelas relacionadas. Após a aplicação, validar constraints, índices, triggers, policies, grants e RLS antes de importar dados.

Se um rollback for realmente autorizado, executá-lo em transações independentes e na ordem inversa:

1. módulo Qualidade da Aula (`00200`);
2. módulo Experiência Escolar (`00100`).

Para cada módulo, preservar/exportar os registros e então remover, de forma explicitamente revisada, policies, triggers, índices, tabela, funções auxiliares e enum. Só remover objetos após confirmar que não existem dependências externas. Atualizar o ledger apenas de maneira coerente com o resultado transacional.

Falhas de importação de dados não exigem automaticamente rollback estrutural. Priorizar correção ou reversão apenas da carga dentro de transação, preservando as tabelas quando o schema estiver íntegro.
