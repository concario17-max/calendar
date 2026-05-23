# Current Task
- Active: move the right-panel day navigation arrows into a centered vertical rail beside the panel edge, and nudge the body inward so the arrows stay outside the content flow.

# Route
- Route A
- Reason: this is still a small layout-only tweak in one feature component plus its shared CSS, with no new state paths or reviewer fan-out required.

# Writer Slot
- main: single-write lane for the hotfix

# Contract Freeze
- Goal: place the right-panel previous/next arrows in a vertical rail at the panel edge and keep them out of the readable body area.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not redesign the reading panel beyond relocating the arrows and reserving rail space
- Write sets:
  - main:
    - `src/components/IChingSection.tsx`
    - `src/index.css`
    - `STATE.md`
- Acceptance criteria:
  - the arrows sit in a visible centered rail beside the right panel edge
  - the body content is nudged inward and no longer overlaps the arrows
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - this is a small layout hotfix in a tight slice and does not require worker fan-out or reviewer coordination.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-23: implemented the centered vertical rail for right-panel navigation and padded the body away from it.
