# Current Task
- Active: small UI hotfix in the header: tighten the top/bottom spacing so the header feels less airy while preserving its current structure.

# Route
- Route A
- Reason: this is a small layout-only hotfix in a single feature component with no shared asset changes, no new state paths, and no reviewer fan-out required.

# Writer Slot
- main: single-write lane for the hotfix

# Contract Freeze
- Goal: reduce the header's vertical padding slightly so it feels tighter and more premium, while preserving all other behavior.
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
  - the header vertical spacing is slightly tighter
  - no behavior changes elsewhere
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - this is a small hotfix in a tight slice and does not require worker fan-out or reviewer coordination.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-22: reclassified as Route A hotfix to tighten the header vertical spacing.
