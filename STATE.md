# Current Task
- Active: increase the sigil block vertical spacing in the left reading rail.

# Route
- Route A
- Reason: this is a small single-component layout tweak that only changes the sigil block spacing inside the existing left reading rail.

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: increase the vertical spacing around the sigil block in the left reading rail.
- Non-goals: no commentary registry updates, no data regeneration, no viewport shell redesign, no deployment work.
- Acceptance criteria:
  - The sigil block has visibly larger vertical spacing than before.
  - The left rail layout remains otherwise intact.
  - Build passes after the adjustment.

# Write Sets
- main: src/components/IChingSection.tsx

# Reviewer
- reviewer: left rail sigil spacing regression

# Last Update
- 2026-04-19: prepared a sigil spacing tweak for the left reading rail
