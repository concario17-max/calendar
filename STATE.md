# Current Task
- Active: remove the last outer commentary-card border on mobile comic mode so only the comic image remains visible.

# Route
- Route A
- Reason: this is a tight single-component presentation tweak with one directly related test file.

# Writer Slot
- main: updating the comic view presentation directly

# Contract Freeze
- Goal: on mobile widths, learning comic mode should also drop the outer folio border/background so the image appears directly on the canvas.
- Non-goals: do not alter desktop comic presentation, do not change comic-loading behavior, and do not redesign commentary text views.
- Write sets:
  - main: `STATE.md`, `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - mobile comic view no longer adds decorative borders/lines around the image.
  - mobile wrapper padding is effectively removed so the image fills the available canvas.
  - the outer folio border/background is also removed on mobile comic mode.
  - desktop comic view styling remains intact.
  - relevant automated verification passes.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-13: re-scoped the task from stacked-layout scroll recovery to mobile comic canvas enlargement.
