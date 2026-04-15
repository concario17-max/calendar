# Current Task
- Completed: Polished the editorial split so the body reads like a primary plate and commentary reads like annotated marginalia.

# Route
- Route A

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: refine the editorial split so the body and commentary feel like a designed spread instead of two similar cards.
- Non-goals: no commentary data migration, no source registry rewrite, no deployment work, no global design system overhaul.
 - Acceptance criteria:
  - The body reads like the primary plate.
  - Commentary reads like annotated marginalia.
  - The split still feels editorial, not symmetrical.
  - Build and tests pass.
- Risks:
  - The styling contrast could become too strong and feel gimmicky.
  - Keep the change small enough to avoid reopening the routing/data work.

# Write Sets
- main_impl: src/components/IChingSection.tsx

# Reviewer
- reviewer: editorial split balance and readability

# Last Update
- 2026-04-15: editorial polish refinement completed
