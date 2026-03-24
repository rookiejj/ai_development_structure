const fs = require("fs");
const path = require("path");

const base = process.cwd();

function createFile(filePath, content = "") {
    const fullPath = path.join(base, filePath);
    const dir = path.dirname(fullPath);

    fs.mkdirSync(dir, { recursive: true });

    if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, content.trim());
        console.log("Created:", filePath);
    }
}

function run() {
    createFile(".ai/config.md", "# AI 작업 기준\n\n> AI가 참고할 프로젝트 기준과 역할을 명시합니다.");
    createFile(".ai/map.md", "# 구조 요약\n\n> src/ 폴더의 구조와 각 모듈의 역할을 요약합니다.");

    createFile(".ai/memory/context.md", "# 프로젝트 개요\n\n> 이 프로젝트의 핵심 비즈니스 로직과 맥락을 한 페이지로 정리합니다.");
    createFile(".ai/memory/patterns.md", "# 개발 패턴\n\n> 코드 스타일, 아키텍처 패턴 등 팀이 합의한 패턴을 기록합니다.");
    createFile(".ai/memory/personal.example.md", "# 개인 스타일\n\n> 개인적인 코딩 습관이나 취향을 기록하는 템플릿입니다.");

    createFile(".ai/rules.md", "# 규칙 요약\n\n> 코드 작성 시 지켜야 할 절대적인 원칙들을 기록합니다.");

    createFile(".ai/prompts/feature.md", "# 기능 개발 프롬프트");
    createFile(".ai/prompts/bugfix.md", "# 버그 수정 프롬프트");
    createFile(".ai/prompts/refactor.md", "# 리팩토링 프롬프트");
    createFile(".ai/prompts/review.md", "# 코드 리뷰 프롬프트");

    createFile("docs/architecture.md", "# 시스템 구조\n\n> 시스템 설계, 컴포넌트 간 관계, 주요 데이터 흐름을 기록합니다.");
    createFile("docs/plan.md", "# 로드맵\n\n> 앞으로의 개발 마일스톤과 목표를 정리합니다.");
    createFile("docs/research.md", "# 리서치 기록\n\n> 기술 리뷰, 스파이크 결과, 벤치마크 데이터를 기록합니다.");
    createFile("docs/decisions.md", "# 의사결정 기록 (ADR)\n\n> 주요 기술적 의사결정의 배경과 이유를 기록합니다.");

    createFile("tasks/current.example.md", "# 현재 작업\n\n> 개인이 현재 진행 중인 작업을 기록하는 템플릿입니다.");
    createFile("tasks/backlog.example.md", "# 백로그\n\n> 나중에 처리할 작업 목록 템플릿입니다.");
    createFile("tasks/sprint/sprint-01.md", "# 스프린트 01");

    createFile(".airules", "# AI 글로벌 규칙\n\n> IDE 및 AI 도구에 연동할 최상위 규칙 파일입니다.");
    createFile("README.md", "# 프로젝트 이름\n\n> 프로젝트 소개와 시작 방법을 안내합니다.");

    createFile(".gitignore", `
tasks/current.md
tasks/backlog.md
.ai/memory/personal.md
node_modules
.env
`);

    console.log("AI Development Structure 템플릿 초기화가 완료되었습니다.");
}

run();
