# Current Task
- Active: move the right-panel previous/next arrows up into the top title/tab row so they no longer float over the body content.

# Route
- Route A
- Reason: this is a small layout tweak in one feature component with no new state paths or reviewer fan-out required.

# Writer Slot
- main: single-write lane for the hotfix

# Contract Freeze
- Goal: place the right-panel previous/next arrows on the right side of the top title/tab row and remove the body-overlay placement.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not redesign the reading panel beyond moving the arrows into the header row
- Write sets:
  - main:
    - `src/components/IChingSection.tsx`
    - `STATE.md`
- Acceptance criteria:
  - the arrows live in the top title/tab row instead of floating over the body
  - the body no longer has the overlay arrows in its reading area
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - this is a small layout-only tweak with no feature split or reviewer coordination.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-23: re-scoped to move the right-panel arrows into the header/tab row.
