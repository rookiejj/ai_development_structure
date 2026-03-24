# onboarding.md
> 위치: `docs/onboarding.md`
> 이 문서는 팀 공통 자산이다. 새 프로젝트마다 새로 만들지 않고 팀 템플릿 repo에서 가져온다.

이 시스템을 처음 접하는 개발자를 위한 문서다.
세팅 방법, 구조 이해, 도구 연결까지 한 번만 읽으면 된다.

---

## 1. 이 시스템의 구조

프로젝트는 4개 영역으로 구성된다.

```
src/        → 실제 애플리케이션 코드 (작업의 최종 목적지)
.ai/        → AI가 참고하는 기준과 기억 (AI 전용)
docs/       → 사람과 팀이 공유하는 공식 문서 (팀 자산)
tasks/      → 현재 실행 중인 작업 상태 (개인 운영)
```

**각 영역의 역할:**

| 영역 | 성격 | 담는 것 |
|---|---|---|
| `src/` | 실제 코드 | 기능, UI, API, 비즈니스 로직 |
| `.ai/memory/` | AI 참고용 | 프로젝트 맥락, 개인 스타일, 패턴 |
| `docs/` | 팀 자산 | 의사결정, 설계, 협업 규칙 |
| `tasks/` | 개인 운영 | 현재 작업, 백로그 |

> `.ai/memory/`와 `docs/`는 절대 혼합하지 않는다.
> AI memory에 팀 공식 문서를 넣거나, docs에 개인 작업 상태를 넣으면 구조가 무너진다.
>
> `src/` 구조가 바뀌면 반드시 `.ai/map.md`도 함께 업데이트한다.
> AI는 map.md를 보고 src/를 이해하기 때문에 두 파일이 다르면 엉뚱한 코드를 생성한다.

---

## 2. 프로젝트 처음 시작할 때 (최초 1회)

1. **팀 템플릿 repo를 클론한다**
   - `docs/onboarding.md`, `docs/workflow.md`, `docs/reference.md`는 팀 공통 자산
   - 새 프로젝트마다 새로 만드는 것이 아니라 팀 repo에서 가져온다
   ```bash
   git clone [팀 템플릿 repo URL] my-project
   ```

2. **4번 초기화 스크립트로 로컬 작업 파일만 준비한다**
   - 전제: 프로젝트 repo와 팀 공통 문서는 이미 clone 되어 있다
   - 이 스크립트는 repo를 다시 구성하지 않고, 개인이 바로 작업할 수 있게 로컬 파일만 준비한다
   - `docs/onboarding.md`, `docs/workflow.md`, `docs/reference.md` 같은 팀 자산은 생성하지 않는다

3. **아래 파일부터 채운다 (나머지는 비워둬도 됨)**

   - `.ai/config.md` → AI한테 "넌 이렇게 일해" 정의
   - `.ai/map.md` → src/ 폴더 구조 요약 작성
   - `.ai/memory/context.md` → 이 프로젝트가 뭔지 한 페이지로 정리
   - `.ai/memory/personal.example.md` → `personal.md` 작성 예시 템플릿
   - `.ai/memory/patterns.md` → 일단 비워도 됨, 쓰면서 채움
   - `tasks/current.example.md` → `current.md` 작성 예시 템플릿
   - `tasks/backlog.example.md` → `backlog.md` 작성 예시 템플릿
   - `docs/decisions.md` → 기술 스택 선택 이유 첫 항목 작성

   실제 개인 작업 파일은 아래처럼 복사해서 만든다.
   - `.ai/memory/personal.example.md` → `.ai/memory/personal.md`
   - `tasks/current.example.md` → `tasks/current.md`
   - `tasks/backlog.example.md` → `tasks/backlog.md` (필요할 때만)

   PowerShell 예시:
   ```powershell
   Copy-Item .ai/memory/personal.example.md .ai/memory/personal.md
   Copy-Item tasks/current.example.md tasks/current.md
   Copy-Item tasks/backlog.example.md tasks/backlog.md
   ```

   한 번에 준비하려면:
   ```powershell
   .\init-local.ps1
   ```

