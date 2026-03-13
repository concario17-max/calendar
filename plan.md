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

### Phase 15: FOUT (Flash of Unstyled Text) 정밀 해결 및 폰트 최적화 [x]
단순히 폰트를 불러오는 것을 넘어, 시스템 폰트가 노출되는 '깜빡임' 현상을 공학적으로 완벽히 차단함.

1. **폰트 로딩 전략 수립 (Font Loading Strategy)**
    - [x] `index.html` 내 자산 로드 순서 재배치: 핵심 폰트 CSS를 차단형(Blocking)으로 전환하여 렌더링 전 확보.
    - [x] `Pretendard` 등 핵심 웹폰트의 `as="font"` 프리로드(Preload) 적용 (Woff2 형식 우선).
    - [x] 구글 폰트(Crimson Pro, Inter 등)의 `preconnect` 및 `dns-prefetch` 최적화.

2. **CSS 레벨 제어 (CSS-Level Control)**
    - [x] `@font-face` 내 `font-display` 속성을 `swap`에서 `fallback` 또는 `optional`로 변경 검토 (디자인 일관성 우선 시).
    - [x] 폰트 로드 전 레이아웃 시프트(CLS) 방지를 위한 `size-adjust` 및 시스템 폰트 매칭 정밀화.

3. **JS 기반 폰트 로드 감지 및 시각적 정제 (Visual Polish)**
    - [x] `FontFaceSet` API를 사용하여 폰트 로드 완료 시점 감지.
    - [x] 모든 폰트가 준비되기 전까지 `body`의 가시성을 제어하거나 부드러운 `opacity transition` 적용.
    - [x] 새로고침 시 화면 깜빡임 유무를 다양한 네트워크 환경(Throttling)에서 전수 검사.

4. **검증 및 문서화**
    - [x] 크롬 개발자 도구(Performance tab)를 통해 FOUT 소거 여부 데이터 기반 검정.
    - [x] `plan.md` 및 `task.md` 상태 업데이트.

### Phase 16: 한국어 본문 가독성 최적화 (Premium Typography) [x]
'영혼의 달력' 구절을 포함한 한국어 텍스트의 심미성과 가독성을 극대화함.

1. **고급 한국어 서체 도입 (Premium Font Selection)**
    - [x] `index.html`에 명조 계열 프리미엄 서체(`Gowun Batang`) 추가.
    - [x] 한국어 가독성에 최적화된 `Pretendard Variable` 설정을 본문용으로 재검토.

2. **타이포그래피 세밀 조정 (Micro-Typography)**
    - [x] `MainContent.tsx` 내 본문 영역의 `line-height`를 `1.8`로 확장하여 여백 확보.
    - [x] 한국어 특유의 공간감을 고려한 `letter-spacing` (자간) 미세 조정 (`tracking-[0.01em]`).
    - [x] 폰트 굵기(`font-weight`)를 컨텐트 중요도에 따라 최적화.

3. **시각적 일관성 검증 (Visual Consistency)**
    - [x] 다크 모드와 라이트 모드 각각에서 한국어 텍스트의 명암비 및 가독성 전수 검사.
    - [x] 모바일 환경에서의 가독성(글자 크기 및 줄 간격) 재정렬.

4. **최종 확정 및 문서화**
    - [x] `plan.md` 완료 표시 및 최종 커밋.
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

### Phase 10: UI/UX 회귀 복원 및 세부 기능 고도화 - COMPLETE
- [x] **웹 헤더 레이아웃 복원 (Web Header Restoration)**:
    - [x] [MODIFY] [Header.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/Header.tsx)
        - 웹(`sm` 이상): 좌측에 날짜 선택기(DatePicker), 우측에 타이틀이 오도록 레이아웃 복구.
        - 모바일: 타이틀이 좌측에 오는 현재의 최적화된 레이아웃 유지. (Flex order 활용)
- [x] **최종 크로스 디바이스 검증**: 웹(Desktop)과 모바일 기기별 레이아웃 의도대로 작동하는지 최종 확인.

