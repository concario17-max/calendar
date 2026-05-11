# Current Task
- Active: unify every 효사/괘사 commentary block, including tables, lists, and keyword boxes, onto the same centered `max-w-[52rem]` canvas.

# Route
- Route A
- Reason: this remains a tight single-slice UI change limited to one feature component and its tests, with the same targeted verification path.

# Writer Slot
- main: implementing the commentary canvas width adjustment directly

# Contract Freeze
- Goal: keep the existing comic toggle behavior, and make the full 효사/괘사 commentary stack use one centered `max-w-[52rem]` reading canvas, including tables, lists, and keyword boxes.
- Non-goals: do not change commentary parsing rules, date logic, routing, or the soul panel behavior.
- Write sets:
  - main: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - 효사/괘사 tables, lists, keyword boxes, headings, and paragraphs all use the same centered `max-w-[52rem]` canvas.
  - Existing comic toggle behavior remains unchanged.
  - Existing targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-11: re-froze the task around making the full 효사/괘사 commentary stack share one centered `max-w-[52rem]` canvas.
