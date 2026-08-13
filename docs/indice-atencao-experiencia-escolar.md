# Índice de Atenção à Experiência Escolar

Instrumento de priorização e acompanhamento regional. Não constitui avaliação definitiva da qualidade da escola e não permite inferir causalidade.

## Fonte e escala

Importação controlada de CSV, com seis dimensões originais na escala de 0 a 10. Os valores são preservados por escola, período e fonte. Escolas são vinculadas pelo `school_id`; o nome recebido é usado somente para matching normalizado e nunca cria uma escola automaticamente.

## Fórmula

`média = soma das seis dimensões / 6`

`índice de atenção = limite entre 0 e 100 de ((10 - média) × 10)`

Faixas: 0–19,9 Situação favorável; 20–34,9 Acompanhamento regular; 35–49,9 Atenção; 50–64,9 Atenção elevada; 65–100 Prioridade de acompanhamento.

## Gatilhos explicáveis

- dimensão abaixo de 3: gatilho crítico e prioridade de acompanhamento;
- dimensão abaixo de 4: atenção elevada;
- duas ou mais dimensões abaixo de 5: atenção elevada;
- três ou mais dimensões abaixo de 6: prioridade de acompanhamento.

O índice matemático, a classificação base e a prioridade resultante são armazenados separadamente. Os motivos de atenção registram dimensões e valores sem alterar os dados originais.

O banco recalcula os campos derivados em trigger antes de cada INSERT ou UPDATE e rejeita divergências fornecidas pelo cliente. A autoria original permanece em `imported_by`; atualizações posteriores registram o administrador em `updated_by`.

## Correção histórica de tipagem

O teste transacional remoto posterior à migration `20260812000100` revelou `SQLSTATE 42804`: o `CASE` da prioridade resultante combinava literais textuais com o enum `school_experience_attention_level`. A migration aditiva `20260813000200_fix_school_experience_attention_enum.sql` substitui somente a função do trigger e aplica casts explícitos nos literais desse `CASE`, preservando fórmulas, faixas, gatilhos, desempates, proveniência e mensagens Unicode. Ela deve ser aplicada antes de qualquer carga de dados; as migrations já registradas não são reescritas.

## Governança e limitações

ADMIN importa e visualiza; GESTAO visualiza conforme o escopo institucional; ESCOLA visualiza somente a própria escola; VISITANTE não acessa dados reais. Uma única edição não produz tendência. Comparações históricas são descritivas, não causais.

Exclusão pela aplicação não é concedida a nenhum perfil. O período aceita `AAAA` ou `AAAA-1` a `AAAA-4`, conforme as edições previstas para esta pesquisa.
