# Current Task
- Active: keep the learning-comic toggle visible for 괘사/효사 even when no comic image exists, and show an explicit empty-state panel in comic view.

# Route
- Route A
- Reason: this is a tight UI behavior refinement contained to one component plus its targeted tests.

# Writer Slot
- main: updating the commentary comic-toggle behavior directly

# Contract Freeze
- Goal: show the 학습만화 toggle for 괘사/효사 regardless of image availability, while rendering a graceful empty state when comic view has no image.
- Non-goals: do not change soul behavior, do not redesign unrelated commentary layout, and do not touch data files.
- Write sets:
  - main: `STATE.md`, `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - The comic toggle appears for both 괘사 and 효사 commentary modes even without an image.
  - Comic view with an existing image still renders the image.
  - Comic view without an image renders a clear empty-state message instead of silently staying in text mode.
  - Targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-13: re-scoped the task from asset sync to the comic-toggle visibility behavior.
