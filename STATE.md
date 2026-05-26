# Current Task
- Active: redesign the mobile header into a smaller, cleaner two-row layout.

# Route
- Route A
- Reason: this is a small presentational tweak in one feature component with no new state paths or reviewer fan-out required.

# Writer Slot
- main: single-write lane for the mobile header tweak

# Contract Freeze
- Goal: make the mobile header visually smaller and less cramped while keeping the same controls.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not redesign the header beyond a mobile-only layout compression
- Write sets:
  - main:
    - `src/components/Header.tsx`
    - `STATE.md`
- Acceptance criteria:
  - the mobile header feels smaller and less crowded
  - the desktop header remains visually close to the current layout
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - this is a small layout-only tweak in one feature component and does not need reviewer coordination.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-26: re-scoped to compress the mobile header into a cleaner two-row layout.
