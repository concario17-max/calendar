# Current Task
- Active: restyle the commentary segmented control as flat icon-label chips.

# Route
- Route A
- Reason: this is a small single-component style tweak that only changes the appearance of the existing commentary control chips.

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: make the È¿»ç/±¥»ç/¿µÈ¥ controls look like small flat icon-label chips with no border and no white button background.
- Non-goals: no commentary registry updates, no data regeneration, no layout redesign, no deployment work.
- Acceptance criteria:
  - The three commentary options read as small icon-label chips.
  - The chips use the surrounding panel background instead of a white button background.
  - The chips have no visible border.
  - The existing toggle behavior remains unchanged.

# Write Sets
- main: src/components/IChingSection.tsx

# Reviewer
- reviewer: commentary chip styling regression

# Last Update
- 2026-04-19: prepared a flat chip-style update for the commentary control
