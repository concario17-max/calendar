# Current Task
- Completed: make the mobile header wrap safely on narrow screens so the restored date navigation does not overflow.

# Route
- Route B
- Reason: the narrow-screen header fix touches the shared header chrome and its test after the mobile restore introduced a layout regression.

# Writer Slot
- main: planner only
- worker-mobile-header-wrap: idle
- worker-review: idle

# Contract Freeze
- Goal: keep mobile date navigation visible while allowing the header controls to wrap or stack safely on very narrow screens.
- Non-goals: do not change data registries, the wording of the content, or the desktop header layout.
- Write sets:
  - worker-mobile-header-wrap: `src/components/Header.tsx`, `src/components/Header.test.tsx`
- Acceptance criteria:
  - Mobile header controls do not overflow on narrow screens.
  - Date navigation remains visible and usable.
  - Desktop header behavior stays unchanged.
  - Targeted tests and build continue to pass.

# Reviewer
- reviewer-mobile-header-wrap: mobile header wrap review

# Last Update
- 2026-04-22: made the mobile header controls wrap safely on narrow screens without changing desktop behavior.
