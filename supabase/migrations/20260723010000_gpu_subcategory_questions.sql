-- Turns "Does it have dedicated graphics?" into a real sub-category chain:
-- picking "Yes" reveals a GPU-type question (GTX / RTX / Radeon for Windows,
-- a Mac-specific graphics question for Apple), and each type then reveals
-- its own model list. Uses the existing depends_on_processor_family /
-- processor_family tag mechanism, which already supports any number of
-- independent or chained sub-category questions — no schema change needed.
do $$
declare
  v_category_id uuid;
  v_dedicated_option_id uuid;
  v_group_id uuid;
begin
  select id into v_category_id from public.device_categories where slug = 'laptops';
  if v_category_id is null then
    return;
  end if;

  select co.id into v_dedicated_option_id
  from public.configuration_options co
  join public.configuration_groups cg on cg.id = co.group_id
  where cg.category_id = v_category_id
    and cg.title = 'Does it have dedicated graphics?'
    and co.label = 'Yes, dedicated graphics'
  limit 1;

  if v_dedicated_option_id is not null then
    update public.configuration_options
    set processor_family = 'dedicated_gpu'
    where id = v_dedicated_option_id;
  end if;

  if not exists (
    select 1 from public.configuration_groups
    where category_id = v_category_id and title = 'Which type of graphics card does it have?'
  ) then
    insert into public.configuration_groups
      (category_id, platform, title, helper_text, selection_mode, step_order, depends_on_processor_family)
    values
      (v_category_id, 'windows', 'Which type of graphics card does it have?',
       'Pick the vendor/series printed on the laptop spec sheet or sticker.', 'single', 6, 'dedicated_gpu')
    returning id into v_group_id;
    insert into public.configuration_options
      (group_id, label, description, price_effect_type, price_effect_amount, processor_family, sort_order) values
      (v_group_id, 'NVIDIA GTX', 'Entry-level gaming series', 'bonus_fixed', 0, 'gpu_gtx', 1),
      (v_group_id, 'NVIDIA RTX', 'Ray-tracing, latest generation', 'bonus_fixed', 0, 'gpu_rtx', 2),
      (v_group_id, 'AMD Radeon', 'Discrete AMD graphics', 'bonus_fixed', 0, 'gpu_radeon', 3);

    insert into public.configuration_groups
      (category_id, platform, title, helper_text, selection_mode, step_order, depends_on_processor_family)
    values
      (v_category_id, 'windows', 'Which GTX model is it?', null, 'single', 7, 'gpu_gtx')
    returning id into v_group_id;
    insert into public.configuration_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, 'GTX 1050 / 1050 Ti', 'bonus_fixed', 1000, 1),
      (v_group_id, 'GTX 1650', 'bonus_fixed', 1800, 2),
      (v_group_id, 'GTX 1660 Ti or higher', 'bonus_fixed', 2800, 3);

    insert into public.configuration_groups
      (category_id, platform, title, helper_text, selection_mode, step_order, depends_on_processor_family)
    values
      (v_category_id, 'windows', 'Which RTX model is it?', null, 'single', 7, 'gpu_rtx')
    returning id into v_group_id;
    insert into public.configuration_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, 'RTX 3050', 'bonus_fixed', 3200, 1),
      (v_group_id, 'RTX 3060', 'bonus_fixed', 4500, 2),
      (v_group_id, 'RTX 4050', 'bonus_fixed', 5500, 3),
      (v_group_id, 'RTX 4060 or higher', 'bonus_fixed', 7500, 4);

    insert into public.configuration_groups
      (category_id, platform, title, helper_text, selection_mode, step_order, depends_on_processor_family)
    values
      (v_category_id, 'windows', 'Which Radeon model is it?', null, 'single', 7, 'gpu_radeon')
    returning id into v_group_id;
    insert into public.configuration_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, 'Radeon RX 5500M / 6500M', 'bonus_fixed', 1500, 1),
      (v_group_id, 'Radeon RX 6600M or higher', 'bonus_fixed', 3200, 2);

    insert into public.configuration_groups
      (category_id, platform, title, helper_text, selection_mode, step_order, depends_on_processor_family)
    values
      (v_category_id, 'apple', 'Which Mac graphics option does it have?',
       'Only Intel-based MacBook Pros have a separate discrete GPU — Apple Silicon graphics are built into the chip.',
       'single', 6, 'dedicated_gpu')
    returning id into v_group_id;
    insert into public.configuration_options (group_id, label, price_effect_type, price_effect_amount, sort_order) values
      (v_group_id, 'Radeon Pro 555X / 560X', 'bonus_fixed', 1500, 1),
      (v_group_id, 'Radeon Pro 5300M / 5500M', 'bonus_fixed', 3000, 2),
      (v_group_id, 'Radeon Pro 5600M or newer', 'bonus_fixed', 4800, 3);
  end if;
end $$;

notify pgrst, 'reload schema';
