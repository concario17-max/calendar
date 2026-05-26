# Current Task
- Active: add a bit more breathing room above the commentary heading on gua/yao pages.

# Route
- Route A
- Reason: this is a small presentational tweak in one feature component with no new state paths or reviewer fan-out required.

# Writer Slot
- main: single-write lane for the spacing tweak

# Contract Freeze
- Goal: give the commentary heading a little more top spacing so it does not feel cramped.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not redesign the reading card beyond adjusting vertical spacing around the heading
- Write sets:
  - main:
    - `src/components/IChingSection.tsx`
    - `STATE.md`
- Acceptance criteria:
  - the commentary heading has a little more breathing room above it
  - the gua/yao page still renders the same content and controls
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - this is a small layout-only tweak in one feature component and does not need reviewer coordination.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-26: re-scoped to open up the commentary heading spacing.
