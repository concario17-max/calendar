# Calendar 프로젝트 조사 보고서

기준 커밋: `d45028c`  
최종 갱신: 2026-03-16

## 1. 요약

이 프로젝트는 선택한 날짜를 기준으로 다음 3가지를 보여주는 단일 페이지 앱이다.

1. I Ching `yaoNum`
2. `yaoNum`으로부터 계산한 `guaNum`
3. `Calendar of the Soul` 주간 본문

핵심 특징은 외부 API 없이 저장소 안의 정적 텍스트 원문만으로 동작한다는 점이다.  
실제 도메인 데이터는 아래 3개 파일이다.

- `1.gua.txt`
- `2.yao.txt`
- `3.soul.txt`

이 파일들을 `src/data/*.ts`의 문자열 상수로 변환한 뒤, 브라우저 런타임에서 파싱해서 화면에 표시한다.

이번 정리 작업으로 완료된 핵심 항목은 다음과 같다.

1. 코드 레벨 문자 깨짐 정리
2. git 히스토리에서 정상 원문 복구
3. `src/data/*.ts` 재생성
4. UI 라벨 한국어 통일
5. `영혼의 달력` 파싱 및 표시 개선
6. 미사용 파일 정리

현재 빌드와 테스트는 모두 통과한다.

## 2. 기술 스택

- React 19
- TypeScript 5.9
- Vite 7
- Tailwind CSS 3
- Vitest + jsdom
- `lucide-react`

앱은 라우터 없는 단일 화면 구조다.

진입 흐름:

`index.html`  
-> `src/main.tsx`  
-> `App`  
-> `useCalendarLogic`  
-> 화면 섹션 렌더

## 3. 주요 폴더와 역할

### `src/`

- `main.tsx`
  - 앱 마운트
- `App.tsx`
  - 최상위 조합
  - 토스트
  - 저널 모달 상태 관리
- `components/`
  - 헤더, 날짜 선택기, 본문 섹션, 저널 모달
- `hooks/`
  - 날짜 기반 계산과 테마 토글
- `utils/`
  - 파싱, 날짜 계산, soul 범위 계산
- `types/`
  - 파싱 결과 타입
- `data/`
  - 생성된 문자열 상수

### 루트 데이터 파일

- `1.gua.txt`
- `2.yao.txt`
- `3.soul.txt`

이 3개가 이 앱의 실제 콘텐츠 원본이다.

### 생성 스크립트

- `convert_data.cjs`
  - 루트 txt 파일을 `src/data/guaData.ts`, `src/data/yaoData.ts`, `src/data/soulData.ts`로 변환

### 정적 이미지

- `public/images/yao-25.png` ~ `public/images/yao-384.png`

각 `yaoNum`에 대응하는 이미지가 직접 연결된다.

## 4. 현재 런타임 구조

`useCalendarLogic()`이 앱의 핵심 도메인 허브다.

이 훅이 제공하는 값:

- `selectedDate`
- `setSelectedDate`
- `yaoNum`
- `guaNum`
- `guaData`
- `yaoData`
- `hitSoulGroup`
- `soulSections`

`App.tsx`에서 따로 관리하는 값:

- `isJournalOpen`
- `toastMessage`

즉, 앱은 날짜 하나를 중심으로 계산 결과와 화면 표시를 구성한다.

## 5. 날짜 계산 규칙

### `calcYaoNum(date)`

규칙:

- 기준 시작일: 매년 4월 7일
- 유효 구간: 360일
- 반환 범위: `25..384`
- 4월 2일 ~ 4월 6일은 `null`

결과 예시:

- 4/7 -> 25
- 다음 해 4/1 -> 384
- 4/2 ~ 4/6 -> 없음

### `calcGuaNum(yaoNum)`

공식:

`Math.floor((yaoNum - 1) / 6) + 1`

즉, 6개 yao가 1개 gua를 이룬다.

## 6. 데이터 파싱 방식

### `parseNumberedBlocks`

`gua`, `yao`는 번호 시작 블록으로 자른다.

정규식:

`/^(\d+)\.\s/mg`

반환형:

`Map<number, string>`

### `splitGua`

- 첫 줄 -> `header`
- 나머지 -> `meta`

### `splitYao`

- 첫 줄 -> `titleLine`
- 첫 문단 -> `short`
- 나머지 문단 -> `body`

### `parseSoulGroups`

`CoTS Verses for Weeks ...` 라인을 그룹 시작으로 인식한다.

추출 항목:

- 표시 라벨
- 주차 번호
- 날짜 범위
- 원문 블록

### `parseWeekSectionsFromGroupBlock`

