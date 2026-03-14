### Phase 24: 모바일 Journal Entry 버튼 위치 최적화 [x]
모바일 하단 가림 현상 해결을 위해 전용 여백 및 Safe Area 보정 적용.

1. **레이아웃 개선 (UI Refinement)** [x]
    - [x] `MainContent.tsx`: 모바일 패딩 상향 (`pb-16` -> `pb-28`).
    - [x] `index.css`: `safe-bottom` 유틸리티를 기존 패딩에 합산되는 방식으로 수정.

2. **기기별 검증 (Cross-Device Audit)** [x]
    - [x] 모바일(375px~414px) 뷰포트에서 버튼 가림 현상 해결 확인.
    - [x] 데스크톱 환경 레이아웃 변함없음 확인.

---

### Phase 23: 저널 가이드 질문 문구 정제 [x]

저널 작성 시 나타나는 가이드 질문에서 지성체 이름만 남기고 보조 정보를 제거함.

1. **가이드 질문 생성 로직 수정 (Logic Refinement)** [x]
    - [x] `yaoLogic.ts`: `generateGuidedQuestion` 함수 내에서 `cleanTitle` 추출 로직 강화. [x]
    - [x] 줄바꿈 분리 및 첫 번째 괄호 `(` 이전 텍스트만 추출하도록 변경. [x]

2. **검증 및 마감** [x]
    - [x] 저널 모달을 열어 질문이 "오늘 하루, '지성체 이름'의 가르침을..." 형태로 나오는지 확인. [x]
    - [x] 기존 테스트 케이스 영향 확인 및 수정. [x]
