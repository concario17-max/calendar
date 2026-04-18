# Current Task
- Completed: restore the soul section to its prior card-based layout and undo the newer centered presentation.

# Route
- Route A
- Reason: this is a tight restore on one feature component plus its dedicated test file, with no shell or shared-asset rollout.

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: restore the soul section to its prior card-based layout and undo the newer centered presentation.
- Non-goals: no commentary registry updates, no data regeneration, no deployment work, no broader typography overhaul, no shell wiring changes.
- Acceptance criteria:
  - The soul section returns to its prior non-centered card layout.
  - The fallback and section rendering match the earlier soul section behavior.
  - Build and tests pass after the revert.

# Write Sets
- main: src/components/SoulCalendarSection.tsx, src/components/SoulCalendarSection.test.tsx

# Reviewer
- reviewer: soul section layout restoration and test alignment

# Last Update
- 2026-04-18: restored the soul section's prior card-based layout
