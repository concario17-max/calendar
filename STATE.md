# Current Task
- Active: reduce the mobile header height in `src/components/Header.tsx` with a minimal padding change.

# Route
- Route A
- Reason: this is a single-file mobile spacing tweak.

# Writer Slot
- main: write-capable

# Contract Freeze
- Goal: reduce the mobile header height with the smallest safe spacing change.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, commentary content, or component APIs
  - do not alter user-provided untracked folders/files
  - do not redesign the reading UI
  - do not change routing behavior
  - do not change image assets or file formats
  - do not change the comic/text toggle behavior
  - do not change desktop header spacing unless needed for the same edit
- Write sets:
  - main:
    - `src/components/Header.tsx`
- Acceptance criteria:
  - the mobile header is shorter with a minimal visual change
  - content and routing behavior remain unchanged
  - `npm.cmd run lint` and `npm.cmd run build` pass

# Reviewer
- reviewer: not needed

# Last Update
- 2026-05-26: re-scoped to a minimal mobile header height reduction.
