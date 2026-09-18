import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "SI 프로젝트 체크리스트 가이드 | Easy PMS",
  description:
    "SI 프로젝트 착수부터 종료까지 단계별로 놓치기 쉬운 실무 체크포인트와 Easy PMS 체크리스트 활용법을 정리했습니다.",
};

export default function GuidePage() {
  return (
    <main className="flex-1 px-5 py-10">
      <div className="mx-auto w-full max-w-2xl">
        <Link href="/" className="text-sm text-slate-500 hover:text-slate-700">
          ← 홈으로
        </Link>

        <h1 className="mt-4 text-2xl font-bold text-slate-900">
          SI 프로젝트 체크리스트 가이드
        </h1>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          착수부터 종료까지, SI 현장에서 실제로 자주 누락되는 항목들을
          단계별로 정리했습니다. Easy PMS 체크리스트는 이 흐름을 그대로
          템플릿화한 도구입니다.
        </p>

        <div className="mt-10 space-y-12 text-sm leading-relaxed text-slate-700">
          <section>
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              왜 체크리스트가 필요한가
            </h2>
            <p>
              SI 프로젝트는 발주처, 수행사, 하도급사, 현업 부서 등 여러
              이해관계자가 얽혀 있고, 계약·요구사항·설계·개발·테스트·오픈까지
              단계마다 챙겨야 할 문서와 승인 절차가 다릅니다. 특히 PM/PL
              한두 명이 여러 단계를 동시에 관리하는 중소 프로젝트에서는
              &ldquo;누군가 당연히 했겠지&rdquo;라고 생각한 항목이 실제로는
              아무도 처리하지 않은 채 넘어가는 경우가 흔합니다.
            </p>
            <p className="mt-2">
              체크리스트는 이런 누락을 방지하는 가장 단순하고 효과적인
              도구입니다. 아래 10단계는 실제 SI 현장에서 반복적으로
              쓰이는 흐름을 기준으로 구성했으며, Easy PMS의 기본 템플릿과
              1:1로 대응합니다.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-lg font-bold text-slate-900">
              단계별 실무 체크포인트
            </h2>

            <div className="space-y-6">
              <Stage
                number="01"
                title="착수 준비"
                body="계약 체결 직후, 실제 작업이 시작되기 전 단계입니다. 착수보고서와 프로젝트 헌장(Charter)으로 목적·범위·이해관계자를 문서화해 두면 이후 분쟁의 근거 자료가 됩니다. 특히 PM/PL의 보고 라인과 비상연락망을 킥오프 미팅 이전에 확정해야, 초기 커뮤니케이션 혼선을 줄일 수 있습니다. 개발 환경 계정 신청은 발급까지 시간이 걸리는 경우가 많아 가장 먼저 처리하는 것이 좋습니다."
              />
              <Stage
                number="02"
                title="계약 / 범위 관리"
                body="과업지시서(RFP)와 계약서상 범위를 서면으로 명확히 구분해 두지 않으면, 프로젝트 중후반에 '이것도 포함이냐 아니냐'는 논쟁이 반드시 발생합니다. 변경관리 프로세스(누가 승인하고, 일정·비용에 어떻게 반영하는지)를 초기에 합의해 두면 이후 변경요청(CR)을 체계적으로 관리할 수 있습니다. 지체상금·하자보수 조건은 계약서에서 가장 먼저 확인해야 할 항목입니다."
              />
              <Stage
                number="03"
                title="요구사항 정의 / 분석"
                body="현행 시스템(As-Is) 분석 없이 요구사항을 정의하면 기존 업무 프로세스와 충돌하는 설계가 나오기 쉽습니다. 요구사항 추적표(RTM)를 초기에 만들어 두면 이후 설계·테스트 단계에서 '이 요구사항이 어디에 반영됐는지' 역추적이 가능해집니다. 성능·보안·가용성 같은 비기능 요구사항은 현업 인터뷰에서 잘 언급되지 않으므로 별도로 챙겨야 합니다."
              />
              <Stage
                number="04"
                title="설계"
                body="화면설계서, ERD, API 명세, 아키텍처 설계서는 개발 착수 전 발주처 리뷰를 거쳐야 합니다. 설계 승인 없이 개발을 먼저 시작하면, 설계 변경이 곧 재작업으로 이어질 위험이 커집니다. 보안 설계(인증/인가, 암호화, 접근통제)는 개인정보 처리 여부에 따라 법적 요건이 달라지므로 초기에 범위를 확정해야 합니다."
              />
              <Stage
                number="05"
                title="개발"
                body="코딩 컨벤션과 브랜치 전략은 개발자가 여러 명 투입되기 전에 정해야 합의 비용이 적습니다. CI/CD 파이프라인을 초기에 구성해 두면 테스트 단계에서 배포 자동화의 이점을 그대로 누릴 수 있습니다. 주간 진척 보고는 WBS 대비 실제 진행률을 비교하는 형태로 운영해야 일정 지연을 조기에 감지할 수 있습니다."
              />
              <Stage
                number="06"
                title="테스트 / 품질"
                body="통합테스트와 UAT(사용자 인수테스트)는 목적이 다릅니다. 통합테스트는 모듈 간 연계 오류를 찾는 것이고, UAT는 현업이 실제 업무 시나리오대로 사용 가능한지 확인하는 것입니다. 결함 관리대장으로 결함을 등급별로 추적하지 않으면, 오픈 직전에 '아직 안 고쳐진 결함이 몇 개인지' 파악하기 어려워집니다. 개인정보처리시스템에 해당하면 보안 취약점 점검(모의해킹) 대상 여부를 반드시 확인해야 합니다."
              />
              <Stage
                number="07"
                title="오픈 / 이관"
                body="오픈 계획서에는 롤백 계획이 반드시 포함되어야 합니다. 데이터 이관은 이관 후 정합성 검증(건수, 샘플 데이터 대조)까지 계획에 포함해야 하며, 오픈 리허설을 통해 실제 오픈 시나리오를 사전에 검증하는 것이 안전합니다. 오픈 직후에는 Hyper-care(집중 모니터링) 기간을 운영해 초기 장애에 빠르게 대응해야 합니다."
              />
              <Stage
                number="08"
                title="산출물 관리"
                body="착수/중간/완료 보고서, 설계서 최종본, 테스트 결과서, 매뉴얼, 소스코드는 모두 발주처 검수의 근거 자료입니다. 산출물 목록표(Baseline)를 프로젝트 초기부터 관리해야, 종료 시점에 누락된 산출물을 뒤늦게 찾는 상황을 피할 수 있습니다."
              />
              <Stage
                number="09"
                title="종료 / 검수 / 인수인계"
                body="검수 기준은 사전에 발주처와 협의해 두어야 하며, 검수 완료 확인서(검수조서) 없이는 공식적으로 프로젝트가 종료되지 않습니다. 운영/유지보수팀으로의 인수인계 시 시스템 구조와 이슈 이력을 함께 공유해야 운영 초기 혼선을 줄일 수 있습니다. 개발 계정 회수와 운영 계정 이관도 이 시점에 반드시 처리해야 할 보안 항목입니다."
              />
              <Stage
                number="10"
                title="리스크 / 이슈 / 의사소통"
                body="리스크 관리대장과 이슈 관리대장은 프로젝트 시작부터 종료까지 지속적으로 운영해야 의미가 있습니다. 정기 보고회의와 회의록은 발주처와의 책임 소재를 명확히 하는 근거 자료가 되므로, 형식적으로라도 빠짐없이 작성하는 것이 좋습니다."
              />
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              Easy PMS 체크리스트 사용법
            </h2>
            <ol className="list-decimal space-y-2 pl-5">
              <li>
                홈 화면에서 <strong>&ldquo;새 프로젝트 체크리스트 만들기&rdquo;</strong>를
                눌러 프로젝트명, 고객사명, 기간 등 기본 정보를 입력하면
                위 10단계 템플릿(약 60개 항목)이 자동으로 복제됩니다.
              </li>
              <li>
                생성이 완료되면 6자리 <strong>공유 코드</strong>가
                발급됩니다. 이 코드를 팀원에게 전달하면 로그인 없이 동일한
                체크리스트에 접근할 수 있습니다.
              </li>
              <li>
                체크리스트 화면에서 카테고리별 진행률을 확인하고, 완료된
                항목을 체크하거나 숨길 수 있습니다.
              </li>
              <li>
                프로젝트 특성에 맞는 항목이 템플릿에 없다면 직접 추가·수정·삭제할
                수 있습니다.
              </li>
              <li>
                다음 접속부터는 홈 화면에서 공유 코드만 입력하면 동일
                프로젝트로 바로 이동합니다.
              </li>
            </ol>
          </section>

          <section>
            <h2 className="mb-3 text-lg font-bold text-slate-900">
              자주 묻는 질문
            </h2>
            <div className="space-y-4">
              <Faq
                q="공유 코드를 잊어버리면 어떻게 하나요?"
                a="현재는 코드를 별도로 복구하는 기능이 없으므로, 프로젝트 생성 시 코드를 안전한 곳에 기록해 두는 것을 권장합니다."
              />
              <Faq
                q="회원가입 없이도 데이터가 안전하게 보관되나요?"
                a="공유 코드를 아는 사람은 누구나 데이터에 접근·수정할 수 있는 구조입니다. 외부에 공개하지 않아야 할 프로젝트라면 코드 공유 범위를 신중히 관리해야 합니다. 자세한 내용은 개인정보처리방침을 참고하세요."
              />
              <Faq
                q="템플릿 항목을 우리 회사 프로세스에 맞게 바꿀 수 있나요?"
                a="네. 프로젝트별로 항목을 자유롭게 추가·수정·삭제할 수 있으며, 템플릿은 시작점일 뿐 그대로 따를 필요는 없습니다."
              />
            </div>
          </section>

          <section>
            <p>
              더 궁금한 점이 있다면{" "}
              <Link href="/about" className="underline">
                소개 및 문의
              </Link>{" "}
              페이지를 통해 연락해 주세요.
            </p>
          </section>
        </div>
      </div>
    </main>
  );
}

function Stage({
  number,
  title,
  body,
}: {
  number: string;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-xl border border-slate-200 p-4">
      <div className="flex items-baseline gap-2">
        <span className="text-xs font-semibold text-slate-400">{number}</span>
        <h3 className="text-sm font-semibold text-slate-900">{title}</h3>
      </div>
      <p className="mt-2 text-slate-600">{body}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div>
      <p className="font-semibold text-slate-900">Q. {q}</p>
      <p className="mt-1 text-slate-600">A. {a}</p>
    </div>
  );
}
