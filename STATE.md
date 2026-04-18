# Current Task
- Complete: remove the top header bar entirely, move the date selector and `Today` control into the left `Today's Reading` row, move the dark mode button into the right `Commentary` row, and keep both rows aligned while the panels absorb the freed top space.

# Route
- Route B
- Reason: the scope now includes shared header/MainContent layout plus reading-panel structure, so the change spans multiple files and needs coordinated implementation and review.

# Writer Slot
- main: planner-only lane; implementation executed via workers

# Contract Freeze
- Goal: remove the header bar, place the date selector and `Today` button on the left `Today's Reading` row, place the dark mode button on the right `Commentary` row, keep both rows aligned at the same height, and let the panels fill the freed top space.
- Non-goals: no commentary registry updates, no data regeneration, no deployment work, no unrelated typography overhaul, no reordering of the reading content itself beyond the requested control relocation.
- Acceptance criteria:
  - The top header bar is removed.
  - The left `Today's Reading` row contains the date selector and `Today` control on its right side.
  - The right `Commentary` row contains the dark mode button on its right side.
  - Both rows share the same visual height and top alignment.
  - The left and right panels expand to absorb the space previously occupied by the header.
  - Build and tests pass after the layout change.

# Write Sets
- worker_shared: src/App.tsx, src/components/Header.tsx, src/components/MainContent.tsx
- worker_left: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx
- worker_right: none

# Reviewer
- reviewer: header removal and row-level alignment of `Today's Reading` / `Commentary`

# Last Update
- 2026-04-18: tightened the split panels to stretch vertically and locked the top rows to a stronger desktop height, then verified build plus full test suite
