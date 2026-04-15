# Current Task
- Completed: Rework the reading panel so the sigil, title, and meta are grouped as one top set and the verse body expands wider below.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: group the sigil/image, header, and meta into one visual unit, then let the verse body span a wider, clearer block below it.
- Non-goals: no commentary routing change, no data migration, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - The top sigil/title/meta area reads as one cohesive set.
  - The verse body below has more horizontal room and less visual ambiguity.
  - Commentary layout and soul section behavior stay intact.
  - Build and tests pass.
- Risks:
  - The reflow could upset the existing editorial split balance if spacing is not tuned carefully.

# Write Sets
- worker_feature: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx
- reviewer: reading panel regrouping

# Reviewer
- reviewer: reading panel regrouping

# Last Update
- 2026-04-15: reading panel regrouping completed
