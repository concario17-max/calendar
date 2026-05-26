# Current Task
- Active: move the right-panel prev/next buttons to the left of the comic/text toggle in `src/components/IChingSection.tsx`.

# Route
- Route A
- Reason: this is a small header-layout tweak confined to one component file.

# Writer Slot
- main: write-capable

# Contract Freeze
- Goal: place the prev/next navigation buttons immediately to the left of the comic/text toggle in the right-panel header.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, commentary content, or component APIs
  - do not alter user-provided untracked folders/files
  - do not redesign the reading UI
  - do not change routing behavior
  - do not change image assets or file formats
  - do not change the comic/text toggle behavior
- Write sets:
  - main:
    - `src/components/IChingSection.tsx`
- Acceptance criteria:
  - the prev/next buttons appear immediately to the left of the comic/text toggle in the right-panel header
  - content and routing behavior remain unchanged
  - `npm.cmd run lint` and `npm.cmd run build` pass

# Reviewer
- reviewer: not needed

# Last Update
- 2026-05-26: moved to a compact right-panel header control layout task.
