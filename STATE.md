# Current Task
- Active: connect `image` folder learning images to the matching 효사/괘사 commentary slots.

# Route
- Route A
- Reason: this is a tight single-slice implementation touching one feature component plus its test file, with one targeted verification path.

# Writer Slot
- main: implementing the image-slot mapping directly

# Contract Freeze
- Goal: load matching learning images from `image/효사` and `image/괘사` into the existing 학습 만화 slot for the current commentary selection.
- Non-goals: do not change commentary parsing rules, date logic, routing, or the soul panel behavior.
- Write sets:
  - main: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - 효사 commentary uses matching files from `image/효사/<번호>.*` when present.
  - 괘사 commentary uses matching files from `image/괘사/<번호>.*` when present.
  - When no matching image exists, the current placeholder-style empty message remains visible.
  - Existing targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-11: reclassified the task for learning-image slot integration as Route A.
