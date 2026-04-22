# Current Task
- Completed: restore the soul panel to the 76c6695 layout while keeping the rest of the right-side canvas unchanged.

# Route
- Route B
- Reason: the soul panel render is shared between `IChingSection.tsx` and `SoulCalendarSection.tsx`, so changing only one file would drift the layout and tests.

# Writer Slot
- main: planner only
- worker-soul-rollback: idle
- worker-review: idle

# Contract Freeze
- Goal: restore the soul panel to the 76c6695 styling and structure, including the shared rendering path and decorative shell, while keeping the rest of the right-side canvas unchanged.
- Non-goals: do not change data registries, left-rail layout, selection behavior, or the wording/content of the soul text.
- Write sets:
  - worker-soul-rollback: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- Acceptance criteria:
  - The soul panel matches the 76c6695 shell/chrome behavior again.
  - `IChingSection` and `SoulCalendarSection` stay in sync for the soul view.
  - Targeted tests and build continue to pass.

# Reviewer
- reviewer-soul-rollback: soul panel rollback review

# Last Update
- 2026-04-22: restored the soul panel to the 76c6695 layout while keeping the rest of the right-side canvas unchanged.
