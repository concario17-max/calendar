# Current Task
- Active: make the mobile learning comic view effectively frameless by removing the remaining wrapper padding so only the image is shown.

# Route
- Route A
- Reason: this is a tight single-component presentation tweak with one directly related test file.

# Writer Slot
- main: updating the comic view presentation directly

# Contract Freeze
- Goal: on mobile widths, learning comic images should use the full commentary width by removing the remaining wrapper padding around the image.
- Non-goals: do not alter desktop comic presentation, do not change comic-loading behavior, and do not redesign commentary text views.
- Write sets:
  - main: `STATE.md`, `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - mobile comic view no longer adds decorative borders/lines around the image.
  - mobile wrapper padding is effectively removed so the image fills the available canvas.
  - desktop comic view styling remains intact.
  - relevant automated verification passes.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-13: re-scoped the task from stacked-layout scroll recovery to mobile comic canvas enlargement.
