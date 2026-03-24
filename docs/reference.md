# reference.md
> 위치: `docs/reference.md`
> 이 문서는 팀 공통 자산이다. 새 프로젝트마다 새로 만들지 않고 팀 템플릿 repo에서 가져온다.

파일별 작성 예시 모음.
"이 파일 어떻게 쓰더라?" 할 때 찾아보는 문서다.

---

## `.ai/config.md`
```
## AI 역할
너는 이 프로젝트의 시니어 프론트엔드 개발자처럼 동작한다.

## 작업 방식
- 코드 작성 전 항상 구조 먼저 제안할 것
- 변경 범위가 크면 반드시 확인 후 진행
- 주석은 WHY 중심으로만 작성

## 작업 기준 파일
- 작업 요청 시 tasks/current.md를 기준으로 한다
- rules.md, patterns.md를 항상 준수한다
- tasks/current.md에 활성 스킬이 명시된 경우 해당 스킬을 함께 참조한다

## 세션 시작 시
context.md → personal.md → patterns.md 순서로 읽을 것
```

---

## `.ai/map.md`
```
## src/ 구조 요약

src/
├── features/        # 기능 단위 모듈 (상품, 주문, 정산)
├── components/      # 공통 UI 컴포넌트
├── services/        # API 호출 레이어 (axios 인스턴스 포함)
├── hooks/           # 공통 커스텀 훅
├── stores/          # Zustand 전역 상태
├── pages/           # 라우트 단위 페이지
└── utils/           # 순수 유틸 함수

## 주요 흐름
pages → features → services → API
전역 상태 필요 시 → stores/ 경유
```

---

## `src/` 구조 원칙

> src/는 실제 코드가 들어가는 곳이다. 아래 원칙을 지키면 AI도 같은 구조로 코드를 생성한다.

```
## 폴더 구조 원칙
- 기능 단위(features)로 먼저 나눈다
- 공통 요소(components, hooks, utils)는 별도 분리
- API 호출은 반드시 services/ 레이어를 경유
- 전역 상태는 stores/에서만 관리

## 파일 네이밍
- 컴포넌트: PascalCase (ProductCard.tsx)
- 훅: use 접두사 (useProductList.ts)
- 서비스: camelCase + .service.ts (product.service.ts)
- 스토어: camelCase + .store.ts (cart.store.ts)

## 레이어 책임
- pages/      → 라우트 단위 조합, 레이아웃
- features/   → 기능별 독립 모듈 (자체 components, hooks 포함 가능)
- services/   → 외부 API 통신만 담당
- stores/     → 전역 상태 정의 및 액션
- components/ → 재사용 가능한 순수 UI
- hooks/      → 재사용 가능한 로직
- utils/      → 순수 함수, 헬퍼
```

---

## `.ai/memory/context.md`
```
## 프로젝트 개요
쇼핑몰 플랫폼. 판매자가 직접 상품을 등록하고 관리하는 구조.

## 현재 단계
MVP 개발 중. 상품 등록 / 주문 / 정산 기능 우선.

## 기술 스택
React, TypeScript, Zustand, React Query, Tailwind

## 현재 진행 작업
tasks/current.md 참고
```

---

## `.ai/memory/personal.example.md`
```
## 코딩 스타일
- 주석 최소화 (코드가 설명되어야 함)
- 컴포넌트 200줄 넘으면 분리
- any 타입 절대 금지

## 선호
- 함수형 컴포넌트만 사용
- early return 선호
- 네이밍은 길어도 명확하게
```

> 이 파일은 템플릿이다. 실제 개인 설정은 `.ai/memory/personal.md`로 복사해 사용한다.

---

## `.ai/memory/patterns.md`
```
## 자주 쓰는 패턴

### API 호출
React Query useQuery 훅으로 통일.
직접 fetch/axios 호출 금지 → services/ 레이어 경유.

### 상태관리
전역: Zustand / 서버: React Query / 로컬: useState

## 안티패턴 (하면 안 되는 것)
- useEffect 안에서 setState 연쇄 호출 금지
- props drilling 3단계 이상 금지 → Context 또는 Zustand로
```