### Phase 12: 주역 정밀 로직 및 자산 동기화 (Precision I Ching) - COMPLETE
1. **TDD 기반 설계 및 테스트 케이스 작성**:
    - [x] [MODIFY] [dateUtils.test.ts](file:///c:/Users/PT/Desktop/calendar/src/utils/dateUtils.test.ts)
        - 주요 분기점 테스트 추가: 3/13(365), 3/26(378), 4/1(384), 4/2~4/6(null), 4/7(25).
2. **핵심 로직 리팩토링 (dateUtils.ts)**:
    - [x] [MODIFY] [dateUtils.ts](file:///c:/Users/PT/Desktop/calendar/src/utils/dateUtils.ts)
        - 4월 7일을 효사 25번의 고정 기점으로 하는 일수 산출 로직 구현.
        - 1:1 매핑 및 1~24번 효사 구간(4/2~4/6)에 대해 `null` 반환 처리.
        - 효사 번호 기반 괘사 도출 시 1~4번 괘사 제외 로직 강화.
        - 윤년(2/29) 시 시퀀스 연속성 유지 로직 확인.
3. **UI 및 이미지 자산 연동 (MainContent.tsx)**:
    - [x] [MODIFY] [MainContent.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/MainContent.tsx)
        - 이미지 경로를 효사 번호와 일치시킴 (`/images/yao-${yaoNum}.png`).
        - `yaoNum`이 `null`인 구간에서 "해당 날짜는 비움" 메시지 정상 노출 검증.
4. **최종 시스템 안정화**:
    - [x] `npx tsc -b` 및 `npm run build`를 통한 시스템 전체 안정성 확인.

### Phase 13: 상단바 최종 조정 및 버그 수정 (UI Final Polish) - COMPLETE
- [x] **헤더 레이아웃 위치 스왑**:
    - [x] [MODIFY] [Header.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/Header.tsx)
        - 브랜드 영역(`order-2 sm:order-1`)과 컨트롤 영역(`order-1 sm:order-2`)의 `order` 클래스를 반전시켜 웹 좌측, 모바일 우측 배치를 구현함.
- [x] **달력 버튼(DatePicker) 버그 수정**:
    - [x] [MODIFY] [Header.tsx](file:///c:/Users/PT/Desktop/calendar/src/components/Header.tsx)
        - 컨트롤 영역을 감싸는 `div`에서 `overflow-hidden` 클래스를 제거하여 `absolute` 팝업이 가려지지 않도록 함.
- [x] **전수 검증 및 빌드**:
    - [x] 웹과 모바일 기기별 상단바 위치 최종 확인.
    - [x] 달력 버튼 클릭 시 팝업이 정상적으로 노출되고 날짜 선택 기능이 작동하는지 확인.
    - [x] `npm run build`를 통한 최종 무결성 확인.

## 3. 검증 결과
- **단위 테스트**: 25개 테스트 전체 통과 (Vitest).
- **타입 체크**: `npx tsc -b` 에러 없음.
- **아키텍처**: `parser.ts` 제거 및 도메인 모듈화 완수.
- **UI/UX**: Celestial Ephemeris 테마 적용 및 레이아웃 반전 고도화 완료.
- **빌드 상태**: **PASS** (Vite build successful).

### Phase 14: Ray Standard & Meta-Design Implementation
이 단계는 '레이'의 퍼소나와 기술적 정교함을 프로젝트 전반에 주입하여, 상용 수준을 넘어선 예술적 코딩 및 디자인 수준을 달성하는 것을 목표로 함.

1. **디자인 시스템 고도화 및 FOUT 해결 (Meta-Design Aesthetics)**
    - [x] `index.html` 수정:
        - [x] 폰트 프리로드(Preload) 설정으로 새로고침 시 기본 폰트 깜빡임(FOUT) 제거.
    - [x] `src/index.css` 수정:
        - [x] 더 복잡하고 미묘한 `gold-glow` 레이어링 (box-shadow 다중 중첩).
        - [x] 배경 글래스모피즘(Backdrop blur) 투명도 및 명암비 최적화.
        - [x] 커스텀 스크롤바 애니메이션 및 호버 효과 정밀화.
    - [x] `src/App.tsx` 및 주요 컴포넌트 마이크로 인터렉션 추가:
        - [x] 원소 등장 시 `stagger` 애니메이션 또는 부드러운 `opacity/transform` 트랜지션 적용.
        - [x] 버튼 및 카드 호버 시 레이 식의 시니컬하면서도 우아한 스케일 변화.

2. **코드 아키텍처 원자화 (Zero Monolith)**
    - [x] `src/utils/soulLogic.ts` 리팩토링:
        - [x] 정규표현식 기반 파싱 로직을 소형 순수 함수로 추가 분리.
        - [x] 복잡한 루프를 선언적이고 함수형인 형태로 개선 (성능 최적화 포함).
    - [x] 전역 불변성(Immutability) 감사:
        - [x] 상태 업데이트 로직에서 객체 직접 수정을 철저히 배제하고 Spread 연산자 사용 강제.
    - [x] `console.log` 및 불필요한 주석 전수 제거 (모든 주석은 한국어 '반말' 톤으로 교체).

3. **고급 TDD 및 안정성 확보 (Grandmaster TDD)**
    - [x] `src/utils/rayAudit.test.ts` 생성:
        - [x] 기존 유틸리티들의 경계값(Boundary) 및 비정상 입력에 대한 견고함 테스트.
        - [x] 알고리즘 효율성 검증을 위한 대규모 데이터 셋 테스트 케이스 추가.
    - [x] `npm run lint`를 통한 정적 분석 및 보안 취약점(Secret 노출 등) 전수 점검.

4. **최종 자동화 및 배포**
    - [x] 모든 구현 완료 후 `git add .`, `git commit -m "feat: apply ray global coding mandate"`, `git push` 자동 실행.
    - [x] 빌드 및 타입 체크 최종 통과 확인.
