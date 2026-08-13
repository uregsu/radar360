create or replace function public.validate_school_experience_metrics()
returns trigger
language plpgsql
set search_path = public
as $$
declare
  dimension_keys constant text[] := array[
    'class_quality','school_climate','spaces_and_bathrooms',
    'learning_support','engagement_life_project','overall_satisfaction'
  ];
  dimension_scores numeric[];
  calculated_average numeric(7,4);
  calculated_attention numeric(7,4);
  calculated_base public.school_experience_attention_level;
  calculated_level public.school_experience_attention_level;
  calculated_critical text;
  calculated_critical_score numeric(7,4);
  calculated_best text;
  calculated_best_score numeric(7,4);
  calculated_best_positions integer[];
  calculated_below_3 smallint;
  calculated_below_4 smallint;
  calculated_below_5 smallint;
  calculated_below_6 smallint;
begin
  dimension_scores := array[
    new.class_quality,new.school_climate,new.spaces_and_bathrooms,
    new.learning_support,new.engagement_life_project,new.overall_satisfaction
  ];
  calculated_average := round((
    new.class_quality + new.school_climate + new.spaces_and_bathrooms +
    new.learning_support + new.engagement_life_project + new.overall_satisfaction
  ) / 6, 4);
  calculated_attention := round(greatest(0, least(100, (10 - calculated_average) * 10)), 4);
  select min(score), max(score)
  into calculated_critical_score, calculated_best_score
  from unnest(dimension_scores) score;
  calculated_critical := dimension_keys[array_position(dimension_scores, calculated_critical_score)];
  calculated_best_positions := array_positions(dimension_scores, calculated_best_score);
  calculated_best := dimension_keys[calculated_best_positions[array_length(calculated_best_positions, 1)]];
  calculated_below_3 := (
    select count(*)::smallint from unnest(dimension_scores) score where score < 3
  );
  calculated_below_4 := (
    select count(*)::smallint from unnest(dimension_scores) score where score < 4
  );
  calculated_below_5 := (
    select count(*)::smallint from unnest(dimension_scores) score where score < 5
  );
  calculated_below_6 := (
    select count(*)::smallint from unnest(dimension_scores) score where score < 6
  );
  calculated_base := case
    when calculated_attention < 20 then 'FAVORAVEL'
    when calculated_attention < 35 then 'REGULAR'
    when calculated_attention < 50 then 'ATENCAO'
    when calculated_attention < 65 then 'ELEVADA'
    else 'PRIORIDADE'
  end;
  calculated_level := case
    when calculated_below_3 > 0 then 'PRIORIDADE'::public.school_experience_attention_level
    when calculated_below_4 > 0 or calculated_below_5 >= 2 then
      case
        when calculated_base = 'PRIORIDADE' then 'PRIORIDADE'::public.school_experience_attention_level
        else 'ELEVADA'::public.school_experience_attention_level
      end
    when calculated_below_6 >= 3 then 'PRIORIDADE'::public.school_experience_attention_level
    else calculated_base
  end;

  if new.average_score is not null and abs(new.average_score - calculated_average) > 0.001 then
    raise exception 'average_score diverge das seis dimensões';
  end if;
  if new.attention_score is not null and abs(new.attention_score - calculated_attention) > 0.001 then
    raise exception 'attention_score diverge da média calculada';
  end if;
  if new.critical_dimension is not null and new.critical_dimension <> calculated_critical then
    raise exception 'critical_dimension diverge da menor dimensão';
  end if;
  if new.critical_dimension_score is not null and abs(new.critical_dimension_score - calculated_critical_score) > 0.0001 then
    raise exception 'critical_dimension_score diverge da menor dimensão';
  end if;
  if new.best_dimension is not null and new.best_dimension <> calculated_best then
    raise exception 'best_dimension diverge da maior dimensão';
  end if;
  if new.best_dimension_score is not null and abs(new.best_dimension_score - calculated_best_score) > 0.0001 then
    raise exception 'best_dimension_score diverge da maior dimensão';
  end if;
  if new.below_3_count is not null and new.below_3_count <> calculated_below_3 then
    raise exception 'below_3_count diverge das dimensões';
  end if;
  if new.below_4_count is not null and new.below_4_count <> calculated_below_4 then
    raise exception 'below_4_count diverge das dimensões';
  end if;
  if new.below_5_count is not null and new.below_5_count <> calculated_below_5 then
    raise exception 'below_5_count diverge das dimensões';
  end if;
  if new.below_6_count is not null and new.below_6_count <> calculated_below_6 then
    raise exception 'below_6_count diverge das dimensões';
  end if;
  if new.trigger_count is not null and new.trigger_count <> calculated_below_6 then
    raise exception 'trigger_count diverge dos motivos de atenção';
  end if;
  if new.base_attention_level is not null and new.base_attention_level <> calculated_base then
    raise exception 'base_attention_level diverge do índice matemático';
  end if;
  if new.attention_level is not null and new.attention_level <> calculated_level then
    raise exception 'attention_level diverge dos gatilhos';
  end if;
  if tg_op = 'UPDATE' and new.imported_by is distinct from old.imported_by then
    raise exception 'imported_by representa a importação original e não pode ser alterado';
  end if;
  if tg_op = 'UPDATE' and new.imported_at is distinct from old.imported_at then
    raise exception 'imported_at representa a importação original e não pode ser alterado';
  end if;

  new.average_score := calculated_average;
  new.attention_score := calculated_attention;
  new.base_attention_level := calculated_base;
  new.attention_level := calculated_level;
  new.critical_dimension := calculated_critical;
  new.critical_dimension_score := calculated_critical_score;
  new.best_dimension := calculated_best;
  new.best_dimension_score := calculated_best_score;
  new.trigger_count := calculated_below_6;
  new.below_3_count := calculated_below_3;
  new.below_4_count := calculated_below_4;
  new.below_5_count := calculated_below_5;
  new.below_6_count := calculated_below_6;
  if tg_op = 'UPDATE' then new.updated_by := auth.uid(); end if;
  return new;
end;
$$;
