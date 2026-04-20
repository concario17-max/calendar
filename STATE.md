# Current Task
- In progress: reduce the perceived narrowness by loosening the internal paddings, row heights, and content width clamps in the reading layout so the panels read wider without changing behavior.

# Route
- Route B
- Reason: the remaining implementation touches multiple layout and test files, so the scope is still multi-file and needs reviewer coverage.

# Writer Slot
- main: planner only
- worker-shell: completed/reverted
- worker-panel: `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`

# Contract Freeze
- Goal: make the reading layout feel wider by reducing internal padding, fixed row height pressure, and narrow content clamps rather than changing the overall shell width.
- Non-goals: no data changes, no commentary registry changes, no behavior changes.
- Acceptance criteria:
  - The shell width stays functionally the same.
  - The left and right panels keep their overall alignment and sticky/scroll behavior.
  - The top rows, sigil block, and text clamps use looser spacing so the layout reads less cramped.
  - The tests reflect the current soul label formatting and widened panel spacing.
  - No data changes, no commentary registry changes, and no behavior changes.

# Reviewer
- reviewer-space: layout spacing regression review

# Last Update
- 2026-04-19: route restored to Route B after test alignment and panel spacing changes
