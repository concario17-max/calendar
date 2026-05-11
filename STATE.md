# Current Task
- Active: align 효사/괘사 text commentary with the comic view by centering the reading width on the same `max-w-[52rem]` canvas.

# Route
- Route A
- Reason: this remains a tight single-slice UI change limited to one feature component and its tests, with the same targeted verification path.

# Writer Slot
- main: implementing the commentary canvas width adjustment directly

# Contract Freeze
- Goal: keep the existing comic toggle behavior, but center the 효사/괘사 text reading area on the same `max-w-[52rem]` width used by the comic view for stronger visual unity.
- Non-goals: do not change commentary parsing rules, date logic, routing, or the soul panel behavior.
- Write sets:
  - main: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - 효사/괘사 text reading content uses the same centered `max-w-[52rem]` canvas as the comic image view.
  - Existing comic toggle behavior remains unchanged.
  - Existing targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-11: re-froze the task around unifying the text and comic reading canvas width for 효사/괘사.
