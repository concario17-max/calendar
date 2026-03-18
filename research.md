# Celestial Ephemeris Research Report

## 1. 개요

이 프로젝트는 React + TypeScript + Vite 기반의 정적 프런트엔드 앱이다. 핵심 목적은 날짜를 입력받아 다음 3개의 축을 함께 보여주는 것이다.

1. 역경의 괘 정보
2. 해당 날짜에 대응하는 효(yao) 구절
3. Rudolf Steiner의 Calendar of the Soul 구절

앱은 별도 서버나 데이터베이스를 사용하지 않는다. 모든 원문은 빌드 시점에 TypeScript 문자열 상수로 포함되며, 사용자의 저널 기록만 `localStorage`에 저장된다.

현재 브랜딩 명칭은 `Celestial Ephemeris`이며, 헤더와 파비콘은 망원경 모티프를 공유한다.

---

## 2. 현재 기술 스택

- 런타임: React 19
- 언어: TypeScript
- 빌드: Vite 7 + SWC
- 스타일링: Tailwind CSS + 일부 커스텀 CSS 유틸리티
- 테스트: Vitest + Testing Library + jsdom
- 배포: Cloudflare Pages

`package.json`은 아직 기본 템플릿 이름 `temp-vite`를 유지하고 있다. 즉, 앱 브랜딩은 업데이트됐지만 패키지 메타데이터는 아직 정리되지 않았다.

---

## 3. 폴더 구조

루트 기준 주요 파일/폴더는 다음과 같다.

- `src/`
  앱 코드
- `public/`
  파비콘, 정적 이미지 경로
- `1.gua.txt`
  괘 원문
- `2.yao.txt`
  효 원문
- `3.soul.txt`
  Calendar of the Soul 원문
- `convert_data.cjs`
  txt 원문을 TS 상수로 바꾸는 변환 스크립트
- `research.md`
  현재 보고서

`src/` 내부는 다음처럼 나뉜다.

- `components/`
  화면 컴포넌트
- `hooks/`
  날짜/테마 관련 상태 훅
- `utils/`
  날짜 계산, 파싱, 문자열 정리 로직
- `data/`
  빌드 시 포함되는 원문 문자열 상수
- `types/`
  데이터 타입
- `test/`
  테스트 초기 설정

---

## 4. 앱 진입점과 전체 렌더 구조

### 4.1 진입점

- `src/main.tsx`
  `App`를 렌더한다.

### 4.2 최상위 구조

- `src/App.tsx`

최상위 레이아웃은 다음으로 구성된다.

1. `Header`
2. 메인 콘텐츠 래퍼
3. `MainContent`
4. 조건부 `JournalModal`
5. 전역 토스트 UI

토스트는 `window`에 커스텀 이벤트 `show-toast`를 던지는 방식으로 제어한다.

---

## 5. 날짜 기반 데이터 계산 흐름

실질적인 비즈니스 로직의 중심은 `src/hooks/useCalendarLogic.ts`다.

### 5.1 useCalendarLogic의 역할

이 훅은 다음을 한 번에 계산해 반환한다.

- `selectedDate`
- `setSelectedDate`
- `yaoNum`
- `guaNum`
- `guaData`
- `yaoData`
- `hitSoulGroup`
- `soulSections`

### 5.2 데이터 초기화

훅은 최초 마운트 시 `useMemo` 안에서 아래 원문을 파싱한다.

- `GUA_TEXT`
- `YAO_TEXT`
- `SOUL_TEXT`

이 값들은 `src/data/*.ts`에 문자열 상수로 내장되어 있다.

파싱 실패 시 빈 `Map`/빈 배열로 폴백한다. 즉, 앱은 파싱 오류가 나도 렌더는 유지하려고 설계돼 있다.

### 5.3 날짜 -> yao -> gua 매핑

핵심 날짜 계산은 `src/utils/dateUtils.ts`에 있다.

- 기준 시작일: 매년 4월 7일
- 4월 7일을 day 0으로 보고 360일 구간만 유효
- 이 구간은 `25..384`의 yao 번호로 매핑
- `calcGuaNum`은 `Math.floor((yaoNum - 1) / 6) + 1`로 괘 번호를 산출

중요한 점:

