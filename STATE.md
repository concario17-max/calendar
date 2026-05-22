# Current Task
- Active: small UI hotfix in the commentary comic toggle: enlarge the right-panel comic toggle button so it reads as a proper control again.

# Route
- Route A
- Reason: this is a small layout-only hotfix in a single feature component with no shared asset changes, no new state paths, and no reviewer fan-out required.

# Writer Slot
- main: single-write lane for the hotfix

# Contract Freeze
- Goal: enlarge the commentary comic toggle button so it is easier to notice and tap, while preserving all other behavior.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not do unrelated visual redesign
- Write sets:
  - main:
    - `src/components/IChingSection.tsx`
    - `STATE.md`
- Acceptance criteria:
  - the commentary comic toggle button is visually larger and clearer
  - no behavior changes elsewhere
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - this is a small hotfix in a tight slice and does not require worker fan-out or reviewer coordination.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-22: reclassified as Route A hotfix to enlarge the commentary comic toggle button.