---

## `.ai/rules.md`
```
## 네이밍 규칙
- 컴포넌트: PascalCase (ProductCard)
- 훅: use 접두사 (useProductList)
- 유틸 함수: camelCase (formatPrice)
- 상수: UPPER_SNAKE_CASE (MAX_UPLOAD_SIZE)

## 구조 규칙
- 컴포넌트 파일 1개 = 1개 책임
- 200줄 초과 시 분리 필수
- index.ts 배럴 파일로 외부 노출 관리

## 금지사항
- any 타입 사용 금지
- console.log 커밋 금지
- 비즈니스 로직을 컴포넌트 내부에 직접 작성 금지
```

---

## `.ai/prompts/feature.md`
```
## 기능 개발 요청 템플릿

tasks/current.md 기준으로 기능 구현해줘.

> config.md에 작업 기준 파일이 설정되어 있으면 위 한 줄로 충분하다.
> 추가 맥락이 필요할 때만 아래 항목을 보완한다.

---

기능명: [기능 이름]

추가 요구사항:
- [current.md에 없는 추가 사항]

예외 케이스:
- [실패 시 처리]
- [엣지 케이스]

참고 파일:
- [관련 컴포넌트 또는 서비스 경로]
```

---

## `.ai/prompts/bugfix.md`
```
## 버그 수정 요청 템플릿

tasks/current.md에 버그 내용을 작성 후 아래 형식으로 요청한다.

---

버그 설명: [무엇이 잘못됨]

재현 조건:
1. [순서 1]
2. [순서 2]

기대 동작: [어떻게 되어야 하는가]
실제 동작: [지금 어떻게 되는가]

관련 파일:
- [파일 경로]
```

---

## `.ai/prompts/refactor.md`
```
## 리팩토링 요청 템플릿

tasks/current.md 기준으로 리팩토링 진행해줘.

---

대상 파일: [경로]
목적: [왜 리팩토링하는가]

유지해야 할 것:
- [인터페이스 / 동작]

변경 범위:
- [변경할 것]

금지사항:
- [건드리면 안 되는 것]
```

---

## `.ai/prompts/review.md`
```
## 코드 리뷰 요청 템플릿

tasks/current.md에서 완료된 작업 기준으로 코드 리뷰해줘.

---

대상 파일: [경로]

검토 기준:
- 가독성
- 성능 문제
- rules.md 위반 여부
- 엣지 케이스 누락

우선순위: 높음 / 중간 / 낮음으로 분류해서 출력
```

---

## `.airules`
```
# AI 자동 실행 규칙 (이 파일은 AI 개발 도구가 자동으로 읽는다)

## 세션 시작 시 반드시 읽을 것
1. .ai/config.md
2. .ai/memory/context.md
3. .ai/memory/personal.md
4. .ai/memory/patterns.md

## 코딩 규칙 요약 (rules.md 기반)
- any 타입 사용 금지
- console.log 커밋 금지
- 컴포넌트 200줄 초과 금지
- API 직접 호출 금지 → services/ 경유
- useEffect 내 setState 연쇄 호출 금지
- props drilling 3단계 이상 금지
```

---

## `docs/architecture.md`
```
## 시스템 구조

[클라이언트] → [API Gateway] → [서비스 서버] → [DB]

## 주요 서비스 연동
- 결제: 토스페이먼츠 API
- 이미지: AWS S3
- 인증: JWT (Access + Refresh 토큰)

## 데이터 흐름
1. 사용자 요청 → pages/
2. API 호출 → services/
3. 전역 상태 → stores/
4. UI 반영 → components/
```

---

## `docs/plan.md`
```
## 2024 로드맵

### Q2 (현재)
- MVP 출시: 상품 등록 / 주문 / 정산

### Q3
- 판매자 대시보드
- 정산 자동화

### Q4
- 모바일 앱 대응
- 성능 최적화
```

