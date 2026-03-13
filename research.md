# 프로젝트 심층 분석 보고서 (Research Report)

## 1. 프로젝트 개요
본 프로젝트는 **"Soul & I-Ching Calendar"** 플랫폼으로, 동양의 주역(I-Ching) 철학과 슈타이너의 영혼의 달력(Calendar of the Soul)을 결합하여 사용자에게 매일의 명상 구절과 지혜를 제공하는 웹 애플리케이션임.

## 2. 기술 스택 (Tech Stack)
- **Frontend**: React 19, Vite 7 (Type: Module)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS (Predefined Elegant-Gold/Ray-Dark 테마), PostCSS
- **State Management**: React Hooks (Custom Hook: `useCalendarLogic`)
- **Testing**: Vitest, React Testing Library
- **Architecture**: Atomic Logic Separation (Zero Monolith 원칙 지향)

## 3. 핵심 아키텍처 및 데이터 흐름
### 3.1 로직 구성
- **`useCalendarLogic` Hook**: 애플리케이션의 중추. 선택된 날짜(`selectedDate`)를 기반으로 모든 인덱싱과 데이터 매칭을 수행함.
- **날짜 매핑 시스템**: 365일을 약 64개의 단위(주역의 64괘 및 영혼의 달력 64구절)로 변환하는 알고리즘을 사용함.
- **데이터 파서**: `parser.ts`를 통해 로우 텍스트 파일(`.txt`)을 구조화된 데이터 객체로 변환함.

### 3.2 데이터 구조
- **Gua (괘)**: 주역 64괘. `1.gua.txt` 기반.
- **Yao (효)**: 각 괘의 6개 라인, 총 384개 구절. `2.yao.txt` 기반.
- **Soul (영혼의 달력)**: 슈타이너의 64개 절기 구절. `3.soul.txt` 기반.

## 4. UI/UX 디자인 에스테틱 (Meta-Design)
- **테마**: `elegant-gold` (#B8860B)와 `ray-dark` (#0A0A0A)를 기반으로 한 고대비 다크 모드 및 글래스모피즘(`backdrop-blur`) 적용.
- **애니메이션**: `framer-motion` 스타일의 CSS 애니메이션 적용 (`animate-fade-in`).
- **타이포그래피**: 전통적 권위를 위해 세리프(Serif) 폰트와 현대적인 디스플레이 폰트 혼용.

## 5. 발견된 중대 결함 (Critical Issues Found)
### 5.1 핵심 로직 유실 (Missing Core Logic)
- **문제점**: `useCalendarLogic.ts`에서 임포트하여 사용하는 `calcGuaNum`, `calcYaoNum`, `inRange` 함수가 유틸리티 파일 어디에도 정의되어 있지 않음.
- **영향**: 현재 애플리케이션은 런타임 에러로 인해 정상적인 날짜 매핑이 불가능한 상태임.

### 5.2 코드 부패 및 포맷 오류
- **`dateUtils.ts`**: 파일 하단부가 유실되거나 주석 블록이 깨진 상태로 커밋되어 있음.
- **`yaoLogic.ts`**: `splitYao` 함수와 `generateGuidedQuestion` 함수가 문법적으로는 유효하나 포맷팅이 엉망으로 섞여 있음.
- **테스트 실패**: `generateGuidedQuestion`이 함수가 아니라는 타입 에러로 인해 Vitest 구동 시 실패함.

## 6. 결론 및 제언
현재 프로젝트는 디자인과 데이터 구조는 훌륭하나, **핵심 인덱싱 로직이 유실된 "뇌사 상태"**임. 최우선적으로 `dateUtils.ts`와 `logic.ts`에 유실된 함수들을 복구 또는 재구축하고, 모듈 내보내기 구조를 정규화하여 테스트를 통과시켜야 함.
