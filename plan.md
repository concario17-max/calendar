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

## 3. 검증 결과
- **단위 테스트**: 25개 테스트 전체 통과 (Vitest).
- **타입 체크**: `npx tsc -b` 에러 없음.
- **아키텍처**: `parser.ts` 제거 및 도메인 모듈화 완수.
- **UI/UX**: Celestial Ephemeris 테마 및 레이아웃 반전 적용 완료.