- 4월 2일 ~ 4월 6일은 의도적으로 `null`
- 즉, 연간 사이클이 365일 전체를 덮지 않으며 5일 비는 구간이 존재

### 5.4 soul calendar 매핑

`selectedDate`에서 월/일만 꺼내 `SOUL_GROUPS` 안의 `ranges`를 순회한다.

- `isInRangeMD`
  month/day 범위 포함 여부 판단
- 매칭 그룹이 있으면
  `parseWeekSectionsFromGroupBlock`으로 1개 또는 2개의 주간 섹션으로 분해

---

## 6. 원문 데이터와 파싱 방식

### 6.1 원문 데이터의 위치

정식 원문 소스는 루트의 txt 파일 3개다.

- `1.gua.txt`
- `2.yao.txt`
- `3.soul.txt`

실제 앱은 이 txt를 직접 읽지 않고, 변환된 TS 상수를 사용한다.

- `src/data/guaData.ts`
- `src/data/yaoData.ts`
- `src/data/soulData.ts`

즉, txt는 원본 보관본이고, 앱 런타임 소스는 `src/data/*.ts`다.

### 6.2 번호 블록 파싱

`src/utils/textUtils.ts`의 `parseNumberedBlocks`는 `"25. "` 같은 패턴을 기준으로 큰 블록을 나눈다.

이 함수는 `Map<number, string>`을 반환하며,

- 괘 원문
- 효 원문

둘 다 이 방식으로 인덱싱된다.

### 6.3 괘 파싱

`splitGua(block)`:

- 첫 줄 -> `header`
- 나머지 -> `meta`
- 괄호 앞 불필요 공백 제거

### 6.4 효 파싱

`splitYao(block)`:

- 첫 줄 -> `titleLine`
- 제목 첫 문장 뒤에 메타가 더 붙은 경우 줄바꿈 삽입
- 이후 문단을 빈 줄 기준으로 나눠
  - 첫 문단 -> `short`
  - 나머지 -> `body`

즉, 효 데이터는

- 제목
- 짧은 요약
- 긴 본문

세 구획으로 나뉜다.

### 6.5 soul 데이터 파싱

`src/utils/soulLogic.ts`가 담당한다.

주요 함수:

- `parseDateSpec`
- `mdToOrdinal`
- `isInRangeMD`
- `extractWeeksLabel`
- `parseSoulGroups`
- `parseWeekSectionsFromGroupBlock`

핵심 규칙:

- `CoTS Verses for Weeks ...` 형식의 줄을 그룹 제목으로 인식
- 괄호 안 날짜를 range로 파싱
- `1주 (4월 7-13) ...` 같은 헤더를 개별 섹션 시작점으로 분리
- 헤더 뒤에 붙는 `부활절 / 봄` 같은 꼬리 텍스트는 별도 `tail`로 보존 후 본문 앞에 붙임

현재 표시용 주차 라벨은

- `52주 · 1주`
- `3주`

같은 형식이다.

---

## 7. UI 구성 요소별 동작

### 7.1 Header

- 파일: `src/components/Header.tsx`

역할:

- 브랜드 타이틀 `Celestial Ephemeris`
- 날짜 선택기 진입
- “오늘” 버튼
- 테마 토글

브랜드 폰트는 `font-brand`이며 현재 `Cormorant Garamond`를 사용한다.

### 7.2 DatePicker

- 파일: `src/components/DatePicker.tsx`

특징:

- 팝오버 달력 UI
- 마우스 바깥 클릭 시 닫힘
- 키보드 화살표로 날짜 이동 가능
- 모바일에서는 `fixed`로 뜨고, 데스크톱에서는 헤더 근처 팝오버로 동작

### 7.3 IChingSection

- 파일: `src/components/IChingSection.tsx`

구성:

- 왼쪽: `public/images/yao-{번호}.png` 이미지
- 오른쪽:
  - 괘 헤더/메타
  - “오늘의 묵상” 배지
  - 효 제목
  - 짧은 인용성 요약
  - 긴 본문

`guaData` 또는 `yaoData`가 없으면 빈 상태 카드가 나온다.

### 7.4 SoulCalendarSection

- 파일: `src/components/SoulCalendarSection.tsx`