주간 헤더를 다시 쪼개서 카드용 섹션을 만든다.

최근 개선 사항:

- `1주 (4월 7-13) 부활절 / 봄` 같은 줄의 꼬리 정보가 보존됨
- `weeksLabel`이 영어가 아니라 `52주 · 1주` 같은 한국어 형식으로 표시됨

## 7. UI 구조

### Header

포함 기능:

- 브랜드 표시
- 날짜 선택
- 오늘 버튼
- 테마 토글

### I Ching 섹션

표시 내용:

- `guaData.header`
- `guaData.meta`
- `yaoData.titleLine`
- `yaoData.short`
- `yaoData.body`
- 대응 이미지 `/images/yao-${yaoNum}.png`

### 영혼의 달력 섹션

표시 내용:

- 현재 soul 그룹 라벨
- 최대 2개의 주간 카드
- 복구된 원문 형식에 맞춘 부제 표시

### 저널 모달

기능:

- 날짜별 기록 작성
- 로컬 저장
- TXT 다운로드
- 안내 질문 표시

저장 키:

- `journal_YYYY-MM-DD`
- `journal_q_YYYY-MM-DD`

## 8. 이번에 복구한 핵심 문제

가장 중요했던 문제는 원문과 코드 문자열이 깨져 보이는 상태였다.

확인 결과:

- 저장소 현재본만 손상된 것이 아니었고
- git 히스토리 안에 정상 원문이 남아 있었음

복구 기준:

- `1.gua.txt` -> `cab8715`
- `2.yao.txt` -> `cab8715`
- `3.soul.txt` -> `5bc6bd4`

복구 후:

- 루트 txt 복원
- `convert_data.cjs` 재실행
- `src/data/*.ts` 재생성

중요한 점:

PowerShell 콘솔에서는 인코딩 때문에 여전히 글자가 이상하게 보일 수 있다.  
하지만 Node/Vite 기준으로 파일을 읽었을 때는 정상 텍스트가 확인되었고, 실제 앱도 그 경로를 사용한다.

## 9. UI 정리 결과

현재 화면 라벨은 한국어로 통일했다.

예:

- `심상 달력`
- `오늘`
- `오늘의 묵상`
- `영혼의 달력`
- `저널 기록`
- `저장하기`
- `취소`
- `TXT 다운로드`

즉, 이전처럼 영어/깨진 문자열이 섞인 상태는 크게 줄었다.

## 10. 미사용 파일 정리

삭제 완료:

- `src/App.css`
- `generate_data.js`

이유:

- `src/App.css`는 import되지 않는 Vite 템플릿 잔재
- `generate_data.js`는 현재 데이터 생성 구조와 맞지 않는 레거시 스크립트

## 11. 검증 결과

확인 완료:

- `npm run build` 통과
- `npm test -- --run` 통과
- 25개 테스트 전부 통과
- 개발 서버 `http://127.0.0.1:4173` 응답 `200`

즉, 현재 상태는 배포 가능한 수준이다.

## 12. 현재 강점

1. 외부 API 없이 완결된 구조
2. 핵심 로직이 `utils`에 모여 있어 테스트 가능
3. 날짜 계산이 UTC day-only 기준이라 안정적
4. 원문 복구 후 콘텐츠 신뢰도가 크게 개선됨
5. 한국어 UI로 톤이 정리됨

## 13. 남은 리스크

1. 터미널 인코딩 때문에 수동 점검 시 혼동 가능
2. UI 통합 테스트는 아직 없음
3. 번들 크기 경고가 남아 있음
4. soul 카드가 최대 2개만 보이도록 제한돼 있음

## 14. 추천 후속 작업

우선순위 추천:

1. 날짜별 UI 스냅샷 또는 통합 테스트 추가
2. soul 섹션이 2개만 보이는 정책이 맞는지 확인
3. 큰 텍스트 상수들을 분리 로딩할지 검토
4. 필요하면 배포 자동화 또는 운영 문서 추가

## 15. 최종 평가

이 프로젝트는 일반적인 React 페이지라기보다, 날짜 기반 텍스트 매핑 앱에 가깝다.

핵심은 다음 세 가지다.

- 날짜 계산
- 원문 파싱
- 그 결과를 보여주는 단일 화면 UI

정리 이전에는 문자 깨짐이 가장 큰 리스크였지만, 현재는 다음 상태까지 회복됐다.

- 원문 복구 완료
- 데이터 상수 재생성 완료
- 한국어 UI 정리 완료
- soul 파싱 개선 완료
- 테스트/빌드 검증 완료

현재 기준으로는 유지보수 가능한 상태이며, 바로 다음 단계는 선택적 품질 향상 작업이다.
