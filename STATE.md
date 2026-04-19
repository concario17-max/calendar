# Current Task
- Completed: moved the Today controls to sit immediately to the right of the Today's Reading badge.

# Route
- Route B
- Reason: the header-row layout change spans the reading panel component and its tests, and changes the control grouping in the shared reading shell.

# Writer Slot
- main: planner only; implementation delegated to worker(s)

# Contract Freeze
- Goal: move the date controls so they sit immediately to the right of the Today's Reading badge while preserving the commentary segmented control.
- Non-goals: no commentary registry updates, no data regeneration, no deployment work, no broader typography overhaul, no shell layout redesign.
- Acceptance criteria:
  - The Today's Reading row shows the badge followed by the date controls on the same line.
  - The commentary segmented control remains available.
  - The selected commentary still drives the right panel content.
  - Build and tests pass after the adjustment.

# Write Sets
- worker: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: Today row placement and commentary-switch regression

# Last Update
- 2026-04-19: moved the Today controls next to the Today's Reading badge and verified the row layout
