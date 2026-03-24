# project-docs

## 목적
- 이 스킬은 문서 구조가 있는 프로젝트에서 작업을 시작하거나 정리할 때 사용한다.
- `docs/`, `.ai/`, `tasks/`의 역할이 섞이지 않도록 돕는다.
- AI가 현재 작업을 문서 기준으로 해석하고 필요한 파일만 참조하도록 유도한다.

## 언제 사용하나
- 새 작업을 시작하는데 어떤 문서를 먼저 봐야 할지 헷갈릴 때
- 문서 수정, 구조 정리, 온보딩 문서 보강 같은 작업을 할 때
- AI가 `docs`와 `.ai/memory`의 역할을 혼동하는 일이 반복될 때

## 작업 원칙
- 현재 작업의 기준은 항상 `tasks/current.md`를 우선한다.
- 팀 공유 자산은 `docs/`에 둔다.
- 개인 취향이나 개인 메모는 `.ai/memory/`에 둔다.
- 프로젝트 전체에 적용되는 규칙은 `.airules`, `.ai/rules.md`를 따른다.
- 구조 변경이 생기면 `.ai/map.md`와 관련 문서를 함께 점검한다.

## 참조 순서
1. `.ai/config.md`
2. `.ai/memory/context.md`
3. `tasks/current.md`
4. 관련 `docs/*.md`

## 하지 말 것
- `tasks/current.md`에 들어갈 진행 상태를 `docs/`에 기록하지 않는다.
- 팀 규칙을 개인 파일인 `.ai/memory/personal.md`에 넣지 않는다.
- 개인 취향을 공통 규칙처럼 `docs/`나 `.airules`에 반영하지 않는다.

## 요청 예시
```text
tasks/current.md와 docs 문서를 기준으로 구조 설명을 정리해줘.
```

```text
이 작업에서 docs와 memory 중 어디를 수정해야 하는지 먼저 판단해서 진행해줘.
```
