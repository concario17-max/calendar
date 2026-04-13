# Current Task
- Removed the leftover gray top gradient/empty space after moving controls to the upper-right.

# Route
- Route A

# Writer Slot
- main: direct implementation lane for a single-file spacing cleanup

# Contract Freeze
- Goal: remove the leftover gray top fade so the page starts cleanly under the floating controls.
- Non-goals: no data model changes, no content changes, no deployment work, no new controls.
- Acceptance criteria:
  - The top gray gradient/empty band is removed.
  - The page reads directly into the content area beneath the floating controls.
  - Mobile behavior stays readable and the floating cluster does not block core content.
  - Build and tests pass.
- Risks:
  - Removing the top fade may make the top edge feel harsher if the main content spacing is too tight.

# Write Sets
- main: src/App.tsx

# Reviewer
- main verification

# Last Update
- 2026-04-13: gray top gradient removed
