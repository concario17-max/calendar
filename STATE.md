# Current Task
- Active: completed the `보너스` source-of-truth integration for bonus-day commentary text and bonus comic image folders, replacing the prior hardcoded bonus-only contract.

# Route
- Route B
- Reason: this changes shared data generation/loading, runtime hook logic, bonus commentary selection, asset loading, and tests across multiple files, while needing to stay isolated from unrelated in-progress header extraction files.

# Writer Slot
- main: planner-only; may edit `STATE.md` only
- worker_data: owns bonus source extraction/loading, generated bonus commentary data, and type updates
- worker_ui: owns bonus image loading and commentary selection integration in the UI
- worker_tests: owns test updates for the real bonus-source pipeline

# Contract Freeze
- Goal: make the bonus-day system use the `보너스` folder as source-of-truth for bonus commentary text and bonus comic images, while keeping regular-date behavior unchanged.
- Non-goals:
  - do not redesign the header
  - do not alter the existing regular-date numbering rules
  - do not touch unrelated in-progress header extraction files (`src/components/Header.tsx`, `src/components/Header.test.tsx`, `src/components/CommentaryModeTabs.tsx`, `ERROR_LOG.md`)
  - do not add browser verification
- Write sets:
  - main: `STATE.md`
  - worker_data: `scripts/extract_commentary.py`, `src/data/bonusReadings.ts`, `src/data/bonusGuaCommentary.ts`, `src/data/bonusYaoCommentary.ts`, `src/data/index.ts`, `src/types/index.ts`, `src/hooks/useCalendarLogic.ts`
  - worker_ui: `src/App.tsx`, `src/components/MainContent.tsx`, `src/components/IChingSection.tsx`
  - worker_tests: `src/hooks/useCalendarLogic.test.ts`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - bonus text/commentary is derived from actual `보너스` source files rather than only hardcoded arrays
  - bonus comic images load from `보너스/괘사` and `보너스/효사` for bonus-day selections
  - bonus day uses the real source numbering from the bonus files (`괘사 1..4`, `효사 1..24` unless parsing proves otherwise)
  - regular dates still use the existing `image/괘사`, `image/효사`, and regular commentary flows unchanged
  - build and the relevant tests pass
- Why the write split is safe:
  - extraction/generation changes are isolated from rendering files
  - UI wiring can consume the updated bonus commentary/image contract without editing generation logic
  - tests can validate the integrated pipeline after data and UI workers settle

# Reviewer
- reviewer: review the bonus-source integration for regressions in regular-day rendering, bonus-day commentary/image sourcing, and test sufficiency

# Last Update
- 2026-05-16: completed the bonus-source integration, verified extractor regeneration plus targeted tests/build, and kept regular-date commentary/image flows unchanged.
