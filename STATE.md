# Current Task
- Active: remove the right-panel header bar from the soul page so only the soul content remains.

# Route
- Route A
- Reason: this is a small conditional-render tweak in one feature component with no new state paths or reviewer fan-out required.

# Writer Slot
- main: single-write lane for the hotfix

# Contract Freeze
- Goal: hide the right-panel top header bar entirely when `commentarySource === 'soul'`.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not redesign the reading panel beyond hiding the soul-page header bar
- Write sets:
  - main:
    - `src/components/IChingSection.tsx`
    - `STATE.md`
- Acceptance criteria:
  - the soul page does not render the top header bar
  - the other commentary modes keep their current header controls
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - this is a small layout-only tweak with no feature split or reviewer coordination.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-26: re-scoped to remove the soul-page header bar.
