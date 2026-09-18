-- SI 프로젝트 실무 체크리스트 기본 템플릿 시드 데이터
-- 프로젝트 생명주기 순서로 카테고리 구성

do $$
declare
  cat_kickoff uuid;
  cat_requirement uuid;
  cat_contract uuid;
  cat_design uuid;
  cat_dev uuid;
  cat_test uuid;
  cat_release uuid;
  cat_deliverable uuid;
  cat_closing uuid;
  cat_risk uuid;
begin

  insert into template_categories (id, name, sort_order) values
    (gen_random_uuid(), '01. 착수 준비', 1) returning id into cat_kickoff;
  insert into template_categories (id, name, sort_order) values
    (gen_random_uuid(), '02. 계약/범위 관리', 2) returning id into cat_contract;
  insert into template_categories (id, name, sort_order) values
    (gen_random_uuid(), '03. 요구사항 정의/분석', 3) returning id into cat_requirement;
  insert into template_categories (id, name, sort_order) values
    (gen_random_uuid(), '04. 설계', 4) returning id into cat_design;
  insert into template_categories (id, name, sort_order) values
    (gen_random_uuid(), '05. 개발', 5) returning id into cat_dev;
  insert into template_categories (id, name, sort_order) values
    (gen_random_uuid(), '06. 테스트/품질', 6) returning id into cat_test;
  insert into template_categories (id, name, sort_order) values
    (gen_random_uuid(), '07. 오픈/이관', 7) returning id into cat_release;
  insert into template_categories (id, name, sort_order) values
    (gen_random_uuid(), '08. 산출물 관리', 8) returning id into cat_deliverable;
  insert into template_categories (id, name, sort_order) values
    (gen_random_uuid(), '09. 종료/검수/유지보수 인수인계', 9) returning id into cat_closing;
  insert into template_categories (id, name, sort_order) values
    (gen_random_uuid(), '10. 리스크/이슈/의사소통', 10) returning id into cat_risk;

  -- 01. 착수 준비
  insert into template_items (category_id, title, description, sort_order) values
    (cat_kickoff, '착수보고서 작성 및 보고', '프로젝트 개요, 추진체계, 일정, 조직도 포함', 1),
    (cat_kickoff, '프로젝트 헌장(Charter) 작성', '목적, 범위, 주요 이해관계자, 승인권자 명시', 2),
    (cat_kickoff, '프로젝트 조직도 및 R&R 확정', '발주처/수행사 담당자, 역할과 책임 명확화', 3),
    (cat_kickoff, 'PM/PL 지정 및 연락체계 수립', '비상연락망, 보고 라인 확정', 4),
    (cat_kickoff, '킥오프 미팅 진행', '발주처, 수행사, 주요 이해관계자 대상', 5),
    (cat_kickoff, '개발/운영 환경 계정 및 접근권한 신청', 'VPN, 사내망, 서버 접근 계정 등', 6),
    (cat_kickoff, '표준 산출물 양식(템플릿) 확정', '보고서, 회의록, WBS 등 발주처 표준 확인', 7);

  -- 02. 계약/범위 관리
  insert into template_items (category_id, title, description, sort_order) values
    (cat_contract, '계약서 및 과업지시서(RFP) 내용 숙지', '계약금액, 계약기간, 하자보수기간 확인', 1),
    (cat_contract, '과업 범위(Scope) 명확화 및 서면화', '포함/제외 범위 명시하여 분쟁 예방', 2),
    (cat_contract, '변경관리 프로세스 수립', '범위/일정/비용 변경 시 승인 절차', 3),
    (cat_contract, '하도급 계약 및 등록 여부 확인', '하도급 참여 시 관련 법규 준수', 4),
    (cat_contract, '지체상금/하자보수 조건 확인', '지연 시 페널티 조항 숙지', 5),
    (cat_contract, '보안각서/개인정보 서약서 제출', '투입 인력 전원 보안서약 완료', 6);

  -- 03. 요구사항 정의/분석
  insert into template_items (category_id, title, description, sort_order) values
    (cat_requirement, '현행 시스템 분석(As-Is) 완료', '기존 시스템/업무 프로세스 파악', 1),
    (cat_requirement, '요구사항 정의서(RFP 기반) 작성', '기능/비기능 요구사항 구분하여 정리', 2),
    (cat_requirement, '요구사항 추적표(RTM) 작성', '요구사항-설계-테스트 매핑 관리', 3),
    (cat_requirement, '이해관계자 인터뷰/워크숍 진행', '현업 부서 요구사항 수렴', 4),
    (cat_requirement, '요구사항 우선순위 및 확정(Sign-off)', '발주처 서면 확인/승인', 5),
    (cat_requirement, '비기능 요구사항 정의', '성능, 보안, 가용성, 확장성 기준', 6);

  -- 04. 설계
  insert into template_items (category_id, title, description, sort_order) values
    (cat_design, '화면설계서(UI/UX) 작성', '와이어프레임, 화면 흐름도', 1),
    (cat_design, 'ERD 및 테이블 정의서 작성', '데이터 모델링, 정규화 검토', 2),
    (cat_design, 'API/인터페이스 설계서 작성', '외부/내부 연계 인터페이스 정의', 3),
    (cat_design, '아키텍처 설계서 작성', '시스템 구성도, 인프라 구성', 4),
    (cat_design, '보안 설계 검토', '인증/인가, 암호화, 접근통제 방안', 5),
    (cat_design, '설계 검토회의 및 승인', '발주처/아키텍트 리뷰 완료', 6);

  -- 05. 개발
  insert into template_items (category_id, title, description, sort_order) values
    (cat_dev, '개발 표준/코딩 컨벤션 수립', '네이밍 규칙, 주석 규칙 등', 1),
    (cat_dev, '형상관리(Git 등) 및 브랜치 전략 수립', '개발/스테이징/운영 브랜치 정책', 2),
    (cat_dev, 'CI/CD 파이프라인 구성', '빌드/배포 자동화', 3),
    (cat_dev, '개발 진행 상황 주간 보고 체계 수립', 'WBS 대비 진척률 관리', 4),
    (cat_dev, '코드 리뷰 프로세스 운영', '품질 확보를 위한 상호 리뷰', 5),
    (cat_dev, '단위테스트 작성 및 수행', '주요 모듈 단위 테스트 커버리지 확보', 6);

  -- 06. 테스트/품질
  insert into template_items (category_id, title, description, sort_order) values
    (cat_test, '테스트 계획서 작성', '테스트 범위, 일정, 방법론 정의', 1),
    (cat_test, '통합테스트 시나리오 작성 및 수행', '모듈 간 연계 검증', 2),
    (cat_test, '사용자 인수테스트(UAT) 계획 수립', '현업 참여 테스트 일정 조율', 3),
    (cat_test, 'UAT 진행 및 결과 정리', '결함 목록화 및 조치 확인', 4),
    (cat_test, '성능테스트 수행', '부하/스트레스 테스트, 목표 지표 확인', 5),
    (cat_test, '보안 취약점 점검(모의해킹 등)', '개인정보처리시스템 등 대상 여부 확인', 6),
    (cat_test, '결함 관리대장 운영 및 종결 확인', '결함 등급별 조치 및 재테스트', 7);

  -- 07. 오픈/이관
  insert into template_items (category_id, title, description, sort_order) values
    (cat_release, '오픈 계획서(전환 계획) 작성', '오픈 일자, 롤백 계획 포함', 1),
    (cat_release, '데이터 이관 계획 및 검증', '이관 데이터 정합성 검증 절차', 2),
    (cat_release, '운영 환경 배포 및 최종 점검', '운영서버 설정값, 방화벽 등 확인', 3),
    (cat_release, '오픈 리허설 진행', '실제 오픈 전 시뮬레이션', 4),
    (cat_release, '비상 롤백 계획 수립', '오픈 실패 시 대응 절차', 5),
    (cat_release, '오픈 후 모니터링 및 안정화 기간 운영', 'Hyper-care 기간 이슈 대응', 6);

  -- 08. 산출물 관리
  insert into template_items (category_id, title, description, sort_order) values
    (cat_deliverable, '착수/중간/완료 보고서 제출', '단계별 정식 보고 문서', 1),
    (cat_deliverable, '요구사항정의서/설계서 최종본 정리', '변경사항 반영된 최종 버전', 2),
    (cat_deliverable, '테스트 결과서 제출', 'UAT/통합테스트 결과 포함', 3),
    (cat_deliverable, '사용자 매뉴얼/운영자 매뉴얼 작성', '시스템 사용법, 운영 절차 안내', 4),
    (cat_deliverable, '소스코드 및 형상관리 이력 납품', '전체 소스 및 라이브러리 목록', 5),
    (cat_deliverable, '산출물 목록표(Baseline) 관리', '납품 산출물 전체 리스트 및 버전', 6);

  -- 09. 종료/검수/유지보수 인수인계
  insert into template_items (category_id, title, description, sort_order) values
    (cat_closing, '검수 요청 공문 발송', '검수 절차 및 일정 협의', 1),
    (cat_closing, '검수 기준 및 체크리스트 사전 협의', '발주처 검수 기준 확인', 2),
    (cat_closing, '검수 완료 확인서(검수조서) 수령', '공식 검수 완료 서명', 3),
    (cat_closing, '하자보수 기간 및 범위 확정', '계약서상 하자보수 조건 재확인', 4),
    (cat_closing, '운영/유지보수팀 인수인계 진행', '시스템 구조, 이슈 이력 공유', 5),
    (cat_closing, '계정/권한/접근정보 인계 및 회수', '개발 계정 회수, 운영 계정 이관', 6),
    (cat_closing, '최종 정산 및 대금 청구', '기성/최종 대금 청구 절차', 7),
    (cat_closing, '프로젝트 회고(Lessons Learned) 정리', '잘된 점/개선점 문서화', 8);

  -- 10. 리스크/이슈/의사소통
  insert into template_items (category_id, title, description, sort_order) values
    (cat_risk, '리스크 관리대장 작성 및 주기적 업데이트', '리스크 식별-분석-대응 계획', 1),
    (cat_risk, '이슈 관리대장 운영', '이슈 등록-처리-종결 추적', 2),
    (cat_risk, '정기 주간/월간 보고회의 운영', '발주처와 진척 공유', 3),
    (cat_risk, '회의록 작성 및 배포', '결정사항, 액션아이템 명시', 4),
    (cat_risk, '의사소통 관리 계획 수립', '보고 채널, 주기, 대상 정의', 5),
    (cat_risk, '변경요청(CR) 이력 관리', '범위 변경에 따른 일정/비용 영향 분석', 6);

end $$;
