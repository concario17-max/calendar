# Research Report: UI/UX Refinement Analysis

## 1. 개요 (Overview)
긴급 데이터 복구 완료 후, 실사용성 개선을 위한 UI/UX 정밀 리서치를 수행했습니다. 사용자의 추가 피드백(하단 버튼 겹침, 모바일 레이아웃 협소, 폰트 가독성, 특정 섹션의 심미성)을 바탕으로 분석을 진행했습니다.

## 2. 주요 문제점 및 분석 (Key Issues)

### A. 하단 플로팅 버튼 겹침 (Floating Button Overlap)
- **현상**: "Add Journal Entry" 버튼이 고정 위치(`fixed`)에 있어 본문 하단 텍스트를 가림.
- **원인**: `MainContent.tsx` 하단에 버튼을 위한 충분한 여백(Padding/Margin)이 확보되지 않았습니다.
- **영향**: 모바일 및 좁은 화면에서 주요 정보를 읽는 데 방해가 됩니다.

### B. 모바일 상단바 레이아웃 (Mobile Header Stacking)
- **현상**: 모바일 화면에서 상단바 요소들이 두 줄로 쌓여 공간을 과도하게 차지함.
- **원인**: `flex-col` 설정으로 인해 타이틀 영역과 컨트롤 영역이 수직 배치됩니다.
- **영향**: 가독 가능 영역이 좁아지고 답답한 인상을 줍니다.

### C. 폰트 및 가독성 (Typography & Readability)
- **현상**: 현재 적용된 폰트가 특정 환경에서 가독성이 떨어지거나 조화롭지 않음.
- **분석**: `Crimson Pro`와 `Inter`가 적용되어 있으나, 한글 폰트(`Pretendard`, `Noto Serif KR`)와의 매끄러운 연동 및 굵기 조절이 더 필요합니다.

### D. 효사(Yao) 섹션 스타일 (Yao Display Aesthetics)
- **현상**: 본문 텍스트가 순수 검정색으로 표시되어 전체적인 "Celestial" 테마와 어울리지 않고 투박함.
- **분석**: 고급스러운 테마를 위해 텍스트 색상을 부드럽게 조정하고, 배경 혹은 경계선에 테마 컬러를 반영한 스타일링이 누락되었습니다.

## 3. 해결 방안 (Proposed Solutions)

1. **레이아웃 개선**:
    - `MainContent` 하단에 대폭적인 패딩(`pb-32` 이상)을 추가하여 버튼과의 간섭을 차단합니다.
    - `Header`를 모바일에서도 `flex-row`를 유지하도록 변경하고, 아이콘 크기 및 텍스트를 최적화하여 한 줄 배치를 강제합니다.
2. **타이포그래피 업그레이드**:
    - 가독성이 극대화된 `Pretendard Variable`을 메인 본문 폰트로 확정하고, `font-feature-settings`를 최적화합니다.
    - 줄 간격(leading)과 자간(tracking)을 정밀 조정합니다.
3. **심미성 고도화**:
    - 효사(Yao) 본문 텍스트에 `warm-gray` 톤의 깊이 있는 색상을 적용합니다.
    - 텍스트 박스에 미세한 그라데이션 혹은 테마 색상이 가미된 보더 스타일을 추가하여 "고급스러운" 느낌을 구현합니다.

## 4. 향후 방침 (Future Policy)
- 모든 UI 변경은 "One-line on Mobile" 원칙을 준수합니다.
- 'Celestial' 테마의 핵심 색상(`elegant-gold`, `warm-gray`)을 적극 활용하여 프리미엄 품질을 유지합니다.
