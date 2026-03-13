# Research Report: Mobile UI Optimization (Phase 20)

모바일 환경에서의 시각적 완성도와 사용성 향상을 위해 보고된 3가지 이슈(달력 이탈, 버튼 잘림, 가로 스크롤)를 정밀 분석함.

## 1. 달력 화면 이탈 (DatePicker Overflow)
- **현상**: 모바일에서 달력을 클릭하면 팝업이 화면 우측이나 좌측으로 벗어남.
- **원인**: `DatePicker.tsx`에서 팝업 `div`가 `absolute` 및 `left-0` 속성과 고정 너비(`w-[320px]`)를 가지고 있어, 부모 요소의 위치에 따라 화면 밖으로 밀려남.
- **해결**: 모바일 환경에서는 `fixed` 포지셔닝을 사용하거나, 뷰포트 내 중앙에 배치되도록 개선. 또는 하단 시트(Bottom Sheet) 스타일로 전환 검토.

## 2. 다크모드 버튼 잘림 (Header Controls Clipping)
- **현상**: 최상단 상단바에서 다크모드 전환 버튼이 화면 우측 끝에서 잘림.
- **원인**: 상단바의 제목(Celestial Ephemeris)과 컨트롤 영역의 합계 너비가 모바일 뷰포트 너비를 초과함.
- **해결**: 모바일에서 제목의 폰트 크기를 축소하거나, 요소 간 간격(`gap`)을 조정하고 브랜딩 영역의 `flex-shrink`를 세밀하게 제어.

## 3. 가로 스크롤 발생 (Horizontal Scroll / Viewport Leak)
- **현상**: 화면이 좌우로 미세하게 움직여 불안정한 느낌을 줌.
- **원인**: `w-[320px]`와 같은 고정 너비 요소나 패딩 계산 오류로 인해 콘텐츠가 뷰포트를 수픽셀 초과함.
- **해결**: `index.html` 및 `index.css`에서 `html, body`에 `overflow-x: hidden`을 강제하고, 모든 유동적 요소에 `max-w-full` 및 `box-sizing: border-box`가 준수되도록 점검.

## 5. Phase 21 타이포그래피 단순화 (Natural Text Flow) [x]

- **자동 줄바꿈 해제**: `applySentenceBalance` 함수를 통한 인위적인 줄바꿈 로직을 제거함.
- **단어 단위 줄바꿈 적용**: 한글 텍스트의 가독성을 위해 단어 중간에서 끊기지 않도록 `word-break: keep-all` (Tailwind: `break-keep`) 스타일을 적용함.
- **결과**: 모든 본문이 띄어쓰기 기준으로 정갈하게 줄바꿈되어, 시각적 균형과 가독성을 모두 확보함.

---
모든 레이아웃 및 타이포그래피 설정이 사용자의 최신 요구사항에 맞춰 최적화되었음.
위 분석 내용을 바탕으로 `plan.md`를 업데이트하여 시스템적 수정을 진행함.
