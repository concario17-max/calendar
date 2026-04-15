# Current Task
- Completed: Split the reading summary into its own card so the sigil and gua text stay together while the Today's Reading block lives separately below.

# Route
- Route A

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: split the reading summary into a separate card so the sigil and gua text stay together while the Today's Reading block becomes its own lower card.
- Non-goals: no commentary routing change, no data migration, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - The sigil and gua header/meta read as one summary card.
  - The Today's Reading title/short/body read as a separate lower card.
  - Commentary layout and soul section behavior stay intact.
  - Build and tests pass.
- Risks:
  - Introducing another card can over-space the layout if vertical rhythm is not tuned carefully.

# Write Sets
- main_impl: src/components/IChingSection.tsx

# Reviewer
- reviewer: reading summary split

# Last Update
- 2026-04-15: reading summary split completed
