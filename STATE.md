# Current Task
- Active: make the right-panel prev/next buttons and comic/text toggle read as one grouped control in `src/components/IChingSection.tsx`.

# Route
- Route A
- Reason: this is a small header-layout tweak confined to one component file.

# Writer Slot
- main: write-capable

# Contract Freeze
- Goal: make the prev/next navigation buttons and comic/text toggle look like one grouped control in the right-panel header.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, commentary content, or component APIs
  - do not alter user-provided untracked folders/files
  - do not redesign the reading UI
  - do not change routing behavior
  - do not change image assets or file formats
  - do not change the comic/text toggle behavior
  - do not change the date navigation behavior
- Write sets:
  - main:
    - `src/components/IChingSection.tsx`
- Acceptance criteria:
  - the prev/next buttons and comic/text toggle visually read as one grouped control in the right-panel header
  - content and routing behavior remain unchanged
  - `npm.cmd run lint` and `npm.cmd run build` pass

# Reviewer
- reviewer: not needed

# Last Update
- 2026-05-26: refined the right-panel header into a single grouped control.
