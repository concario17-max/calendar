# Research Report: Typography & Color Refinement (Pretendard Optimization)

사용자의 가독성 개선 요청에 따라 현재의 하이브리드 서체 시스템을 분석하고, 프리텐다드(Pretendard) 중심의 고대비 디자인 시스템으로의 전환 방안을 도출함.

## 1. 현재 시스템 분석

### A. 타이포그래피 (Current Typography)
- **UI/기본**: `font-display` (Pretendard) 사용 중.
- **콘텐츠 (주역/영혼의 달력)**: `font-serif` (Gowun Batang, Crimson Pro) 사용 중. 이는 문학적 감수성을 강조하나, 고해상도 모바일 기기나 특정 환경에서 가독성이 고딕 계열보다 떨어질 수 있음.
- **자간/행간**: 현재 `tracking-[0.01em]`, `leading-[1.8]` 설정으로 명조체에 최적화되어 있음.

### B. 색상 시스템 (Current Colors)
- **본문**: 주로 `text-warm-gray-600` (~ `#766653`) 또는 `warm-gray-700` 등을 사용하여 부드러운 인상을 주려 했으나, 배경과의 대비가 낮아 가독성 이슈가 발생할 수 있음.
- **이미지 분석**: 이미지 속 본문은 배경 대비 다소 흐릿하게 보일 수 있는 연한 톤을 유지하고 있음.

## 2. 개선 방향 (Proposed Optimization)

### A. 서체 통합: Pretendard First
- **전환**: 모든 콘텐츠 영역(`IChingSection`, `SoulCalendarSection`)에서 `font-serif`를 제거하고 `font-display` (Pretendard)로 통일.
- **조정**: 고딕 계열에 맞춰 `letter-spacing`을 `-0.02em`~`-0.01em` 정도로 더 조밀하게 조정하여 프리미엄한 인상을 유지함.

### B. 본문 대비 강화: #2D2C2A
- **타겟 색상**: 사용자가 제안한 `#2D2C2A`는 거의 검정에 가까운 아주 짙은 차콜 그레이로, 백색/미색 배경 위에서 최상의 가독성을 보장함.
- **적용**: 텍스트 색상을 `text-[#2D2C2A]` 또는 이에 준하는 새로운 컬러 토큰으로 업데이트.
- **다크 모드**: 다크 모드에서는 이보다 밝지만 가독성 높은 그레이 계열로 밸런싱 작업 병행.

## 3. 세부 작업 항목 산출
1. `tailwind.config.js`에 `#2D2C2A` 테마 컬러 정의.
2. 각 섹션 컴포넌트의 클래스에서 `font-serif` -> `font-display` 교체.
3. 연한 회색 텍스트 클래스를 신규 정의된 진한 색상으로 교체.
4. 명조체 기반의 미세 조정 값(자간 등)을 고딕 환경에 맞게 재조정.

## 4. Phase 18 가독성 최적화 결과 (Final Premium Finish)

- **서체 통합**: `Gowun Batang`명조체를 제거하고 `Pretendard`로 통일함. 고딕 서체의 특성에 맞춰 자간을 `tracking-tight`(-0.025em)로 조정하여 현대적인 인상을 강화함.
- **색상 고대비 구현**: 본문 및 해설 텍스트에 `#2D2C2A` (`ray-body`)를 적용하여 미색 배경(`#FCFBF9`) 위에서 명확한 가독성을 확보함.
- **다크모드 균형**: 다크모드에서는 `text-warm-gray-200` 등을 사용하여 눈의 피로를 최소화하면서도 가독성을 유지함.
- **성능 최적화**: 사용하지 않는 폰트 리소스(`Gowun Batang`, `Noto Serif KR`)를 `index.html`에서 제거하여 초기 로딩 속도를 개선함.

---
모든 최적화 작업이 완료되었으며, 시스템은 레이의 글로벌 코딩 만트라와 프리미엄 디자인 표준을 충실히 따르고 있음.
