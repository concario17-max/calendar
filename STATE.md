# Current Task
- Completed: Removed the stale CSS rule that hides the commentary badge while leaving the header layout unchanged.

# Route
- Route A

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: remove the stale CSS selector that hides the commentary badge and keep the existing header controls as-is.
- Non-goals: no header layout rewrite, no commentary registry updates, no data regeneration, no deployment work, no unrelated typography overhaul, no content reordering.
- Acceptance criteria:
  - The commentary badge is visible again in the reading flow.
  - `Header.tsx` retains the single GUA/YAO toggle and the rest of the control layout stays unchanged.
  - Build and tests pass after the CSS-only change.

# Write Sets
- main: src/index.css

# Reviewer
- reviewer: stale commentary badge hide rule removal

# Last Update
- 2026-04-18: removed the stale commentary badge hide rule and verified the build
