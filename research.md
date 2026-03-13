# Research Report: Header, DatePicker, and Typography Issues

## 1. 개요 (Overview)
최근 UI/UX 개선 작업 이후 보고된 웹 상단바 제목 잘림, 달력 버튼 오작동, 그리고 한글 폰트 가독성 저하 문제를 분석합니다.

## 2. 주요 문제점 분석 (Deep Analysis)

### A. 웹 상단바 제목 잘림 (Header Title Truncation)
- **원인**: `Header.tsx`의 `h1` 태그에 `truncate max-w-[120px]` 클래스가 적용되어 있어 모바일뿐만 아니라 웹에서도 제목이 강제로 잘리고 있습니다.
- **해결**: `sm:max-w-none` 혹은 `truncate` 제거를 통해 웹에서는 전체 제목이 표시되도록 수정해야 합니다.

### B. 달력 버튼 오작동 (DatePicker Reliability)
- **현상**: 달력 버튼을 클릭해도 기능이 작동하지 않음.
- **분석**:
    - 이전에 네이티브 `date` 입력을 제거하면서 관련 클래스나 핸들러의 간섭이 생겼을 수 있습니다.
    - `div`의 `onClick` 대신 `button` 요소를 사용하여 접근성과 이벤트 전파를 더 확실하게 처리해야 합니다.
    - 모바일 브라우저의 전파 방지(`preventDefault`) 로직이 일반 클릭까지 막고 있는지 확인이 필요합니다.

### C. 한글 폰트 가독성 이슈 (Korean Typography)
- **분석**:
    - 현재 바디 텍스트에 `font-display` (Pretendard)가 적용되어 있으나, 행간(`line-height: 1.6`)과 자간(`letter-spacing: -0.011em`)이 특정 환경에서 오히려 가독성을 해칠 수 있습니다.
    - `font-feature-settings` 설정이 한글에서 의도치 않게 작동할 수 있으므로 표준화가 필요합니다.
    - 특히 본문(I Ching, Soul) 영역의 폰트 두께(font-weight)를 `light`에서 `normal`로 조정하여 시인성을 높여야 합니다.

## 3. 해결 계획 (Action Plan)

1. **헤더 레이아웃 수정**:
    - `Header.tsx`의 제목 영역 `max-width` 제약을 웹 환경에서 제거합니다.
2. **DatePicker 리팩토링**:
    - `div`를 `button`으로 교체하고 내부 이벤트 핸들링을 강화합니다.
    - 날짜 클릭 시 `setIsOpen(false)`가 확실히 동작하도록 로직을 재검증합니다.
3. **타이포그래피 최적화**:
    - `index.css`와 `tailwind.config.js`를 수정하여 한글 가독성에 최적화된 폰트 스택과 스타일(weight, line-height)을 재설정합니다.
    - 특히 본문 텍스트의 `font-weight`를 보강합니다.
