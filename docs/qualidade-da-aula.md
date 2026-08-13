# Qualidade da Aula — Escola Total

Fonte prevista: **Escola Total – Qualidade Educacional**. A integração é independente da pesquisa de Experiência Escolar 360.

## Estrutura de alimentação

A migration `20260812000200_school_quality_indicators.sql` prepara registros por escola, indicador, período e fonte. A associação deve priorizar código institucional e `school_id`; nomes servem apenas para conferência segura. Nenhuma escola deve ser criada automaticamente.

Campos de origem esperados: código da escola, chave e nome do indicador, dimensão, valor, unidade/escala, classificação oficial, período, data de atualização e, quando disponibilizado pela fonte, resultado regional.

Percentuais são limitados a 0–100. Quando uma escala é informada, tanto o valor escolar quanto o regional precisam respeitá-la. É permitido no máximo um indicador principal por escola, período e fonte. `regional_value` nulo significa ausência de comparação e nunca é convertido em zero.

`imported_by` preserva o responsável pela importação original e `updated_by` registra o último administrador que atualizou o registro. Exclusão pela aplicação não é concedida a nenhum perfil.

O período permanece como texto institucional não vazio porque o Escola Total ainda não forneceu um padrão fechado. Isso difere deliberadamente da Experiência Escolar, que aceita `AAAA` ou `AAAA-N`; nenhuma padronização será feita sem requisito da fonte.

Não há dataset Escola Total no repositório. Até uma exportação institucional autorizada ser validada e a migration ser aplicada, a interface exibe estado sem dados. Não são calculados índice consolidado, classificação ou parâmetros próprios.
