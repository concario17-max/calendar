# Current Task
- Active: make the soul panel header read as a distinct top identifier layer, matching the separation style used by 오늘의 효사/오늘의 괘사.

# Route
- Route A
- Reason: this is a tight single-slice UI refinement limited to one component and its tests, with straightforward verification.

# Writer Slot
- main: implementing the soul canvas width adjustment directly

# Contract Freeze
- Goal: keep the existing soul content and centered canvas, but make the soul top label area feel visually separated from the body with the same kind of header distinction used by the 효사/괘사 commentary sections.
- Non-goals: do not change soul text content, week formatting logic, commentary parsing, date logic, or routing.
- Write sets:
  - main: `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- Acceptance criteria:
  - The soul top label area is visually separated from the body like the 효사/괘사 commentary headers.
  - Existing soul content structure remains unchanged apart from header presentation.
  - Existing targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-11: re-froze the task around making the soul header read as a distinct identifier layer above the body.
