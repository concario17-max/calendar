# Current Task
- Active: small UI hotfix in the right reading panel: reduce the top whitespace above the Today reading area by tightening panel padding and card padding.

# Route
- Route A
- Reason: this is a small layout-only hotfix with no shared asset changes, no new state paths, and no reviewer fan-out required.

# Writer Slot
- main: single-write lane for the hotfix

# Contract Freeze
- Goal: reduce the visible whitespace above the right-panel reading content while preserving all other behavior.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not do unrelated visual redesign
- Write sets:
  - main:
    - `src/components/IChingSection.tsx`
    - `src/components/shared/CommentaryFrame.tsx`
    - `src/components/shared/SurfaceStateCard.tsx`
    - `src/index.css`
    - `STATE.md`
- Acceptance criteria:
  - right-panel top whitespace is reduced
  - no behavior changes elsewhere
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - this is a small hotfix in a tight set of layout files and does not require worker fan-out or reviewer coordination.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-22: reclassified as Route A hotfix to tighten right-panel reading spacing.
