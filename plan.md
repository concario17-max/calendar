# Celestial Ephemeris Todo Plan

이 문서는 `research.md`를 바탕으로 만든 실행 계획서였고, 아래 항목들은 현재 구현 완료 상태다.

## Phase 1. 문서/메타 정리 [완료]

- [x] `README.md`를 실제 프로젝트 소개 문서로 교체
- [x] 앱 개요, 데이터 출처, 로컬 실행 방법, 테스트 방법 문서화
- [x] 배포 도메인 구분 문서화
- [x] `calendar.simsang.org`와 `tibet.simsang.org`가 다른 프로젝트라는 점 명시
- [x] `package.json`의 `name`을 실제 프로젝트명에 맞게 정리

## Phase 2. 문자열/인코딩 표면 정리 [완료]

- [x] `src/components/Header.tsx`의 깨진 한국어 버튼 라벨 정리
- [x] `src/components/IChingSection.tsx`의 빈 상태 문구/배지 문구 정리
- [x] `src/components/SoulCalendarSection.tsx`의 fallback 문구와 주차 표기 점검
- [x] `src/components/JournalModal.tsx`의 한글 문자열 UTF-8 정상화
- [x] PowerShell 출력 깨짐과 실제 파일 인코딩 문제를 분리하는 기준 문서화
- [x] Node 기준 문자열 검사 스크립트 추가 (`npm run check:encoding`)

## Phase 3. 테마 시스템 정리 [완료]

- [x] 현재 라이트 기본 정책이 모든 진입 경로에서 일관되게 동작하도록 수정
- [x] `localStorage.theme` 값이 `light`, `dark`, `null`일 때 동작 시나리오 반영
- [x] 초기 렌더 깜빡임(FOUC) 최소화용 테마 초기화 스크립트 추가
- [x] `index.html`에서 테마 초기화 처리
- [x] 모바일/데스크톱 테마 토글 UX 유지

## Phase 4. 저널 모달 UX 정리 [완료]

- [x] `TXT 다운로드` 메뉴 구현
- [x] 모달 외부 클릭 시 다운로드 메뉴 닫힘 처리
- [x] `이 구절 저장` 파일 포맷 구현
- [x] `전체 구절 저장` 파일 포맷 구현
- [x] 파일명 규칙 정리
- [x] 질문 생성 로직과 저장 로직 연결 점검
- [x] localStorage 키 구조 문서화
- [x] 모바일에서도 쓸 수 있는 버튼 레이아웃 유지

## Phase 5. 텍스트 가독성/시각 위계 개선 [완료]

- [x] 헤더 타이틀 존재감 재조정
- [x] `IChingSection` 상단 메타 줄 밀도 조정
- [x] `yaoData.titleLine` 줄바꿈 규칙과 폭 재조정
- [x] `yaoData.short`와 `yaoData.body` 차별화 보강
- [x] `SoulCalendarSection` 카드 본문 크기/행간 조정
- [x] CTA 버튼 색/크기/대비 재조정
- [x] 다크모드 대비 점검

## Phase 6. soul 파싱/표시 로직 보강 [완료]

- [x] `extractSectionBadge` 규칙 점검
- [x] `parseSoulGroups` 기본 케이스 검증
- [x] `parseWeekSectionsFromGroupBlock` 헤더 경계 케이스 테스트 추가
- [x] `tail` 텍스트 보존 로직 유지 및 테스트 반영
- [x] `weeksLabel` 단일/복수 주차 테스트 반영
- [x] soul 카드가 1개여도 렌더되도록 UX 개선

## Phase 7. 날짜 계산 로직 검증 강화 [완료]

- [x] 4월 2일 ~ 4월 6일 `null` 구간 안내 문구 개선
- [x] `calcYaoNum` 경계값 테스트 유지/검증
- [x] 연도 전환 시점 테스트 재검증
- [x] `calcGuaNum` 매핑 검증 유지
- [x] 날짜 계산 규칙을 `README.md`와 `research.md`에 요약

## Phase 8. 테스트 보강 [완료]

- [x] `JournalModal` 렌더 및 다운로드 메뉴 테스트 추가
- [x] 다운로드 옵션 메뉴 테스트 추가
- [x] 테마 토글 테스트 추가
- [x] 날짜 선택기 상호작용 테스트 추가
- [x] `IChingSection` 빈 상태/정상 상태 테스트 추가
- [x] `SoulCalendarSection` 카드 수와 fallback 테스트 추가
- [x] 회귀 테스트 범위를 34개 테스트까지 확장

## Phase 9. 파비콘/앱 아이콘 체계 정리 [완료]

- [x] `favicon.svg`를 주요 브라우저 탭 가독성 기준으로 조정
- [x] `favicon.ico` 추가
- [x] `apple-touch-icon.png` 추가
- [x] `manifest.webmanifest` 추가
- [x] 파비콘 캐시/배포 확인 절차를 문서화

## Phase 10. 배포/운영 정리 [완료]

- [x] `calendar` Cloudflare Pages 프로젝트 기준 상태 문서화
- [x] 커스텀 도메인 연결 상태 문서화
- [x] `tibet` 프로젝트와의 분리 상태 문서화
- [x] 배포 후 실제 반영 확인 체크리스트 작성
- [x] 캐시/파비콘/HTML 메타 반영 확인 절차 정리

## Phase 11. 성능/번들 정리 [완료]

- [x] 번들 500kB 경고 원인 파악
- [x] 큰 정적 문자열이 JS 번들에 미치는 영향 분석
- [x] 코드 스플리팅 적용 (`gua`, `yao`, `soul`, `vendor` 분리)
- [x] 아이콘/메타 로딩 구조 정리
- [x] 현재 단계에서 추가 lazy loading은 보류하고 문서화

## Phase 12. 데이터 소스 관리 체계 정리 [완료]

- [x] `convert_data.cjs` 사용 흐름 문서화
- [x] txt 수정 후 재생성 절차 문서화
- [x] `src/data/*.ts`를 생성물로 취급하는 규칙 문서화
- [x] 원문 검증용 동기화 검사 스크립트 추가 (`npm run check:data`)

## 최종 검증 [완료]

- [x] `npm run build`
- [x] `npm test -- --run`
- [x] `npm run check:data`
- [x] `npm run check:encoding`
