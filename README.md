# AI Dev Template

AI 협업 개발을 위한 프로젝트 템플릿입니다.
코드, AI 컨텍스트, 팀 문서, 작업 상태를 분리해서 관리할 수 있도록 구성되어 있습니다.

## 목적

- AI가 매번 처음 프로젝트를 읽지 않도록 기준과 기억을 구조화합니다.
- 사람과 AI가 같은 작업 맥락을 공유할 수 있게 합니다.
- 새 프로젝트를 시작할 때 반복되는 문서 구성을 템플릿으로 제공합니다.

## 구조

```text
.ai/   AI 작업 기준, 기억, 프롬프트 템플릿
docs/  팀이 공유하는 공식 문서
tasks/ 현재 작업 상태와 백로그
src/   실제 애플리케이션 코드
```

자세한 구조 설명은 [docs/structure.md](/f:/sourcecode/superhuman-light/doc/ai_dev/docs/structure.md)에서 확인할 수 있습니다.

## 시작 방법

1. 이 저장소를 새 프로젝트의 시작점으로 복제합니다.
2. 프로젝트에 맞게 `.ai/config.md`, `.ai/map.md`, `.ai/memory/context.md`를 채웁니다.
3. `tasks/current.example.md`를 `tasks/current.md`로 복사해 현재 작업을 작성합니다.
4. `.ai/memory/personal.example.md`를 `.ai/memory/personal.md`로 복사해 개인 스타일을 작성합니다.
5. 사용하는 AI 도구에 맞게 규칙 파일 연결을 설정합니다.

PowerShell 예시:

```powershell
Copy-Item tasks/current.example.md tasks/current.md
Copy-Item .ai/memory/personal.example.md .ai/memory/personal.md
```

또는 한 번에 실행:

```powershell
.\init-local.ps1
```

초기 세팅 가이드는 [docs/onboarding.md](/f:/sourcecode/superhuman-light/doc/ai_dev/docs/onboarding.md)를 참고하세요.

## 문서 안내

- 구조와 도입 가이드: [docs/onboarding.md](/f:/sourcecode/superhuman-light/doc/ai_dev/docs/onboarding.md)
- 일상 작업 흐름: [docs/workflow.md](/f:/sourcecode/superhuman-light/doc/ai_dev/docs/workflow.md)
- 파일별 작성 예시: [docs/reference.md](/f:/sourcecode/superhuman-light/doc/ai_dev/docs/reference.md)
- 설계와 기록: [docs/architecture.md](/f:/sourcecode/superhuman-light/doc/ai_dev/docs/architecture.md), [docs/decisions.md](/f:/sourcecode/superhuman-light/doc/ai_dev/docs/decisions.md)

## Git 관리

이 폴더를 독립 저장소로 운영할 수 있도록 [`.gitignore`](/f:/sourcecode/superhuman-light/doc/ai_dev/.gitignore)를 포함했습니다.
환경 파일, 로그, 빌드 산출물, 에디터 로컬 설정은 기본적으로 제외됩니다.
