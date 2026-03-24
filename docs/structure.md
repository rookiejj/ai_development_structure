[ 프로젝트 구조 ]

my-project/

├── .ai/                           # AI 동작 기준 레이어 (도구 독립)
│                                  # 특정 AI 툴에 종속되지 않는 프로젝트 내 공통 AI 기준
│                                  # 협업 시에도 동일한 결과를 재현하기 위한 기준점
│
│   ├── config.md                  # AI 역할 / 작업 방식 / 응답 기준 정의
│                                  # 모든 AI 작업의 출발점
│                                  # "어떻게 답할지"가 아니라 "어떻게 일할지"를 정의
│                                  # 세션 시작 시 항상 참조되는 핵심 파일
│
│   ├── map.md                     # src/ 구조, 주요 흐름, 책임 분리 요약
│                                  # 코드베이스가 커질 때 AI 컨텍스트 비용 절감 목적
│
│   ├── memory/                    # AI 참고용 컨텍스트 레이어
│   │                              # 개인 + 프로젝트 맥락을 담는 공간
│   │                              # "팀 공식 문서"가 아닌 "AI 보조 기억" 역할
│   │
│   │   ├── context.md             # 프로젝트 전체 맥락
│   │   │                          # 목표, 현재 상태, 핵심 기능 요약
│   │   │                          # 새 세션 시작 시 가장 먼저 읽는 파일
│   │   │
│   │   ├── patterns.md            # 코드 패턴 / 안티패턴
│   │   │                          # 코드 스타일 일관성 유지 핵심 파일
│   │   │                          # 반복되는 실수 방지 및 구조 통일
│   │   │
│   │   ├── personal.md            # 개인 개발 스타일 / 선호 (로컬 작업 파일)
│   │                              # AI가 개발자의 성향을 반영하도록 하는 파일
│   │                              # 협업 시 개인별 분리 또는 제거 가능
│   │   └── personal.example.md    # personal.md 작성 예시 템플릿 (버전 관리)
│   │
│   ├── rules.md                   # 코딩 규칙 원본 (팀 기준)
│   │                              # 네이밍, 구조, 금지사항 등 상세 규칙 정의
│   │                              # 변경 시 PR/리뷰 권장
│   │                              # .airules는 이 파일의 요약본
│   │
│   ├── skills/                    # (선택) 도메인별 전문 지식 스킬
│   │   │                          # 특정 작업 시 AI가 참조하는 전문 지식 모듈
│   │   │                          # tasks/current.md에서 활성 스킬로 지정해 사용
│   │   │                          # git push 여부는 팀 기준에 따라 결정
│   │   │
│   │   └── [skill-name]/          # 스킬 단위 폴더
│   │       └── SKILL.md           # 스킬 정의 (frontmatter + 지시사항)
│   │
│   └── prompts/                   # AI 요청 템플릿
│       │                          # 작업 유형별 표준화된 요청 구조
│       │                          # 협업 시 요청 품질 일관성 유지 및 온보딩 역할
│       │
│       ├── feature.md             # 기능 개발 요청 템플릿
│       │                          # 요구사항, 예외 케이스, 완료 기준 포함
│       │
│       ├── bugfix.md              # 버그 수정 요청 템플릿
│       │                          # 재현 조건, 기대 동작 명시
│       │
│       ├── refactor.md            # 리팩토링 요청 템플릿
│       │                          # 유지할 인터페이스, 변경 범위 정의
│       │
│       └── review.md              # 코드 리뷰 요청 템플릿
│                                  # 검토 기준, 우선순위, 출력 형식 정의
│
├── docs/                          # 팀 및 인간 중심 문서 레이어 (공식 자산)
│                                  # AI memory와 분리된 "협업 기준 문서"
│                                  # 외부 공유 및 온보딩 기준점
│
│   ├── architecture.md            # 시스템 설계 문서
│   │                              # 전체 구조, 데이터 흐름, 외부 연동 설명
│   │                              # 프로젝트 이해의 기준 문서
│   │
│   ├── plan.md                    # 중장기 로드맵
│   │                              # 분기/연간 목표 등 큰 방향성 관리
│   │                              # 자주 변경되지 않는 내용만 포함
│   │
│   ├── research.md                # 기술 조사 기록
│   │                              # 비교, 실험 결과 등 원본 자료
│   │                              # 결론은 decisions.md에 반영
│   │
│   ├── decisions.md               # 의사결정 기록 (WHY 중심)
│   │                              # 기술 선택, 구조 변경, 트레이드오프 기록
│   │                              # 처음부터 팀 자산으로 관리
│   │                              # 온보딩 및 유지보수 시 가장 중요한 문서
│   │
│   ├── onboarding.md              # 신규 팀원 / 시스템 최초 도입 가이드
│   │                              # 환경 세팅, 구조 이해, AI 도구 연결
│   │                              # 처음 1회만 읽으면 되는 문서
│   │
│   ├── workflow.md                # 개발자 일상 작업 흐름
│   │                              # 세션 시작 ~ 마무리까지 반복 사이클 정의
│   │                              # 매일 참고하는 문서
│   │
│   ├── reference.md               # 파일별 작성 예시 모음
│   │                              # "이 파일 어떻게 쓰더라?" 할 때 찾아보는 문서
│   │                              # 수시로 참조
│   │
│   └── gitrules.md            # (선택) 협업 규칙
│                                  # 브랜치 전략, 커밋 규칙, PR 프로세스 정의
│                                  # 협업 시작 시 활성화
│
├── tasks/                         # 작업 관리 레이어
│                                  # 현재 실행 상태를 관리하는 공간
│
│   ├── current.md                 # 현재 진행 중 작업 (로컬 작업 파일)
│   │                              # 항상 최신 상태 유지
│   │                              # "지금 무엇을 하는가"를 즉시 파악
│   │
│   ├── current.example.md         # current.md 작성 예시 템플릿 (버전 관리)
│   │
│   ├── backlog.md                 # (선택) 대기 작업 목록 (로컬 작업 파일)
│   │                              # 작업이 누적될 때만 사용
│   │
│   ├── backlog.example.md         # backlog.md 작성 예시 템플릿 (버전 관리)
│   │
│   └── sprint/                    # (선택) 스프린트 관리
│       │                          # 협업 또는 작업 규모 증가 시 사용
│       │
│       └── sprint-01.md           # 스프린트 단위 작업 정의
│                                  # 목표, 작업, 완료 기준 포함
│
├── src/                           # 실제 애플리케이션 코드 (작업의 최종 목적지)
│                                  # 모든 AI 요청과 작업 흐름은 결국 여기를 향한다
│                                  # 기능 단위(features) 구조 권장
│                                  # UI, API, 비즈니스 로직 분리
│                                  # 구조 변경 시 .ai/map.md 반드시 동기화
│
├── .airules                       # AI 실행 규칙 요약본
│                                  # rules.md 핵심만 추출
│                                  # AI가 빠르게 읽기 위한 경량 파일
│                                  # 직접 수정 금지 (rules.md 기준 재생성)
│
├── README.md                      # 외부 공개용 설명
│                                  # 설치 및 실행 방법 간단 안내
│                                  # 내부 구조(.ai)는 최소 노출
│
└── ...

