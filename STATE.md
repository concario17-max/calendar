# Current Task
- Active: restore the empty-comic fallback so commentary text still renders when the leaf-loaded reading data has no comic image.

# Route
- Route B
- Reason: the scope now spans a feature-file render fix plus the matching hook/component test updates after the lazy-load refactor.

# Writer Slot
- main: planner-only for STATE and log updates
- feature_tests: write lane for `src/hooks/useCalendarLogic.test.ts` and `src/components/IChingSection.test.tsx`
- feature_feature_render: write lane for `src/components/IChingSection.tsx` only for the empty-comic fallback restore

# Contract Freeze
- Goal: keep the visible behavior unchanged while restoring commentary text rendering in the empty-comic fallback after the leaf-module lazy-load path.
- Non-goals:
  - do not add new libraries
  - do not change reading/content semantics
  - do not touch shell/accessibility files
- Write sets:
  - feature_tests: `src/hooks/useCalendarLogic.test.ts`
  - feature_tests: `src/components/IChingSection.test.tsx`
  - feature_feature_render: `src/components/IChingSection.tsx`
  - main: `STATE.md`
  - main: `MULTI_AGENT_LOG.md`
- Acceptance criteria:
  - tests mock the new `../utils/readingDataLoader` helper instead of the old barrel path
  - hook/component behavior stays the same after async leaf-module resolution
  - empty comic state still renders commentary text blocks
  - `npm.cmd run lint`, `npm.cmd run test -- --run src/hooks/useCalendarLogic.test.ts src/components/IChingSection.test.tsx`, and `npm.cmd run build` pass
- Why the write split is safe:
  - this is a narrow render fallback fix plus test alignment slice; the shared loader implementation stays untouched

# Reviewer
- reviewer: pending for the shared-data test alignment slice
- reviewer focus:
  - async leaf-module expectation parity for hook/component tests
  - empty comic fallback still exposes commentary text

# Last Update
- 2026-05-21: empty comic fallback restored so commentary text still renders when the comic image is missing.
