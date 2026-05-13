# Current Task
- Active: normalize soul date labels so every range consistently includes `일` and uses the same month/day pattern.

# Route
- Route A
- Reason: this is a tight single-component formatting fix with one directly related test file.

# Writer Slot
- main: updating the soul date formatting directly

# Contract Freeze
- Goal: format soul date ranges as `47주(2월 23일-3월 1일)` and `6주(5월 12일-18일)` style consistently.
- Non-goals: do not change soul section selection, do not redesign layout, and do not alter yao/gua commentary behavior.
- Write sets:
  - main: `STATE.md`, `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- Acceptance criteria:
  - cross-month ranges render as `2월 23일-3월 1일`.
  - same-month ranges render as `5월 12일-18일`.
  - combined week labels use the same normalized format.
  - focused verification passes.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-13: re-scoped the task to normalize soul date label formatting.
