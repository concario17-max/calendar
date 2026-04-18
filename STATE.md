# Current Task
- Completed: add per-section buttons for `효사`, `괘사`, and `소울` so the commentary panel shows the selected section's content, and remove the old global `GUA / YAO` toggle.

# Route
- Route A
- Reason: this stays inside the reading panel component plus its focused test coverage, with no shared asset or multi-slice rollout.

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: add per-section buttons for `효사`, `괘사`, and `소울` so the commentary panel can swap to the selected section content, and remove the old global `GUA / YAO` toggle.
- Non-goals: no commentary registry updates, no data regeneration, no deployment work, no unrelated typography overhaul, no broader layout rewrite.
- Acceptance criteria:
  - `효사`, `괘사`, and `소울` each have their own button in the left reading area.
  - Clicking one of those buttons swaps the right commentary panel to that section's content.
  - The old global `GUA / YAO` toggle is removed.
  - Build and tests pass after the layout change.

# Write Sets
- main: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: per-section commentary button wiring and toggle removal

# Last Update
- 2026-04-18: completed per-section commentary buttons and removal of the global GUA/YAO toggle
