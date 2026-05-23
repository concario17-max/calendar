# Current Task
- Active: nudge the right-panel day navigation arrows a little farther outward so they sit at the body border line without covering the readable content.

# Route
- Route A
- Reason: this is a tiny layout adjustment in one feature slice plus shared CSS, with no new state paths or reviewer fan-out required.

# Writer Slot
- main: single-write lane for the hotfix

# Contract Freeze
- Goal: move the right-panel previous/next arrows slightly outward to the body border line and keep them out of readable content.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not redesign the reading panel beyond a small outward nudge and matching gutter padding
- Write sets:
  - main:
    - `src/components/IChingSection.tsx`
    - `src/index.css`
    - `STATE.md`
- Acceptance criteria:
  - the arrows sit a little farther toward the panel edge
  - the body content keeps clear of the arrows
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - this is a tiny layout-only tweak with no feature split or reviewer coordination.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-23: re-scoped to a small outward nudge of the right-panel navigation arrows.
