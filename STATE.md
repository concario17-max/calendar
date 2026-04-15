# Current Task
- Completed: Tighten the reading panel spacing so the sigil, title, and meta read as one set while the verse body stays wider below.

# Route
- Route A

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: tighten the reading-panel spacing so the top sigil/title/meta reads as one unit and the verse body remains wide and readable below.
- Non-goals: no commentary routing change, no data migration, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - The top sigil/title/meta area reads as one cohesive set.
  - The verse body below has more horizontal room and less visual ambiguity.
  - Commentary layout and soul section behavior stay intact.
  - Build and tests pass.
- Risks:
  - The reflow could upset the existing editorial split balance if spacing is not tuned carefully.

# Write Sets
- main_impl: src/components/IChingSection.tsx

# Reviewer
- reviewer: reading panel spacing tuning

# Last Update
- 2026-04-15: reading panel spacing tuning completed