4. **3번 AI 개발 도구 연결 진행 (필수)**

파일 예시는 `docs/reference.md` 참고.

---

## 3. AI 개발 도구 연결 (필수)

`.airules`는 이 프로젝트의 규칙 원본이지만,
각 도구는 자신이 정해둔 파일 이름만 자동으로 읽는다.

> 이 연결이 안 되어 있으면 AI가 프로젝트 규칙을 전혀 모르는 상태로 동작한다.

### 규칙 파일 연결

| 도구 | 자동으로 읽는 파일 | 처리 방법 |
|---|---|---|
| Cursor | `.cursorrules` | `ln -s .airules .cursorrules` |
| Windsurf | `.windsurfrules` | `ln -s .airules .windsurfrules` |
| GitHub Copilot | `.github/copilot-instructions.md` | `.airules` 내용 복사 |
| Claude Code | `CLAUDE.md` | `.airules` 내용 복사 |
| Claude.ai (웹) | 자동 로드 없음 | 아래 별도 안내 참고 |

**심링크 사용 시 (권장):**
```bash
# Cursor 사용 시
ln -s .airules .cursorrules

# Windsurf 사용 시
ln -s .airules .windsurfrules
```
심링크를 걸면 `.airules`만 수정해도 도구 파일에 자동 반영된다.

> `.airules`를 수정하면 사용하는 도구의 파일도 반드시 동기화한다.
> 두 파일이 달라지면 AI가 다르게 동작한다.

---

### 컨텍스트 파일 로드 방식

| 도구 | 로드 방법 |
|---|---|
| Cursor / Windsurf | 규칙 파일에 "세션 시작 시 config.md 읽어라" 명시 → 자동 로드 |
| Claude Code | `CLAUDE.md`에 명시 → 자동 로드 |
| Claude.ai (웹) | 프로젝트 지식에 파일 내용 직접 등록 → 자동 로드 |

---

### 파일 참조 방식

| 도구 | 파일 참조 방법 |
|---|---|
| Cursor | `@tasks/current.md` 입력하면 파일 자동 첨부 |
| Windsurf | `@tasks/current.md` 입력하면 파일 자동 첨부 |
| Claude Code | 파일 경로를 텍스트로 언급하면 자동으로 읽음 |
| Claude.ai (웹) | 파일 내용을 직접 복사해서 붙여넣기 |

---

### Claude.ai (웹) 사용 시

Claude.ai는 파일 시스템에 직접 접근하지 않는다.

**최초 1회 설정:**
1. Claude.ai에서 프로젝트 생성
2. 프로젝트 설정 → "프로젝트 지식"에 아래 파일 내용을 각각 등록
   - `.ai/config.md`
   - `.ai/memory/context.md`
   - `.ai/memory/personal.md` 또는 팀 공용 기본값으로는 `.ai/memory/personal.example.md`
   - `.ai/memory/patterns.md`

**등록 후:**
- 매 세션마다 자동으로 참조됨
- 파일 내용이 바뀌면 프로젝트 지식도 수동으로 업데이트해야 함

**작업 요청 시:**
- `tasks/current.md` 내용을 직접 붙여넣거나 파일을 업로드해서 첨부
- 프롬프트 템플릿도 동일하게 내용 복사 후 붙여넣기

---

### 요약

```
IDE 기반 (Cursor, Windsurf, Claude Code)
→ 규칙 파일 이름만 맞추면 대부분 자동

Claude.ai (웹)
→ 프로젝트 지식에 파일 내용 등록
→ current.md는 매번 직접 첨부
```

---

## 4. 프로젝트 초기화 스크립트

여기서 말하는 초기화는 **repo 생성**이 아니라 **clone 받은 repo를 작업 가능한 상태로 준비**하는 것이다.

- 이미 repo에는 공통 구조와 템플릿 파일이 들어있다고 가정한다
- 초기화 스크립트는 `*.example.md`를 개인 작업용 파일로 복사하는 정도만 담당한다
- `README.md`, `docs/*.md`, `.airules`, `.ai/prompts/*` 같은 공통 파일은 새로 만들지 않는다

