# Current Task
- Active: double the sigil block vertical spacing in the left reading rail.

# Route
- Route A
- Reason: this is a small single-component layout tweak that only changes the sigil block spacing inside the existing left reading rail.

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: double the vertical spacing around the sigil block in the left reading rail.
- Non-goals: no commentary registry updates, no data regeneration, no viewport shell redesign, no deployment work.
- Acceptance criteria:
  - The sigil block has roughly double the previous vertical spacing.
  - The left rail layout remains otherwise intact.
  - Build passes after the adjustment.

# Write Sets
- main: src/components/IChingSection.tsx

# Reviewer
- reviewer: left rail sigil spacing regression

# Last Update
- 2026-04-19: prepared a larger sigil spacing tweak for the left reading rail
