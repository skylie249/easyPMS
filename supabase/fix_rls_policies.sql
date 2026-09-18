-- RLS 정책 수정: anon 키로 CRUD가 되지 않는 문제 해결
-- 원인: 기존 정책이 role 지정 없이 생성되어(`create policy ... using (true)`)
--       Supabase 프로젝트 설정에 따라 anon 역할에 적용되지 않는 경우가 있음
--
-- 적용 방법: Supabase 대시보드 > SQL Editor에서 이 파일 전체를 실행하세요.
-- 기존 데이터는 변경되지 않으며, 정책만 재생성됩니다.

drop policy if exists "anon full access - projects" on projects;
drop policy if exists "anon full access - checklist_categories" on checklist_categories;
drop policy if exists "anon full access - checklist_items" on checklist_items;
drop policy if exists "anon read - template_categories" on template_categories;
drop policy if exists "anon read - template_items" on template_items;

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

-- 확인용: 아래 쿼리로 anon 역할에 정책이 정상 적용됐는지 확인 가능
-- select schemaname, tablename, policyname, roles, cmd
-- from pg_policies
-- where tablename in ('projects', 'checklist_categories', 'checklist_items', 'template_categories', 'template_items');
