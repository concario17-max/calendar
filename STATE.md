# Current Task
- Completed: restored the soul section header in the left reading panel while removing the soul body cards.

# Route
- Route B
- Reason: the layout change spans the reading panel and soul section component plus tests, and it reintroduces a shared section into the main page shell.

# Writer Slot
- main: planner only; implementation delegated to worker(s)

# Contract Freeze
- Goal: keep the soul section header visible in the left reading panel while removing the soul body cards.
- Non-goals: no commentary registry updates, no data regeneration, no deployment work, no broader typography overhaul, no unrelated shell redesign.
- Acceptance criteria:
  - The soul section header remains visible.
  - The soul body cards are not rendered.
  - The left reading panel retains the rest of its current layout.
  - Build and tests pass after the adjustment.

# Write Sets
- worker: src/components/IChingSection.tsx, src/components/SoulCalendarSection.tsx, src/components/IChingSection.test.tsx, src/components/SoulCalendarSection.test.tsx

# Reviewer
- reviewer: soul header retention and card-body removal

# Last Update
- 2026-04-18: restored the soul header and removed the soul body cards
