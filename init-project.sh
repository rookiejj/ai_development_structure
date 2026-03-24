#!/bin/bash

# 생성할 디렉토리 준비
mkdir -p .ai/memory
mkdir -p .ai/prompts
mkdir -p docs
mkdir -p tasks/sprint

# 파일 생성 기능을 함수로 분리
create_file() {
  local filepath="$1"
  local content="$2"
  if [ ! -f "$filepath" ]; then
    echo "$content" > "$filepath"
    echo "Created: $filepath"
  fi
}

create_file ".ai/config.md" "# AI 작업 기준"
create_file ".ai/map.md" "# 구조 요약"

create_file ".ai/memory/context.md" "# 프로젝트 개요"
create_file ".ai/memory/patterns.md" "# 개발 패턴"
create_file ".ai/memory/personal.example.md" "# 개인 스타일"

create_file ".ai/rules.md" "# 규칙 요약"

create_file ".ai/prompts/feature.md" "# 기능 개발 프롬프트"
create_file ".ai/prompts/bugfix.md" "# 버그 수정 프롬프트"
create_file ".ai/prompts/refactor.md" "# 리팩토링 프롬프트"
create_file ".ai/prompts/review.md" "# 코드 리뷰 프롬프트"

create_file "docs/architecture.md" "# 시스템 구조"
create_file "docs/plan.md" "# 로드맵"
create_file "docs/research.md" "# 리서치 기록"
create_file "docs/decisions.md" "# 의사결정 기록 (ADR)"

create_file "tasks/current.example.md" "# 현재 작업"
create_file "tasks/backlog.example.md" "# 백로그"
create_file "tasks/sprint/sprint-01.md" "# 스프린트 01"

create_file ".airules" "# AI 글로벌 규칙"
create_file "README.md" "# 프로젝트 소개"

if [ ! -f ".gitignore" ]; then
    echo "tasks/current.md
tasks/backlog.md
.ai/memory/personal.md
node_modules
.env" > .gitignore
    echo "Created: .gitignore"
fi

echo "AI Development Structure 템플릿 초기화가 완료되었습니다."
