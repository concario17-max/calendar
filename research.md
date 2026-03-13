# Research Report: Build and UI Analysis

## 1. 개요 (Overview)
최근 작업 이후 애플리케이션의 핵심 데이터 인코딩이 파손되고, 이미지 자산 경로가 일치하지 않아 UI가 정상적으로 표시되지 않는 상태(사용자 표현: "개판 났는데")입니다. 본 보고서는 이러한 문제의 상세 원인과 해결 방안을 분석합니다.

## 2. 주요 문제점 (Key Issues)

### A. 텍스트 인코딩 파손 (Encoding Corruption)
- **현상**: `src/data/guaData.ts`, `yaoData.ts` 등 핵심 데이터 파일의 한글 텍스트가 깨져서 표시됨 (Mojibake).
- **원인**: 이전 작업 중 파일 저장 혹은 읽기 과정에서 인코딩 불일치(UTF-8 vs CP949 등)가 발생하여 데이터 자체가 손상되었습니다.
- **영향**: 주요 점괘(Gua) 및 효(Yao)의 설명이 읽을 수 없는 상태입니다.

### B. 이미지 자산 경로 불일치 (Asset Path Mismatch)
- **현상**: `MainContent.tsx`에서 `/images/yao-x.png` 경로로 이미지를 호출하지만, 스크린샷에서 "sigil x"로 표시되는 엑박 현상 발생.
- **원인**: 실제 이미지 파일들이 프로젝트 루트의 `images/` 폴더에 위치해 있습니다. Vite 프로젝트에서는 정적 자산이 `public/images/` 아래에 있어야 브라우저에서 직접 접근 가능합니다.
- **영향**: 각 효(Yao)에 해당하는 상징 이미지가 표시되지 않습니다.

### C. UI 레이아웃 불일치 (UI Layout Discrepancy)
- **현상**: 사용자가 요청한 상단바 및 하단바의 최신 레이아웃이 정확히 반영되지 않았음.
- **사용자 요청 사항**:
    - **Header Left**: "Celestial Ephemeris" 타이틀 + Telescope 아이콘.
    - **Header Right**: `DatePicker` + `Today` 버튼 + 다크모드 토글 버튼 (순서대로 배치).
    - **Header 삭제**: 기존의 날짜 텍스트(`Friday, March 13, 2026` / `2026-03-13`) 완전 삭제.
    - **Footer 삭제**: 하단 바(`self_improvement`, `Sim-Sang Calendar` 등) 완전 삭제.

## 3. 해결 방안 (Proposed Solutions)

1. **데이터 복구**: 루트의 원본 텍스트 파일(`1.gua.txt`, `2.yao.txt`, `3.soul.txt`)을 기반으로 `src/data/*.ts` 파일을 UTF-8 인코딩으로 재생성합니다.
2. **자산 이동**: `images/` 폴더 내의 모든 파일을 `public/images/`로 이동합니다.
3. **UI 전면 재조정**:
    - `Header.tsx`의 레이아웃을 좌측 타이틀, 우측 컨트롤 영역으로 스왑합니다.
    - `DatePicker.tsx` 내부의 불필요한 날짜 텍스트 출력을 제거합니다.
    - `MainContent.tsx` 및 관련 파일에서 잔여 푸터 코드를 제거합니다.

## 4. 향후 방침 (Future Policy)
- 파일 저장 시 항상 UTF-8 인코딩을 강제합니다.
- `any` 혹은 `unknown` 타입을 배제하고 엄격한 타입 체크를 유지합니다.
- 모든 UI 변경 사항은 사용자가 제공한 스크린샷의 가이드라인을 최우선으로 준수합니다.
