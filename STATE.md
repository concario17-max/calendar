# Current Task
- Active: small UI hotfix in the learning comic viewer: remove the inner comic surface so only the outer card frame remains.

# Route
- Route A
- Reason: this is a small visual tweak in a single feature component with no shared asset changes, no new state paths, and no reviewer fan-out required.

# Writer Slot
- main: single-write lane for the hotfix

# Contract Freeze
- Goal: remove the inner comic surface styling so only the outer learning-comic card frame remains, while preserving all other behavior.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not redesign the reading panel beyond removing the inner comic surface styling
- Write sets:
  - main:
    - `src/components/IChingSection.tsx`
    - `STATE.md`
- Acceptance criteria:
  - the learning comic no longer shows the inner comic surface/frame
  - no behavior changes elsewhere
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - this is a small hotfix in a tight slice and does not require worker fan-out or reviewer coordination.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-22: reclassified as Route A hotfix to remove the inner comic surface styling.