---

## `docs/research.md`
```
## 상태관리 라이브러리 비교 (2024-05-15)

| 항목 | Zustand | Redux Toolkit | Recoil |
|---|---|---|---|
| 학습 비용 | 낮음 | 높음 | 중간 |
| 보일러플레이트 | 적음 | 많음 | 중간 |
| 유지보수 | 활발 | 활발 | 불확실 |

→ 결론: docs/decisions.md 참고
```

---

## `docs/decisions.md`
```
# Zustand 선택 (2024-05-20)

## 배경
장바구니 / 유저 상태 전역 관리 필요

## 선택지
Redux Toolkit / Recoil / Zustand

## 결정
Zustand

## 이유
Redux 대비 보일러플레이트 적음, 러닝커브 낮음

## 트레이드오프
대규모 앱에서는 확장성 제한될 수 있음

## 영향 범위
stores/ 전체, 장바구니 / 유저 상태 관련 컴포넌트

## 관련 작업
tasks/sprint-01.md
```

---

## `docs/gitrules.md`
```
## 브랜치 전략
- main: 배포 브랜치
- develop: 통합 브랜치
- feature/[기능명]: 기능 개발
- fix/[버그명]: 버그 수정

## 커밋 규칙
feat: 새 기능
fix: 버그 수정
refactor: 리팩토링
docs: 문서 수정

## PR 규칙
- 최소 1명 리뷰 승인 후 머지
- PR 설명에 prompts/review.md 체크리스트 포함
```

---

## `tasks/current.example.md`
```
# 현재 작업 (2024-06-01)

## 활성 스킬
- .ai/skills/ecommerce/SKILL.md

## 목표
상품 등록 폼 유효성 검사 구현

## 요구사항
- 필수 필드 (상품명, 가격, 카테고리) 빈값 체크
- 가격은 숫자만 허용
- 이미지 미첨부 시 경고 표시

## 완료 기준
- [ ] 필수 필드 누락 시 에러 메시지 노출
- [ ] 가격 비숫자 입력 시 차단
- [ ] 정상 입력 시 다음 단계 진행 가능

## 진행 상태
- [x] 상품 목록 페이지 React Query 연동 (완료)
- [ ] 상품 등록 폼 유효성 검사 (진행 중)
- [ ] 이미지 업로드 컴포넌트 (다음)
```

> 이 파일은 템플릿이다. 실제 작업은 `tasks/current.md`로 복사해 작성한다.

---

## `tasks/backlog.example.md`
```
## 대기 작업

### 기능
- [ ] 판매자 통계 대시보드
- [ ] 상품 일괄 등록 (CSV)

### 개선
- [ ] 이미지 최적화 (WebP 변환)
- [ ] 검색 성능 개선

### 기술 부채
- [ ] any 타입 전체 제거
- [ ] 테스트 커버리지 확보
```

> 이 파일은 템플릿이다. 실제 개인 백로그는 `tasks/backlog.md`로 복사해 사용한다.

---

## `tasks/sprint/sprint-01.md`
```
## Sprint 01 (2024-06-01 ~ 2024-06-14)

### 목표
MVP 상품 등록 / 주문 플로우 완성

### 작업 목록
| 작업 | 담당 | 상태 |
|---|---|---|
| 상품 등록 폼 | - | 진행 중 |
| 주문 API 연동 | - | 대기 |

### 완료 기준 (DoD)
- [ ] 기능 동작 확인
- [ ] rules.md 위반 없음
- [ ] PR 리뷰 완료
```

---

## `README.md`
```
# 프로젝트명

한 줄 설명.

## 실행 방법
npm install
npm run dev

## 환경변수
.env.example 참고

## 문서
- 구조 이해 / 세팅: docs/onboarding.md
- 작업 방식: docs/workflow.md
- 파일 예시: docs/reference.md
- 기술 결정: docs/decisions.md
```
