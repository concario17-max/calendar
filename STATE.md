# Current Task
- Active: small UI hotfix in the main shell: remove the stray banner directly under the header without changing reading behavior.

# Route
- Route A
- Reason: this is a single-file hotfix in the shell layout with no new shared assets, no new state paths, and no reviewer fan-out required.

# Writer Slot
- main: single-write lane for the hotfix

# Contract Freeze
- Goal: remove the banner under the header while preserving all other reading behavior.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not do unrelated visual redesign
- Write sets:
  - main:
    - `src/components/MainContent.tsx`
    - `STATE.md`
- Acceptance criteria:
  - the banner below the header is removed
  - no reading behavior changes
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - this is a one-file hotfix and does not require worker fan-out or reviewer coordination.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-22: reclassified as Route A hotfix to remove the header-adjacent banner from MainContent.
