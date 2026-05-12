# Current Task
- Active: make the soul top header row visually match the `오늘의 괘사` / `오늘의 효사` header row structure.

# Route
- Route A
- Reason: this is a tight single-slice UI refinement limited to one component and its tests, with straightforward verification.

# Writer Slot
- main: implementing the soul canvas width adjustment directly

# Contract Freeze
- Goal: keep the current soul content blocks, but make only the soul top header row match the other right-panel header rows in badge/icon structure and spacing.
- Non-goals: do not change soul text content, week formatting logic, commentary parsing, date logic, or routing.
- Write sets:
  - main: `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- Acceptance criteria:
  - The soul top header row matches the badge/icon rhythm of the 효사/괘사 header rows.
  - Existing soul content remains unchanged apart from header-row presentation.
  - Existing targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-12: re-froze the task around matching the soul top header row to the other commentary headers.
