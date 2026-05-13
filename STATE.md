# Current Task
- Active: reshape the soul panel so it renders on the same commentary canvas rhythm as the yao/gua panels.

# Route
- Route A
- Reason: this is a contained presentation refactor centered on the soul panel component with one directly related test file.

# Writer Slot
- main: updating the soul commentary presentation directly

# Contract Freeze
- Goal: make the soul panel feel like the same right-side commentary document as the yao/gua panels by aligning header row, title/body rhythm, width, and divider usage.
- Non-goals: do not change soul data selection logic, do not alter left-rail content, and do not redesign yao/gua commentary behavior.
- Write sets:
  - main: `STATE.md`, `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- Acceptance criteria:
  - the soul panel header row visually matches the yao/gua commentary header row.
  - the soul title and verse body share the same max-width canvas rhythm as the commentary content.
  - nested soul cards are removed or flattened so the panel reads as one document canvas rather than cards inside cards.
  - corrupted soul badge/empty/date strings are restored to readable text.
  - focused verification passes.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-13: re-scoped the task to align the soul panel with the shared commentary canvas system.
