# Current Task
- Active: frontend quality refactor pass (P1/P2 scope): remove duplicated view logic, extract shared UI primitives, separate page/render from commentary parsing logic, reduce redundant state/render paths, and verify bundle/build quality without changing behavior.

# Route
- Route B
- Reason: this pass crosses shared UI primitives, heavy feature components, hook-level state boundaries, and test coverage across multiple files/directories, so implementation must be parallelized and reviewed.

# Writer Slot
- main: planner-only for `STATE.md` and `MULTI_AGENT_LOG.md`
- worker_ui_shared: shared UI/component extraction and integration
- worker_logic_perf: hook/util refactor and redundant-state/render cleanup
- reviewer: pending

# Contract Freeze
- Goal: improve code quality in priority order (dedupe/extract/separate/remove redundant state/reduce rerender/image+bundle checks), keep existing runtime behavior, and finish with lint/test/build verification.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not do unrelated visual redesign
- Write sets:
  - worker_ui_shared:
    - `src/components/shared/CommentaryFrame.tsx` (new)
    - `src/components/shared/SurfaceStateCard.tsx` (new)
    - `src/components/IChingSection.tsx`
    - `src/components/SoulCalendarSection.tsx`
    - `src/components/IChingSection.test.tsx`
    - `src/components/SoulCalendarSection.test.tsx`
  - worker_logic_perf:
    - `src/utils/commentaryParser.ts` (new)
    - `src/utils/learningImage.ts` (new)
    - `src/hooks/useCalendarLogic.ts`
    - `src/utils/readingDataLoader.ts`
    - `src/components/MainContent.tsx`
    - `src/components/DatePicker.tsx`
    - `src/hooks/useCalendarLogic.test.ts`
  - main:
    - `STATE.md`
    - `MULTI_AGENT_LOG.md`
    - `ERROR_LOG.md` (only if needed by execution errors)
- Acceptance criteria:
  - duplicated commentary surface/state UI is extracted and reused
  - parsing/image-loader logic is moved out of page components into utils
  - redundant state/render paths are reduced without behavior change
  - image rendering uses existing optimization-friendly attributes and avoids regressions
  - bundle output is checked and reported
  - `npm.cmd run lint`, `npm.cmd run test -- --run`, `npm.cmd run build` pass
- Why this is Route B:
  - this touches shared and feature code across multiple directories and requires parallel slices plus reviewer pass.

# Reviewer
- reviewer: main self-review
- reviewer focus:
  - behavior parity on reading flows
  - extraction quality and type safety
  - no regressions in accessibility and data loading behavior

# Last Update
- 2026-05-22: worker_logic_perf refactor completed for commentary parsing, learning image loader extraction, and reading-data caching; targeted tests, lint, and build passed.
