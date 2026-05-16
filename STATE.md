# Current Task
- Active: align the bonus-day tests with the raw `bonusGuaItems` / `bonusYaoItems` contract so regular dates stay unchanged and bonus-day source selection is covered without preview assumptions.

# Route
- Route B
- Reason: this is still a multi-file UI integration on top of the already-frozen bonus contract and must stay isolated from the in-progress header extraction files already present in the worktree.

# Writer Slot
- main: planner-only; may edit `STATE.md` only
- worker_logic: owns bonus data/types/hook wiring
- worker_ui: owns main UI integration for bonus-day selection and rendering
- worker_tests: owns test updates for bonus-day behavior

# Contract Freeze
- Goal: add a reusable bonus-day system for `4-2~4-6` that exposes only the raw bonus day record plus gua/yao item arrays, while regular dates keep their current behavior unchanged.
- Non-goals:
  - do not redesign the header
  - do not alter the existing regular-date numbering rules
  - do not touch unrelated in-progress header extraction files (`src/components/Header.tsx`, `src/components/Header.test.tsx`, `src/components/CommentaryModeTabs.tsx`, `ERROR_LOG.md`)
  - do not add browser verification
- Write sets:
  - main: `STATE.md`
  - worker_logic: `src/data/bonusReadings.ts`, `src/types/index.ts`, `src/hooks/useCalendarLogic.ts`
  - worker_ui: `src/App.tsx`, `src/components/MainContent.tsx`, `src/components/IChingSection.tsx`
  - worker_tests: `src/hooks/useCalendarLogic.test.ts`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - bonus data exists for null dates via a dedicated data structure keyed by month/day
  - regular dates keep their current behavior unchanged
  - bonus dates expose `isBonusDay`, `bonusDay`, `bonusGuaItems`, and `bonusYaoItems`
  - tests and UI can consume the raw arrays without a preview or pairing layer
- Why the write split is safe:
  - data/hook changes are isolated from rendering files
  - UI integration can consume the raw bonus contract without extra helper layers
  - tests can be updated independently once the contract settles

# Reviewer
- reviewer: review the bonus-day integration for regressions in regular-day rendering and bonus contract shape

# Last Update
- 2026-05-16: removed the legacy bonus preview/pairing leftovers, wired active bonus lists through the UI, and confirmed `npm.cmd run build` passes.
