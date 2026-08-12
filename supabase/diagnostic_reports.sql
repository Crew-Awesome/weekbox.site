create table if not exists public.diagnostic_reports (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default timezone('utc', now()),
  reported_at timestamptz,
  app_version text not null,
  neutralino_version text,
  operating_system text not null,
  architecture text not null,
  locale jsonb,
  disks jsonb,
  network jsonb,
  action text not null,
  action_url text,
  item text,
  item_version text,
  storage_path text,
  issue text,
  title text,
  summary text,
  error_message text,
  stack_trace text not null,
  diagnostics jsonb
);

alter table public.diagnostic_reports enable row level security;

create index if not exists diagnostic_reports_created_at_idx
  on public.diagnostic_reports (created_at desc);

create index if not exists diagnostic_reports_issue_idx
  on public.diagnostic_reports (issue);
