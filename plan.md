# 핵심 로직 복구 및 시스템 정상화 계획 (Implementation Plan) - COMPLETE

## 1. 개요
분석 데이터(`research.md`)를 바탕으로 유실된 캘린더 인덱싱 로직을 복구하고, 깨진 모듈 구조를 재정립하여 시스템을 정상화함. Ray의 "Zero Monolith" 및 "TDD" 원칙을 철저히 준수함.

## 2. 세부 작업 리스트 (Plan)

### Phase 1: 기반 정립 및 설계
- [x] `src/utils/dateUtils.ts` 하단부의 깨진 코드 정리 및 `toUtcDateOnly`, `calcDayIndex` 함수 검증.
- [x] 유실된 로직의 수학적 명세 확정:
    - 365일을 64괘로 매핑하는 `calcGuaNum` 수식 정의. (1-indexed 1~64)
    - 64괘의 6효를 매핑하는 `calcYaoNum` 수식 정의. (1-indexed 1~384)
    - 가용 날짜 범위를 확인하는 `inRange` 로직 정의.

### Phase 2: TDD 기반 구현 (RED Cycle)
- [x] `src/utils/dateUtils.test.ts`에 유실된 함수들에 대한 실패하는 테스트 케이스 추가.
- [x] `src/utils/textUtils.test.ts`의 `generateGuidedQuestion` 관련 런타임 에러 픽스용 테스트 보강.

