# Current Task
- Completed: Moved `Today's Reading` above the sigil and aligned it with the commentary row while preserving the rest of the reading layout.

# Route
- Route B
- Reason: the layout relocation touched both the reading surface and its test coverage, and we already coordinated a worker and reviewer pass to keep the change aligned.

# Writer Slot
- main: planner-only lane; implementation executed via workers

# Contract Freeze
- Goal: move `Today's Reading` above the sigil, align it on the same row as the commentary button, and keep the rest of the layout intact.
- Non-goals: no commentary registry updates, no data regeneration, no deployment work, no unrelated typography overhaul, no content reordering beyond the requested top-left/header alignment.
- Acceptance criteria:
  - `Today's Reading` is positioned above the sigil in the left reading panel.
  - `Today's Reading` sits on the same horizontal row as the commentary button in the header/control bar.
  - The rest of the reading layout remains intact.
  - Build and tests pass after the layout change.

# Write Sets
- worker_shared: src/App.tsx, src/components/Header.tsx, src/components/MainContent.tsx
- worker_left: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx
- worker_right: none

# Reviewer
- reviewer: `Today's Reading` top-left placement and commentary-row alignment

# Last Update
- 2026-04-18: removed the left badge top offset so the reading badge and commentary row align at desktop widths; task completed
