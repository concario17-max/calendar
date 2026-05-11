# Current Task
- Active: move learning-image access into the 효사/괘사 commentary header and switch the full lower commentary area between text and comic view.

# Route
- Route A
- Reason: this remains a tight single-slice UI change limited to one feature component and its tests, with the same targeted verification path.

# Writer Slot
- main: implementing the image-slot mapping directly

# Contract Freeze
- Goal: show a learning-comic icon beside `오늘의 효사` / `오늘의 괘사` when a matching image exists, and let it replace the full lower commentary content with the comic image view.
- Non-goals: do not change commentary parsing rules, date logic, routing, or the soul panel behavior.
- Write sets:
  - main: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - 효사/괘사 header shows a comic toggle only when a matching learning image exists.
  - Toggling the icon swaps the lower commentary folio between text mode and comic image mode.
  - When no matching image exists, the comic toggle stays hidden and text mode remains unchanged.
  - Existing targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-11: re-froze the task around commentary header comic-mode switching for 효사/괘사.
