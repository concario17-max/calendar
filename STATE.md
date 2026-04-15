# Current Task
- Completed: Flipped the editorial split so commentary has the wider column while keeping the spine line.

# Route
- Route A

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: make the split reading layout commentary-led by widening the commentary column while preserving the editorial spine line.
- Non-goals: no commentary data migration, no source registry rewrite, no deployment work, no global design system overhaul.
- Acceptance criteria:
  - The commentary side feels secondary but intentional.
  - The commentary column is visibly wider than the body column.
  - The body side keeps the reading hierarchy clear.
  - Build and tests pass.
- Risks:
  - The spine line could become too visually heavy if its opacity or width is too high.
  - Keep the change small enough to avoid reopening the routing/data work.

# Write Sets
- main_impl: src/components/IChingSection.tsx

# Reviewer
- reviewer: editorial split balance and readability

# Last Update
- 2026-04-15: commentary-first split balance completed