[ 운영 원칙 ]

1. 구조는 협업 기준으로 설계하되, 모든 파일을 항상 사용하지 않는다.

2. 초기 활성 파일 (스크립트로 생성 또는 템플릿 repo에 포함):
   - .ai/config.md
   - .ai/map.md
   - .ai/memory/context.md
   - .ai/memory/personal.example.md
   - .ai/memory/patterns.md
   - tasks/current.example.md

   팀 템플릿 repo에서 가져오는 파일 (생성 아닌 참조):
   - docs/onboarding.md
   - docs/workflow.md
   - docs/reference.md

   clone 후 로컬 작업 파일로 복사:
   - .ai/memory/personal.example.md -> .ai/memory/personal.md
   - tasks/current.example.md -> tasks/current.md
   - tasks/backlog.example.md -> tasks/backlog.md (필요할 때만)

3. docs/decisions.md는 초기부터 작성한다.
   - 모든 중요한 기술 선택은 반드시 기록
   - "왜 이렇게 했는가"를 남기는 것이 목적
   - 관련 작업(task, PR 등)이 있으면 함께 기록하여 추적 가능하게 한다

4. 선택적 파일 사용 조건:

   backlog.md:
   - 작업이 current.md로 관리 어려울 정도로 많아질 때

   sprint/:
   - 작업 단위가 커지거나 협업 시작 시

   onboarding.md / workflow.md / reference.md:
   - 팀 템플릿 repo에 포함된 공통 문서
   - 새 프로젝트는 repo 클론으로 가져옴 (스크립트로 생성하지 않음)
   - 새로운 개발자 합류 시 공유

   gitrules.md:
   - PR / 브랜치 관리가 필요해질 때

   skills/:
   - 같은 도메인 작업을 반복하면서 AI에게 같은 설명을 3번 이상 반복하게 될 때
   - 외부 스킬 repo에서 필요한 스킬을 가져다 쓸 때

5. memory와 docs의 역할은 명확히 분리한다.

   memory:
   - AI가 참고하는 컨텍스트
   - 개인 스타일 및 작업 보조

   docs:
   - 팀 자산
   - 협업, 기록, 의사결정

6. AI 사용 시 항상 다음 파일을 먼저 참조하도록 한다:

   - .ai/config.md
   - .ai/memory/context.md
   - .ai/memory/personal.md
   - .ai/memory/patterns.md

7. rules.md 변경 시:
   - .airules는 반드시 동기화
   - 두 파일 간 불일치 금지
