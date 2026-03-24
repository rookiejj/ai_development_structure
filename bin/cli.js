#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const readline = require('readline');

const base = process.cwd();
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

function createFile(filePath, content = '') {
    const fullPath = path.join(base, filePath);
    const dir = path.dirname(fullPath);

    fs.mkdirSync(dir, { recursive: true });
    if (!fs.existsSync(fullPath)) {
        fs.writeFileSync(fullPath, content.trim());
        console.log(`[생성] ${filePath}`);
    } else {
        console.log(`[스킵] ${filePath} (이미 존재함)`);
    }
}

function createSymlink(target, linkPath) {
    const fullLinkPath = path.join(base, linkPath);
    const targetRelativePath = target; // .airules

    try {
        if (fs.existsSync(fullLinkPath)) {
            console.log(`[스킵] ${linkPath} (이미 존재함)`);
            return;
        }
        // relative symlink
        fs.symlinkSync(targetRelativePath, fullLinkPath);
        console.log(`[연결] ${linkPath} -> ${target}`);
    } catch (error) {
        console.error(`[오류] 심볼릭 링크 생성 실패 (${linkPath}):`, error.message);
    }
}

async function run() {
    console.log('\n🚀 AI Development Structure 스캐폴딩 스크립트\n');

    const answer = await question('디렉토리 구조와 필수 파일을 생성하시겠습니까? (Y/n): ');
    if (answer.toLowerCase() === 'n') {
        console.log('초기화를 취소합니다.');
        rl.close();
        return;
    }

    const ideAnswer = await question('\n어떤 AI 도구를 가장 많이 사용하십니까?\n1. Cursor\n2. Windsurf\n3. Claude Code (CLI)\n4. Claude.ai (웹)\n5. ChatGPT (웹)\n6. Gemini (웹)\n7. 기타\n선택 (1~7): ');

    console.log('\n--- 파일 생성 시작 ---\n');

    // .ai 폴더
    createFile('.ai/config.md', '# AI 작업 기준\n\n> AI가 참고할 프로젝트 기준과 역할을 명시합니다.');
    createFile('.ai/map.md', '# 구조 요약\n\n> src/ 폴더의 구조와 각 모듈의 역할을 요약합니다.');
    createFile('.ai/memory/context.md', '# 프로젝트 개요\n\n> 핵심 비즈니스 로직과 맥락을 한 페이지로 정리합니다.');
    createFile('.ai/memory/patterns.md', '# 개발 패턴\n\n> 팀이 합의한 아키텍처 및 코딩 패턴을 기록합니다.');
    createFile('.ai/memory/personal.example.md', '# 개인 스타일\n\n> 개인 코딩 취향 템플릿입니다.');
    createFile('.ai/rules.md', '# 규칙 요약\n\n> 코드 작성 시 절대적인 원칙들을 기록합니다.');
    createFile('.ai/prompts/feature.md', '# 기능 개발 프롬프트');
    createFile('.ai/prompts/bugfix.md', '# 버그 수정 프롬프트');
    createFile('.ai/prompts/refactor.md', '# 리팩토링 프롬프트');
    createFile('.ai/prompts/review.md', '# 코드 리뷰 프롬프트');

    // docs 폴더
    createFile('docs/architecture.md', '# 시스템 구조\n\n> 주요 아키텍처와 컴포넌트 상호작용을 기록합니다.');
    createFile('docs/plan.md', '# 로드맵\n\n> 마일스톤과 큰 범위의 목표를 정리합니다.');
    createFile('docs/research.md', '# 리서치 기록\n\n> 기술 벤치마크 및 리서치 결과를 저장합니다.');
    createFile('docs/decisions.md', '# 의사결정 기록 (ADR)\n\n> 기술적 의사결정의 이유를 기록합니다.');

    // tasks 폴더
    createFile('tasks/current.example.md', '# 현재 작업 템플릿');
    createFile('tasks/backlog.example.md', '# 백로그 템플릿');
    createFile('tasks/sprint/sprint-01.md', '# 첫 번째 스프린트');

    // 루트 레벨 파일
    createFile('.airules', '# AI 글로벌 규칙\n\n> .ai/config.md 및 주요 문서들을 어떻게 읽을지 명시하는 최상위 규칙입니다.');

    if (!fs.existsSync(path.join(base, '.gitignore'))) {
        createFile('.gitignore', `tasks/current.md\ntasks/backlog.md\n.ai/memory/personal.md\nnode_modules\n.env\n`);
    }

    console.log('\n--- AI 환경별 파일 연동 안내 ---\n');

    if (ideAnswer === '1') {
        createSymlink('.airules', '.cursorrules');
    } else if (ideAnswer === '2') {
        createSymlink('.airules', '.windsurfrules');
    } else if (ideAnswer === '3') {
        createFile('CLAUDE.md', '이 프로젝트는 .airules의 규약을 따릅니다.\n작업 시작 전에 항상 .airules를 참조해 주세요.');
    } else if (ideAnswer === '4') {
        console.log('📘 Claude.ai (웹) 사용 안내:');
        console.log('   => [프로젝트 지식(Project Knowledge)] 설정에 들어가서 .ai 폴더 내부의 파일 내용들을 복사해서 등록해 주세요.');
    } else if (ideAnswer === '5') {
        console.log('🟩 ChatGPT (웹) 사용 안내:');
        console.log('   => [Custom Instructions] 혹은 새로운 [맞춤 설정 GPT]를 생성하여 .airules 내용과 .ai/config.md를 등록해 주세요.');
    } else if (ideAnswer === '6') {
        console.log('🌌 Gemini (웹) 사용 안내:');
        console.log('   => 시스템 지시문(System Instructions) 옵션이나 첫 프롬프트 시작 시 .airules의 내용을 붙여넣어 컨텍스트를 고정해 주세요.');
    } else {
        console.log('필요시 수동으로 .airules와 .ai 설정 파일 내용들을 복사하여 사용하시는 AI 도구에 연동해 주세요.');
    }

    console.log('\n✅ AI 템플릿 초기화가 완료되었습니다!');
    console.log('👉 다음 작업: tasks/current.example.md 파일을 tasks/current.md 로 복사하고 작업을 시작해 보세요.\n');

    rl.close();
}

run();
