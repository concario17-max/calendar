# Current Task
- Active: move the theme toggle to the right of the Commentary label row.

# Route
- Route A
- Reason: this is a small single-component layout tweak that reorders controls inside the existing reading title row without changing the broader layout contract.

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: move the theme toggle so it appears on the Commentary row instead of the Today row.
- Non-goals: no commentary registry updates, no data regeneration, no viewport shell redesign, no deployment work.
- Acceptance criteria:
  - The reading title row keeps the Today badge and controls on the same row.
  - The theme toggle appears on the Commentary row and is right-aligned there.
  - The commentary control remains in the title row.
  - Build passes after the adjustment.

# Write Sets
- main: src/components/IChingSection.tsx

# Reviewer
- reviewer: reading title row control ordering regression

# Last Update
- 2026-04-19: prepared a control-ordering tweak for the reading title row
