# Current Task
- Active: enlarge the header commentary segmented control slightly so the primary mode switch reads more clearly.

# Route
- Route A
- Reason: this is a tight single-component header sizing tweak with one directly related test file.

# Writer Slot
- main: updating the header segmented control directly

# Contract Freeze
- Goal: make the `효사 / 괘사 / 영혼` segmented control slightly larger without changing its overall tone or layout role.
- Non-goals: do not redesign the header, do not alter commentary switching behavior, and do not change date controls.
- Write sets:
  - main: `STATE.md`, `src/components/Header.tsx`, `src/components/Header.test.tsx`
- Acceptance criteria:
  - each segmented option has visibly larger text and hit area.
  - the control still fits the current header layout.
  - focused verification passes.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-13: re-scoped the task to enlarge the header commentary segmented control.
