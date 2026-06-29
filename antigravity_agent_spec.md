# Antigravity Agent Spec & Implementation Plan

## 1. Project Overview (프로젝트 개요)
- **Project Name:** 로컬 AI 도슨트 (DocentAI)
- **Objective:** 현장에서만 경험할 수 있는 지역(영등포 등)의 숨은 이야기를 GPS 위치 기반으로 해금하고, 생각을 자극하는 미션과 질문을 통해 나만의 여행 노트를 완성하는 현장형 로컬 스토리 투어 서비스
- **Target Audience:** 2030 세대, 혼행족, 로컬 여행자, 역사·문화에 관심 있는 도시인

## 2. Tech Stack & Architecture (기술 스택 및 아키텍처)
- **Frontend:** React Native (Expo SDK 56), TypeScript, Zustand
- **Backend:** Supabase (서버리스 - Auth, Database, Storage)
- **Database:** Supabase Database (PostgreSQL)
- **Infrastructure:** Supabase Cloud, EAS (Expo Application Services)
- **Architecture Notes:** GPS Geofencing (50m 반경 진입 감지) 및 AsyncStorage 기반 로컬 캐싱을 결합한 클라이언트 중심 모바일 하이브리드 앱 구조

## 3. Antigravity Agent Directives (에이전트 행동 지침)
> **[중요]** Antigravity 에이전트는 코드를 작성하고 수정할 때 다음 원칙을 반드시 준수해야 합니다.

1. **Step-by-Step Execution (단계적 실행):** 아래 명시된 'Implementation Phases'를 순서대로 진행하며, 한 단계가 완전히 검증된 후 다음 단계로 넘어갑니다.
2. **Artifact Generation (산출물 생성):** 각 단계 완료 시, 변경 사항을 요약한 산출물(Artifact)을 명시적으로 기록합니다.
3. **No Hallucination (환각 방지):** 존재하지 않는 라이브러리나 API를 임의로 사용하지 않습니다. 확신이 없는 경우 터미널 명령어를 통해(예: `npm search`, `pip search`) 사전에 확인합니다.
4. **Error Handling (오류 처리):** 에러 발생 시 로그를 분석하고 근본 원인을 파악한 후 수정합니다. 임시방편적인 코드 패치는 허용하지 않습니다.
5. **Security First (보안 우선):** API 키나 민감한 정보는 절대로 하드코딩하지 않으며 환경 변수(`.env`)를 사용합니다.

## 4. Implementation Phases (구현 단계별 작업 목록)
에이전트는 작업이 완료될 때마다 아래 체크박스를 `[x]`로 변경하여 진행 상태를 업데이트해야 합니다.

### Phase 1: Project Setup (프로젝트 초기 설정)
- [x] 패키지 매니저를 통한 기본 프로젝트 스캐폴딩 생성
- [x] 필요 라이브러리 및 의존성 설치
- [ ] 환경 변수 템플릿(`.env.example`) 구성
- [ ] 린터(Linter) 및 포매터(Formatter) 설정 (예: ESLint, Prettier, Ruff)

### Phase 2: Core Infrastructure (핵심 인프라 및 DB)
- [ ] 데이터베이스 스키마 설계 및 마이그레이션 스크립트 작성
- [ ] ORM 또는 데이터베이스 연결 모듈 구현
- [ ] 헬스 체크(Health Check) API 엔드포인트 작성 및 테스트

### Phase 3: Backend API & Logic (백엔드 API 및 비즈니스 로직)
- [ ] 인증/인가(Authentication/Authorization) 로직 구현
- [ ] 주요 비즈니스 로직에 대응하는 REST API 또는 GraphQL 리졸버 구현
- [ ] API 요청/응답에 대한 데이터 검증(Validation) 로직 추가

### Phase 4: Frontend Development (프론트엔드 개발)
- [ ] 공통 UI 컴포넌트(버튼, 입력 폼, 모달 등) 작성
- [ ] 상태 관리(State Management) 설정 (예: Zustand, Redux)
- [ ] 백엔드 API 연동 및 데이터 패칭 구현
- [ ] 반응형(Responsive) 레이아웃 적용

### Phase 5: Integration & Polish (통합 및 마무리)
- [ ] 프론트엔드와 백엔드 간의 통합 테스트 진행
- [ ] 성능 최적화 (불필요한 렌더링 방지, 쿼리 최적화 등)
- [ ] 버그 수정 및 예외 처리 고도화

## 5. Quality Assurance & Testing (품질 보증 및 테스트)
- [ ] 핵심 비즈니스 로직에 대한 단위 테스트(Unit Test) 작성
- [ ] API 통합 테스트(Integration Test) 작성
- [ ] 테스트 커버리지 최소 [XX]% 달성 확인
- [ ] 정적 코드 분석 도구 실행 및 경고 해결

## 6. Deployment (배포)
- [ ] Dockerfile 및 docker-compose.yml 작성
- [ ] CI/CD 파이프라인 구성 스크립트(예: GitHub Actions) 작성
- [ ] 프로덕션 환경용 빌드 및 환경 변수 점검

---
**Agent Ack:** Antigravity 에이전트님, 이 계획서를 읽고 이해했다면 "Plan Acknowledged"라고 응답하고 Phase 1의 첫 번째 태스크부터 실행을 시작해 주십시오.
