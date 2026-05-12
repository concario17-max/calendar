# Current Task
- Active: separate the soul panel into a label row, a dedicated title block, and a distinct body block, matching the title/body rhythm of the other right-panel sections.

# Route
- Route A
- Reason: this is a tight single-slice UI refinement limited to one component and its tests, with straightforward verification.

# Writer Slot
- main: implementing the soul canvas width adjustment directly

# Contract Freeze
- Goal: keep the existing soul content and centered canvas, but present the soul panel as three layers: label row, title block, and body block.
- Non-goals: do not change soul text content, week formatting logic, commentary parsing, date logic, or routing.
- Write sets:
  - main: `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- Acceptance criteria:
  - The soul label row, title block, and body block are visually separated.
  - Existing soul content remains unchanged apart from layout/presentation.
  - Existing targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-12: re-froze the task around separating the soul label, title, and body layers.
