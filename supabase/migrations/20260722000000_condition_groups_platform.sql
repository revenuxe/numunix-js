-- Condition questions (evaluation steps) can now be scoped to a platform the
-- same way configuration questions already are: null = universal, otherwise
-- shown only for a matching brand platform.
alter table public.condition_groups
  add column if not exists platform text check (platform is null or platform in ('apple', 'windows'));