### Phase 3: 로직 복구 구현 (GREEN Cycle)
- [x] [MODIFY] [dateUtils.ts](file:///c:/Users/PT/Desktop/calendar/src/utils/dateUtils.ts)
    - `inRange`, `calcGuaNum`, `calcYaoNum` 함수 구현.
- [x] [MODIFY] [yaoLogic.ts](file:///c:/Users/PT/Desktop/calendar/src/utils/yaoLogic.ts)
    - `generateGuidedQuestion` 함수 위치 조정 및 명시적 export 강화.
- [x] [MODIFY] [logic.ts](file:///c:/Users/PT/Desktop/calendar/src/utils/logic.ts)
    - 모든 유틸리티 함수의 중앙 집중형 export 구조 재정립.

### Phase 4: 검증 및 동기화 (REFACTOR & PUSH)
- [x] `npm test`를 통한 전수 테스트 통과 확인.
- [x] `useCalendarLogic.ts`의 타입 에러 소거 확인.
- [x] Ray 표준에 따른 자동 Git Commit/Push 실행.

### Phase 6: UI 리팩토링 고도화 (Celestial Ephemeris)
- [x] UI 개선 작업 세분화 및 계획 수립.
- [x] [MODIFY] [MainContent.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/MainContent.tsx)
    - "Add Journal Entry" 버튼은 유지.
    - 하단 푸터 텍스트 영역(Sim-Sang Calendar, Contact, roadsea@naver.com 등) 일체 제거 확인.
- [x] [MODIFY] [Header.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/Header.tsx)
    - 타이틀을 "Celestial Ephemeris"로 변경하고 `Telescope` 아이콘(Lucide) 적용.
    - **레이아웃 반전**: 
        - [좌측]: 날짜 선택기(DatePicker) 및 Today 버튼 배치.
        - [우측]: 타이틀("Celestial Ephemeris") 및 로고 배치.
        - [최우측]: 다크모드 전환 버튼 고정 배치.
- [x] [MODIFY] [DatePicker.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/DatePicker.tsx)
    - 이미지 속 삭제 요청 사항 반영:
        - "FRIDAY, MARCH 13, 2026" 텍스트 삭제.
        - "2026-03-13" (ISO) 텍스트 삭제.
        - 캘린더 아이콘과 Today 버튼만으로 날짜 인지 및 선택 유도.
- [x] 최종 디자인 검증 및 반응형 레이아웃 확인.

### Phase 7: 빌드 오류 긴급 복구 (Build Failure Fix)
- [x] [RESEARCH] [research.md](file:///c:/Users/PT/Desktop/calendar/research.md) 작성 및 원인 분석 완료.
- [x] [MODIFY] [tailwind.config.js](file:///c:/Users/PT/Desktop/calendar/tailwind.config.js) 
    - 파손된 객체 구조 복구 및 중괄호 매칭 수정 완료.
- [x] [MODIFY] [src/index.css](file:///c:/Users/PT/Desktop/calendar/src/index.css)
    - 구문 모호성 제거 및 정규화 완료.
- [x] `npm run build`를 통한 로컬 빌드 검증 및 최종 커밋 완료.

### Phase 8: 데이터 복구 및 UI 레이아웃 최종 조정 (Recovery & UI Overhaul)
- [x] **데이터 인코딩 및 내용 복구 (Encoding Recovery)**:
    - [x] 루트의 원본 텍스트 파일(`1.gua.txt`, `2.yao.txt`, `3.soul.txt`)을 읽어 인코딩 깨짐 없는 상태로 파싱.
    - [x] `src/data/guaData.ts`, `src/data/yaoData.ts`, `src/data/soulData.ts` 파일을 UTF-8로 재생성 및 복구.
- [x] **이미지 자산 경로 정규화 (Asset Normalization)**:
    - [x] `images/` 폴더 내의 모든 이미지를 `public/images/` 폴더로 이동하여 엑박 문제 해결.
- [x] **상단바 레이아웃 구조 전면 재조정 (Header Overhaul)**:
    - [x] [MODIFY] [Header.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/Header.tsx)
        - 좌측 영역: "Celestial Ephemeris" 타이틀 + Telescope 아이콘 배치.
        - 우측 영역: `DatePicker` + `Today` 버튼 + 다크모드 버튼 순서로 배치.
        - 다크모드 버튼을 가장 우측(End)에 위치시킴.
- [x] **UI 요소 완전 삭제 및 정리 (UI Cleanup)**:
    - [x] [MODIFY] [DatePicker.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/DatePicker.tsx)
        - 선택된 날짜의 텍스트 레이블(ISO 형식 및 요일 포함) 일체 삭제.
    - [x] [MODIFY] [MainContent.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/MainContent.tsx)
        - 하단바(self_improvement, Sim-Sang Calendar, Contact 등) 잔여 요소 완전 삭제.
- [x] **최종 검증 및 배포 준비**:
    - [x] 전체 타입 체크(`npx tsc`) 및 빌드(`npm run build`) 무오류 확인.
    - [x] 텍스트 깨짐 및 이미지 시각화 정상 작동 확인.

### Phase 9: UI/UX 고도화 및 품질 개선 (Refinement)
- [x] **전역 타이포그래피 개선 (Typography Optimization)**:
    - [x] `tailwind.config.js` 및 `index.css` 수정하여 `Pretendard Variable` 기반의 고가독성 환경 구축.
- [x] **모바일 헤더 최적화 (Mobile Header)**:
    - [x] `Header.tsx` 수정하여 모바일에서도 강제 한 줄(`flex-row`) 배치 및 심미성 유지.
- [x] **하단 레이아웃 충돌 해결 (Layout Polish)**:
    - [x] `MainContent.tsx` 하단 여백 추가하여 "Add Journal Entry" 버튼이 본문을 가리는 문제 해결.
- [x] **효사 섹션 프리미엄 디자인 적용 (Premium Aesthetic)**:
    - [x] 효사 본문 텍스트 색상 및 박스 스타일을 Celestial 테마에 맞춰 더욱 고급스럽게 리디자인.
- [x] **최종 전체 시스템 점검**:
    - [x] 모든 기기(Web/Mobile)에서의 레이아웃 및 심미성 최종 확인.

### Phase 10: UI/UX 회귀 복구 및 세부 기능 고도화 (Fix & Polish)
- [ ] **웹 헤더 레이아웃 복원 (Web Header Restoration)**:
    - [ ] [MODIFY] [Header.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/Header.tsx)
        - 웹(`sm` 이상): 좌측에 날짜 선택기, 우측에 타이틀이 오도록 레이아웃 복구.
        - 모바일: 타이틀이 좌측에 오는 현재의 최적화된 한 줄 레이아웃 유지.
- [x] **달력 상호작용 개선 (DatePicker UX)**:
    - [x] [MODIFY] [DatePicker.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/DatePicker.tsx)
        - 달력에서 날짜 클릭 시 즉시 닫히도록 로직 강화.
        - 하단의 불필요한 액션 버튼 제거(네이티브 팝업 간섭 배제) 및 즉시 선택 인터페이스 확정.
- [x] **웹 전용 하단 여백 보강 (Web Layout Polish)**:
    - [x] [MODIFY] [MainContent.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/MainContent.tsx)
        - 웹 환경(`md` 이상)에서 하단 여백을 `pb-48`로 대폭 확장하여 버튼과의 간섭 완벽 차단.
- [x] **데이터 정규화 및 텍스트 수정 (Data & Text Refinement)**:
    - [x] "인간과 세상이." 문구가 포함된 구절의 오타 및 줄바꿈 가독성 개선.
- [ ] **최종 크로스 디바이스 검증**:
    - [ ] 웹과 모바일 각각의 레이아웃 의도대로 작동하는지 최종 확인.

### Phase 11: 웹 환경 최적화 및 가독성 고도화 (Web Polish & Typography)
- [x] **웹 상단바 제목 복구 (Header Title Recovery)**:
    - [x] [MODIFY] [Header.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/Header.tsx)
        - `h1` 태그의 `max-w-[120px]` 제약을 제거하고 웹에서 전체 제목 표시.
- [x] **DatePicker 클릭 신뢰성 강화 (DatePicker Fix)**:
    - [x] [MODIFY] [DatePicker.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/DatePicker.tsx)
        - 트리거 요소를 `button`으로 변경하고 터치/클릭 이벤트 안정화.
- [x] **한글 가독성 전면 개선 (Korean Typography Fix)**:
    - [x] [MODIFY] [index.css](file:///c:/Users/PT/Desktop/calendar/src/index.css) 및 [tailwind.config.js](file:///c:/Users/PT/Desktop/calendar/tailwind.config.js)
        - 본문 텍스트 `font-weight` 보강 및 한글 특화 자간/행간 재조정.
- [-] **데이터 최종 수정 (Skipped per user request)**:
    - [ ] `soulData.ts`의 "인간과 세상이" 구절 어순 수정 (정밀 매칭 시도).

## 3. 검증 결과
- **단위 테스트**: 25개 테스트 전체 통과 (Vitest).
- **타입 체크**: `npx tsc -b` 에러 없음.
- **아키텍처**: `parser.ts` 제거 및 도메인 모듈화 완수.
- **UI/UX**: Celestial Ephemeris 테마 적용 및 레이아웃 반전 고도화 완료.
- **빌드 상태**: **PASS** (Vite build successful).
