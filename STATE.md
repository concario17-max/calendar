# Current Task
- Active: enlarge learning comics on mobile by stripping decorative frame chrome and minimizing padding around the comic image.

# Route
- Route A
- Reason: this is a tight single-component presentation tweak with one directly related test file.

# Writer Slot
- main: updating the comic view presentation directly

# Contract Freeze
- Goal: on mobile widths, learning comic images should use more of the available width by removing borders/shadows and reducing padding around the image.
- Non-goals: do not alter desktop comic presentation, do not change comic-loading behavior, and do not redesign commentary text views.
- Write sets:
  - main: `STATE.md`, `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - mobile comic view no longer adds decorative borders/lines around the image.
  - mobile padding around the comic image is minimized so the image renders larger.
  - desktop comic view styling remains intact.
  - relevant automated verification passes.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-13: re-scoped the task from stacked-layout scroll recovery to mobile comic canvas enlargement.
