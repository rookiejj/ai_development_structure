# AI Dev Template

AI 협업 개발을 위한 프로젝트 템플릿입니다.
팀 공통 문서와 프로젝트 구조를 repo로 공유하고, 개인 작업 파일은 로컬에서 따로 준비할 수 있도록 구성되어 있습니다.

## 목적

- AI가 매번 처음 프로젝트를 읽지 않도록 기준과 기억을 구조화합니다.
- 사람과 AI가 같은 작업 맥락을 공유할 수 있게 합니다.
- 새 프로젝트를 시작할 때 반복되는 문서 구성을 repo 템플릿으로 제공합니다.

## 구조

```text
.ai/   AI 작업 기준, 기억, 프롬프트 템플릿
docs/  팀이 공유하는 공식 문서
tasks/ 현재 작업 상태와 백로그
src/   실제 애플리케이션 코드
```

자세한 구조 설명은 [docs/structure.md](docs/structure.md)에서 확인할 수 있습니다.

## 시작 방법

1. 이 저장소를 프로젝트 시작점으로 clone 합니다.
2. `.\init-local.ps1`를 실행해 개인 작업용 로컬 파일을 준비합니다.
3. 프로젝트에 맞게 `.ai/config.md`, `.ai/map.md`, `.ai/memory/context.md`를 채웁니다.
4. 필요하면 `tasks/backlog.example.md`도 `tasks/backlog.md`로 복사합니다.
5. 사용하는 AI 도구에 맞게 규칙 파일 연결을 설정합니다.

PowerShell 예시:

```powershell
Copy-Item tasks/current.example.md tasks/current.md
Copy-Item tasks/backlog.example.md tasks/backlog.md
Copy-Item .ai/memory/personal.example.md .ai/memory/personal.md
```

또는 한 번에 실행:

```powershell
.\init-local.ps1
```

이 단계는 공통 문서를 새로 생성하는 과정이 아니라, clone 받은 repo에서 개인 작업 파일만 준비하는 과정입니다.

초기 세팅 가이드는 [docs/onboarding.md](docs/onboarding.md)를 참고하세요.

## 문서 안내

- 구조와 도입 가이드: [docs/onboarding.md](docs/onboarding.md)
- 일상 작업 흐름: [docs/workflow.md](docs/workflow.md)
- 파일별 작성 예시: [docs/reference.md](docs/reference.md)
- 설계와 기록: [docs/architecture.md](docs/architecture.md), [docs/decisions.md](docs/decisions.md)

## Git 관리

이 폴더를 독립 저장소로 운영할 수 있도록 [`.gitignore`](.gitignore)를 포함했습니다.
환경 파일, 로그, 빌드 산출물, 에디터 로컬 설정은 기본적으로 제외됩니다.