구성:

- 섹션 제목
- 주차 라벨
- 2장 카드 레이아웃

본문 첫 줄이 다음과 일치하면 badge로 분리된다.

- 봄
- 여름
- 가을
- 겨울
- 부활절 / 봄
- 성요한 절기
- 크리스마스

즉, soul 텍스트는 “배지 + 본문” 구조로 재해석된다.

### 7.5 JournalModal

- 파일: `src/components/JournalModal.tsx`

역할:

- 날짜별 저널 입력
- 안내 질문 표시
- 로컬 저장
- TXT 다운로드

최근 변경 기준 다운로드는 2가지로 나뉜다.

1. `이 구절 저장`
   현재 날짜의 괘/효/soul 구절만 TXT 저장
2. `전체 구절 저장`
   `GUA_TEXT`, `YAO_TEXT`, `SOUL_TEXT` 전체 원문을 한 파일로 저장

저널 내용과 질문은 아래 키로 `localStorage`에 저장된다.

- `journal_YYYY-MM-DD`
- `journal_q_YYYY-MM-DD`

즉, 서버 동기화는 전혀 없다.

---

## 8. 테마 시스템

- 파일: `src/hooks/useTheme.ts`
- Tailwind dark mode 방식: `class`

현재 정책:

- 첫 진입 기본값은 항상 라이트
- `localStorage.theme === 'dark'`일 때만 다크 모드
- 사용자가 토글하면
  - `html.dark` 클래스를 붙이거나 제거
  - `localStorage`에 `light` 또는 `dark` 저장

이전에는

- `index.html`에 기본 `class="dark"`가 있었고
- OS `prefers-color-scheme`를 따라가던 구조

였지만, 모바일에서 기본 다크로 보이는 문제가 있어 수정되었다.

---

## 9. 스타일 시스템과 디자인 방향

### 9.1 전역 스타일

- 파일: `src/index.css`

주요 특징:

- 금색/웜그레이 기반 커스텀 CSS 변수
- 다크모드 대응 변수
- 커스텀 스크롤바
- `fadeInUp` 애니메이션
- `gold-glow`, `active-scale`, `safe-bottom` 유틸

### 9.2 Tailwind 확장

- 파일: `tailwind.config.js`

확장 내용:

- 색상: `elegant-gold`, `ray-dark`, `warm-gray`
- 폰트:
  - `display`: Pretendard 계열
  - `brand`: Cormorant Garamond 계열
  - `serif`: Crimson Pro 계열

### 9.3 시각적 특징

현재 디자인은 다음 방향으로 정리되어 있다.

- 배경: 웜톤 종이/양피지 느낌
- 타이포:
  - 본문은 읽기 좋은 산세리프
  - 브랜드/섹션 헤드라인은 세리프
- CTA는 짙은 웜그레이 계열
- 파비콘은 금색 원형 + 흰색 망원경의 2D 아이콘

---

## 10. 정적 자산

### 10.1 이미지 자산

`public/images/yao-25.png`부터 `yao-384.png`까지의 정적 이미지가 효 번호에 대응한다.

### 10.2 파비콘

- 현재 파일: `public/favicon.svg`
- 최신 시안: Bold Telescope 계열

이 파비콘은 `calendar.simsang.org`에서 반영되며, 브라우저 탭 캐시 때문에 즉시 바뀌지 않을 수 있다.

---

## 11. 배포 상태

Cloudflare Pages 프로젝트가 앱별로 분리되어 있다.

현재 확인된 프로젝트:

- `calendar`
  - `calendar-2ty.pages.dev`
  - `calendar.simsang.org`
- `tibet`
  - `tibet-14t.pages.dev`
  - `tibet.simsang.org`

중요한 사실:

- 이 repo는 `calendar` 프로젝트에 연결되어 있음
- `tibet.simsang.org`는 완전히 다른 프로젝트를 보고 있음

즉, `tibet.simsang.org`에서 파비콘이나 제목이 안 바뀌는 것은 이 repo 변경이 배포 안 된 문제가 아니라, 아예 다른 Pages 프로젝트를 보고 있기 때문이다.

현재 최근 프로덕션 배포에는 `f2e2f11`, `35cf619`, `371d0f2` 등 최신 변경이 반영되었다.

