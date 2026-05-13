# Current Task
- Active: remove the dark-mode icon from the header while keeping the remaining header controls intact.

# Route
- Route A
- Reason: this is a tight header-control cleanup contained to one component plus the directly affected tests.

# Writer Slot
- main: updating the header control layout directly

# Contract Freeze
- Goal: remove the dark-mode toggle button from the header UI and keep the date picker, Today button, and commentary selector working as-is.
- Non-goals: do not redesign the broader header layout, do not remove theme styles from the app, and do not touch unrelated feature components.
- Write sets:
  - main: `STATE.md`, `src/components/Header.tsx`, `src/components/Header.test.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - the header no longer renders the dark-mode icon button.
  - existing header/date/commentary controls remain present.
  - targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-13: re-scoped the task from 효사 comic asset sync to header dark-mode toggle removal.
