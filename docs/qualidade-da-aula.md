# Qualidade da Aula — Escola Total

Fonte prevista: **Escola Total – Qualidade Educacional**. A integração é independente da pesquisa de Experiência Escolar 360.

## Estrutura de alimentação

A migration `20260812000200_school_quality_indicators.sql` prepara registros por escola, indicador, período e fonte. A associação deve priorizar código institucional e `school_id`; nomes servem apenas para conferência segura. Nenhuma escola deve ser criada automaticamente.

Campos de origem esperados: código da escola, chave e nome do indicador, dimensão, valor, unidade/escala, classificação oficial, período, data de atualização e, quando disponibilizado pela fonte, resultado regional.

Não há dataset Escola Total no repositório. Até uma exportação institucional autorizada ser validada e a migration ser aplicada, a interface exibe estado sem dados. Não são calculados índice consolidado, classificação ou parâmetros próprios.
