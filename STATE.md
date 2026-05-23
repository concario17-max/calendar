# Current Task
- Active: move the right-panel day navigation arrows into a dedicated gutter so they no longer overlap the body text.

# Route
- Route A
- Reason: this is a small layout hotfix confined to the reading panel and one shared state file; no shared asset fan-out or reviewer split is needed.

# Writer Slot
- main: single-write lane for the hotfix

# Contract Freeze
- Goal: move the right-panel previous/next arrows into a dedicated outer gutter so they no longer cover the body text.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not redesign the reading panel beyond relocating the arrows and reserving gutter space
- Write sets:
  - main:
    - `src/components/IChingSection.tsx`
    - `src/components/MainContent.tsx`
    - `STATE.md`
- Acceptance criteria:
  - the arrows no longer overlap readable body content
  - the body keeps the same reading behavior
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route A:
  - the change is a small layout-only hotfix with no new state model or cross-feature refactor.

# Reviewer
- reviewer: not used for this hotfix

# Last Update
- 2026-05-23: moved the right-panel day navigation arrows into a reserved gutter and padded the reading column to prevent overlap.
