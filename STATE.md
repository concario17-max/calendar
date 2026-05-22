# Current Task
- Active: frontend quality refactor pass completed; duplicated view wrappers were extracted, parsing/image-loader logic moved to utils, redundant loading path was reduced via cache, and all verification gates passed without behavior changes.

# Route
- Route B
- Reason: this pass crosses shared UI primitives, heavy feature components, hook-level state boundaries, and test coverage across multiple files/directories, so implementation must be parallelized and reviewed.

# Writer Slot
- main: planner-only for `STATE.md` and `MULTI_AGENT_LOG.md`
- worker_ui_shared: completed
- worker_logic_perf: completed
- reviewer: completed (fallback default agent review due reviewer model-capacity errors)

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
- reviewer: fallback default-agent review completed
- reviewer focus:
  - behavior parity on reading flows
  - extraction quality and type safety
  - no regressions in accessibility and data loading behavior

# Last Update
- 2026-05-22: Route B refactor completed with shared UI extraction, util separation, cache optimization, reviewer pass, and full lint/test/build verification.
