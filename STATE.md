# Current Task
- Active: make the default right-panel view for 효사/괘사 open in 학습만화 mode, while keeping 영혼 in text mode.

# Route
- Route A
- Reason: this is a tight UI state-default refinement contained to one component plus its targeted tests.

# Writer Slot
- main: updating the default commentary view-mode behavior directly

# Contract Freeze
- Goal: when the user is in 효사 or 괘사 commentary, the right panel should open in comic mode by default; soul should continue to open in text mode.
- Non-goals: do not redesign the panel layout, do not change comic asset loading rules, and do not touch unrelated data files.
- Write sets:
  - main: `STATE.md`, `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - 효사/괘사 commentary defaults to comic mode.
  - 영혼 remains text-first.
  - Existing toggle still switches between comic/text views.
  - Targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-13: re-scoped the task from always-visible comic toggles to comic-first defaults for 효사/괘사.
