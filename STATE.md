# Current Task
- Completed: make the mobile header render as two clean rows, with the title on the first line and the controls on the second line.

# Route
- Route B
- Reason: the mobile header change touches shared header chrome and its test, and it modifies the compact mobile layout again.

# Writer Slot
- main: planner only
- worker-mobile-header-rows: idle
- worker-review: idle

# Contract Freeze
- Goal: keep desktop header behavior unchanged while making the mobile header stack into a title row and a controls row.
- Non-goals: do not change data registries, the wording of the content, or the reading panels.
- Write sets:
  - worker-mobile-header-rows: `src/components/Header.tsx`, `src/components/Header.test.tsx`
- Acceptance criteria:
  - Mobile header shows the title on the first row.
  - Mobile header shows the controls on the second row.
  - Desktop header layout remains unchanged.
  - Targeted tests and build continue to pass.

# Reviewer
- reviewer-mobile-header-rows: mobile header rows review

# Last Update
- 2026-04-22: mobile header now renders as two clean rows with the title on top and the controls underneath.
