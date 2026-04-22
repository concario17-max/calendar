# Current Task
- Completed: fix the mobile panel layout so the reading area stacks cleanly below the mobile breakpoint without the cramped split behavior.

# Route
- Route B
- Reason: the mobile fix still spans multiple shared reading-panel files and tests, even after narrowing the scope to the reading panels only.

# Writer Slot
- main: planner only
- worker-mobile-panels: idle
- worker-review: idle

# Contract Freeze
- Goal: make the mobile reading panels readable and non-cramped by switching the reading area to a clean stacked layout below the mobile breakpoint.
- Non-goals: do not change data registries, the wording of the content, or the desktop two-column layout beyond the mobile breakpoint.
- Write sets:
  - worker-mobile-panels: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- Acceptance criteria:
  - Mobile does not show the cramped two-column reading split.
  - Reading panels stack cleanly on narrow widths.
  - Desktop two-column shell remains intact above the mobile breakpoint.
  - Targeted tests and build continue to pass.

# Reviewer
- reviewer-mobile-layout: mobile layout review

# Last Update
- 2026-04-22: made the mobile reading panels stack cleanly below the breakpoint and compacted the header chrome for small screens.