> 즉, 레포가 이미 있다면 "대부분의 파일을 생성"하는 방식보다 "이미 있는 템플릿을 복사/보완"하는 방식이 맞다.

### 4.1 PowerShell 사용 시 (권장)

이 repo에는 이미 [`init-local.ps1`](/f:/sourcecode/ai_development_structure/init-local.ps1)가 들어 있다.
이 스크립트는 아래 로컬 파일만 준비한다.

- `tasks/current.example.md` → `tasks/current.md`
- `tasks/backlog.example.md` → `tasks/backlog.md`
- `.ai/memory/personal.example.md` → `.ai/memory/personal.md`

실행:

```powershell
.\init-local.ps1
```

이미 파일이 있으면 덮어쓰지 않고 건너뛴다.

### 4.2 직접 복사할 때

스크립트를 쓰지 않아도 아래처럼 직접 복사하면 된다.

```powershell
Copy-Item tasks/current.example.md tasks/current.md
Copy-Item tasks/backlog.example.md tasks/backlog.md
Copy-Item .ai/memory/personal.example.md .ai/memory/personal.md
```

필요한 경우에만 `backlog.md`를 만든다.

### 4.3 새 템플릿 repo를 만드는 경우만 예외

Node.js나 Bash로 여러 파일을 한꺼번에 생성하는 스크립트는
**이 저장소 자체를 템플릿으로 처음 만드는 사람**에게는 유용할 수 있다.
하지만 일반 사용자는 그런 스크립트를 만들 필요가 없다.
일반 사용자의 시작점은 "팀 템플릿 repo clone 완료 상태"다.

---

### 4.4 언제 사용하나

* 새 프로젝트 시작 시
* 기존 프로젝트에 구조 도입 시

---

### 4.5 원칙

* 구조는 수동 생성 금지
* 반드시 스크립트 사용
* 모든 프로젝트 동일 구조 유지

---

## 5. Git 관리 기준

### 푸시하면 안 되는 파일 (개인 영역)

`.gitignore`에 추가:

```
# 개인 작업 영역 - 푸시 금지
tasks/current.md
tasks/backlog.md
.ai/memory/personal.md
```

**이유:**
- `current.md` — 나만의 진행 상황. 협업자와 공유할 내용 아님
- `backlog.md` — 개인 아이디어 메모 성격
- `personal.md` — 개인 코딩 스타일. 협업자에게 강요하면 안 됨

> 이 파일들이 커밋되면 팀원 간 충돌이 발생하거나 개인 작업 상태가 노출될 수 있다. .gitignore 설정은 반드시 유지한다.
> 대신 같은 위치의 `.example.md` 파일은 팀 공용 템플릿으로 커밋해 둔다.

### 반드시 푸시해야 하는 파일 (팀 공유 자산)

| 파일 | 이유 |
|---|---|
| `.ai/config.md` | 팀 전체 AI 동작 기준 |
| `.ai/map.md` | 코드 구조 공통 이해 |
| `.ai/memory/context.md` | 프로젝트 맥락 공유 |
| `.ai/memory/patterns.md` | 팀 코드 스타일 통일 |
| `.ai/memory/personal.example.md` | personal.md 작성 예시 공유 |
| `.ai/rules.md` | 코딩 규칙 원본 |
| `.ai/prompts/` | 요청 템플릿 공유 |
| `.airules` | AI 실행 규칙 |
| `docs/` | 팀 공식 문서 전체 |
| `tasks/current.example.md` | current.md 작성 예시 공유 |
| `tasks/backlog.example.md` | backlog.md 작성 예시 공유 |
| `tasks/sprint/` | 팀 작업 추적 |

---

## 6. 협업자가 생길 때

순서대로 활성화:

1. `docs/gitrules.md` 작성 (브랜치/커밋/PR 규칙)
2. `docs/onboarding.md` 업데이트 (지금 이 파일)
3. 작업 규모 커지면 `tasks/sprint/` 활성화