---

## 12. 테스트와 검증 상태

현재 기준 검증 결과:

- `npm run build` 통과
- `npm test -- --run` 통과
- 총 25개 테스트 통과

테스트 파일:

- `src/utils/dateUtils.test.ts`
- `src/utils/parser.test.ts`
- `src/utils/rayAudit.test.ts`
- `src/utils/textUtils.test.ts`

테스트 범위는 대부분 유틸 함수 중심이다.

즉, 다음은 거의 검증하지 않는다.

- 실제 컴포넌트 렌더링
- 모달 다운로드 UI 상호작용
- 파비콘/브랜딩 노출
- Cloudflare 배포 결과

---

## 13. 현재 기준의 주요 변경 이력

최근 커밋 흐름상 큰 변화는 다음과 같다.

- 데이터 원문 복구
- UI 한국어 정리 후, 현재는 영어 브랜딩으로 재조정
- 디자인이 `77b26fd` 감성 쪽으로 복귀
- 헤드라인용 세리프 폰트 도입
- CTA와 읽기 위계 미세조정
- 파비콘을 헤더 아이콘 계열로 통일
- 저널 모달에 “이 구절 저장 / 전체 구절 저장” 추가
- 기본 테마를 라이트로 변경

가장 최근 기능성 변경은:

- `feat: add passage export options and light default theme`

---

## 14. 문제점과 리스크

### 14.1 README가 완전히 오래됨

`README.md`는 아직 Vite 기본 템플릿 문서다.
실제 프로젝트 설명과 전혀 맞지 않는다.

### 14.2 문자열 인코딩 확인은 PowerShell로 어렵다

터미널에서는 한글이 종종 깨져 보인다.
하지만 Node/Vite 기준 실제 파일은 정상 UTF-8인 경우가 많다.

즉, 이 프로젝트는 텍스트 확인 시

- PowerShell 출력
보다
- Node로 읽은 원문
- 브라우저 렌더 결과

를 신뢰하는 것이 안전하다.

### 14.3 저널 데이터는 기기 종속

`localStorage`만 사용하므로:

- 브라우저를 바꾸면 기록이 안 보임
- 캐시/스토리지 삭제 시 유실
- 여러 기기 동기화 불가

### 14.4 테스트가 UI를 거의 보지 않음

다운로드 메뉴, 모달, 테마 토글, 날짜 선택기, 실제 섹션 렌더링에 대한 자동화 테스트가 부족하다.

### 14.5 번들 크기 경고

최근 빌드 기준 JS 번들은 약 `532 kB` 수준이며, Vite가 chunk size warning을 출력한다.

즉, 기능상 문제는 없지만 코드 분할 여지가 있다.

---

## 15. 유지보수 시 우선 권장 작업

우선순위 순으로 추천하면 다음과 같다.

1. `README.md`를 실제 프로젝트 설명으로 교체
2. `JournalModal`과 섹션 렌더에 대한 컴포넌트 테스트 추가
3. 파비콘/아이콘 계열에 대해 `favicon.ico`, `apple-touch-icon`까지 정리
4. `calendar.simsang.org`를 기준 도메인으로 문서화
5. 번들 분할 또는 불필요 의존성 점검

---

## 16. 결론

현재 이 프로젝트는 “날짜를 입력하면 역경 + 효 + Calendar of the Soul을 함께 보여주는 정적 사색 앱”으로 명확히 정리되어 있다.

핵심 특징은 다음 4가지다.

1. 서버 없는 구조
2. 원문 내장형 데이터 모델
3. 날짜 기반 계산 로직
4. 로컬 저널 기록 + TXT 내보내기

최근 작업으로 인해 현재 상태는 다음과 같이 볼 수 있다.

- 데이터 복구 완료
- 디자인 위계 정리 완료
- 브랜드명/파비콘 정리 완료
- 다운로드 UX 확장 완료
- 모바일 기본 라이트 모드 정리 완료

즉, 현재는 “콘셉트, 데이터, UI, 배포가 분리된 상태에서 실제 서비스 가능한 수준”이며,
남은 과제는 주로 문서화, 테스트 보강, 배포 도메인 커뮤니케이션 명확화다.
