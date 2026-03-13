### Phase 22: 데이터 무결성 복구 및 UI 레이아웃 최적화 [x]
업데이트된 소울 텍스트를 반영하고, 누락된 주차를 복구하며 UI 여백을 조정함.

1. **소울 캘린더 파싱 로직 개선 (Logic Fix)** [x]
    - [x] `soulLogic.ts`: 헤더 정규표현식(`headerRe`)에서 `$` 제거 또는 유연한 매칭 적용 (추가 텍스트 허용). [x]

2. **데이터 동기화 (Data Update)** [x]
    - [x] `src/data/soulData.ts`: `3.soul.txt`의 최신 내용으로 `SOUL_TEXT` 상수 업데이트. [x]

3. **UI 여백 조정 (Spacing Adjustment)** [x]
    - [x] `MainContent.tsx`: `<main>` 태그의 하단 패딩(`pb`)을 절반으로 축소 (`pb-16 md:pb-24`). [x]

4. **검증 및 마감** [x]
    - [x] 누락되었던 주차(1주, 12주, 26주 등)가 정상적으로 표시되는지 확인. [x]
    - [x] 웹 화면에서 버튼 하단 여백이 적절하게 줄어들었는지 확인. [x]
