# Current Task
- Completed: replaced the three commentary buttons with a single segmented control labeled 효사 / 괘사 / 영혼.

# Route
- Route B
- Reason: the control swap spans the reading panel component and its tests, and changes interaction state that drives the commentary shell.

# Writer Slot
- main: planner only; implementation delegated to worker(s)

# Contract Freeze
- Goal: replace the three separate commentary buttons with a single segmented control labeled 효사 / 괘사 / 영혼.
- Non-goals: no commentary registry updates, no data regeneration, no deployment work, no broader typography overhaul, no shell layout redesign.
- Acceptance criteria:
  - The commentary controls are presented as one segmented control with labels 효사 / 괘사 / 영혼.
  - The old three separate commentary buttons are removed.
  - The selected commentary still drives the right panel content.
  - Build and tests pass after the adjustment.

# Write Sets
- worker: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: segmented commentary control and commentary-switch regression

# Last Update
- 2026-04-19: implemented the single segmented commentary control, verified tests/build, and cleared encoding check issues
