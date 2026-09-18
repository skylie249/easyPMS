-- Easy PMS Checklist - Supabase 스키마
-- 로그인 없이 사용하는 초경량 구조: 프로젝트는 공유 가능한 코드(project_code)로 구분

-- 1. 프로젝트 (사용자가 만드는 각 SI 프로젝트 단위)
create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  client_name text,
  start_date date,
  end_date date,
  memo text,
  share_code text not null unique, -- 6자리 코드로 모바일에서 접속 (예: A1B2C9)
  created_at timestamptz not null default now()
);

-- 2. 체크리스트 카테고리 (PMBOK 지식영역 or SI 단계)
create table if not exists checklist_categories (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  name text not null,
  sort_order int not null default 0,
  is_custom boolean not null default false, -- 사용자가 직접 추가한 카테고리인지
  created_at timestamptz not null default now()
);

-- 3. 체크리스트 항목
create table if not exists checklist_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references checklist_categories(id) on delete cascade,
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  description text,
  is_checked boolean not null default false,
  checked_at timestamptz,
  sort_order int not null default 0,
  is_custom boolean not null default false, -- 사용자가 직접 추가한 항목인지
  source text default 'template', -- 'template' | 'custom'
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- 4. 체크리스트 템플릿 (프로젝트 생성시 기본으로 복제되는 SI 실무 체크리스트 원본)
-- locale: 'ko' | 'en' — 프로젝트 생성 화면의 언어에 맞는 템플릿을 조회하는 데 사용
create table if not exists template_categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  sort_order int not null default 0,
  locale text not null default 'ko'
);

create table if not exists template_items (
  id uuid primary key default gen_random_uuid(),
  category_id uuid not null references template_categories(id) on delete cascade,
  title text not null,
  description text,
  sort_order int not null default 0,
  locale text not null default 'ko'
);

-- 인덱스
create index if not exists idx_categories_project on checklist_categories(project_id);
create index if not exists idx_items_project on checklist_items(project_id);
create index if not exists idx_items_category on checklist_items(category_id);
create index if not exists idx_template_items_category on template_items(category_id);

-- RLS: 로그인 없는 공유코드 기반 서비스이므로 anon 키로 전체 CRUD 허용
-- (민감정보 없는 개인/팀 체크리스트용 최소 보안 모델)
alter table projects enable row level security;
alter table checklist_categories enable row level security;
alter table checklist_items enable row level security;
alter table template_categories enable row level security;
alter table template_items enable row level security;

create policy "anon full access - projects" on projects
  for all to anon using (true) with check (true);
create policy "anon full access - checklist_categories" on checklist_categories
  for all to anon using (true) with check (true);
create policy "anon full access - checklist_items" on checklist_items
  for all to anon using (true) with check (true);
create policy "anon read - template_categories" on template_categories
  for select to anon using (true);
create policy "anon read - template_items" on template_items
  for select to anon using (true);

-- updated_at 자동 갱신
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trg_items_updated_at on checklist_items;
create trigger trg_items_updated_at
  before update on checklist_items
  for each row execute function set_updated_at();
