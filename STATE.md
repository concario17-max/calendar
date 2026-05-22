# Current Task
- Active: small UI hotfix in the header: fix the corrupted Korean label for the Today button without changing behavior.

# Route
- Route A
- Reason: this is a single-file hotfix in the header with no shared asset changes, no new state paths, and no reviewer fan-out required.

# Writer Slot
- main: single-write lane for the hotfix

# Contract Freeze
- Goal: fix the corrupted Korean label on the Today button while preserving all other behavior.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not do unrelated visual redesign
- Write sets:
  - main:
    - `src/components/Header.tsx`
    - `STATE.md`
- Acceptance criteria:
  - the Today button label renders correctly in Korean
  - no behavior changes elsewhere
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - this is a one-file hotfix and does not require worker fan-out or reviewer coordination.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-22: reclassified as Route A hotfix to fix the corrupted Today button label in the header.
