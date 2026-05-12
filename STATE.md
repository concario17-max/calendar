# Current Task
- Active: split the soul panel into a distinct title block and body block, matching the separated title/body rhythm used elsewhere in the right panel.

# Route
- Route A
- Reason: this is a tight single-slice UI refinement limited to one component and its tests, with straightforward verification.

# Writer Slot
- main: implementing the soul canvas width adjustment directly

# Contract Freeze
- Goal: keep the existing soul content and centered canvas, but separate the soul top label, soul title, and soul body into distinct visual layers.
- Non-goals: do not change soul text content, week formatting logic, commentary parsing, date logic, or routing.
- Write sets:
  - main: `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- Acceptance criteria:
  - The soul top label, title area, and body area are visually separated.
  - Existing soul content remains unchanged apart from layout/presentation.
  - Existing targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-12: re-froze the task around separating the soul title block from the soul body block.
