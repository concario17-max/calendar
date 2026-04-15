# Current Task
- Completed: Refined the full-width split reading layout so the gua body and commentary feel editorial instead of cheap and symmetrical.

# Route
- Route A

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: make the current split reading view feel editorial by shifting from a flat 50/50 presentation to a subtly asymmetrical, annotated layout.
- Non-goals: no commentary data migration, no source registry rewrite, no deployment work, no global design system overhaul.
- Acceptance criteria:
  - The split layout no longer reads as a flat 50/50 block.
  - The commentary side feels secondary but intentional.
  - The body side keeps the reading hierarchy clear.
  - Build and tests pass.
- Risks:
  - Overcorrecting the asymmetry could make the layout feel lopsided.
  - Commentary typography or spacing could become too weak if the secondary panel is compressed too far.
  - Keep the change small enough to avoid reopening the routing/data work.

# Write Sets
- main_impl: src/components/IChingSection.tsx

# Reviewer
- reviewer: editorial split balance and readability

# Last Update
- 2026-04-15: editorial split refinement completed
