# Current Task
- Completed: remove the left-side soul cards from the reading panel while keeping the section commentary buttons in the Today's Reading row.

# Route
- Route A
- Reason: this is a tight reading-panel-only change with a small test update, no shell rollout, and no shared asset work.

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: remove the left-side soul cards from the reading panel while keeping the section commentary buttons in the Today's Reading row.
- Non-goals: no commentary registry updates, no data regeneration, no deployment work, no broader typography overhaul, no shell wiring changes.
- Acceptance criteria:
  - The left-side soul cards are no longer rendered.
  - The Today's Reading row buttons remain available.
  - The right commentary panel still swaps by selected section.
  - Build and tests pass after the deletion.

# Write Sets
- main: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: soul card removal and test alignment

# Last Update
- 2026-04-18: removed the left-side soul cards from the reading panel
