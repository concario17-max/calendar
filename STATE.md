# Current Task
- Reduce the bottom spacing beneath the soul cards by half while keeping the current left-column nesting.

# Route
- Route A

# Writer Slot
- main: direct implementation lane for a single-file spacing tweak

# Contract Freeze
- Goal: cut the bottom padding beneath the soul calendar cards roughly in half.
- Non-goals: no layout restructuring, no data model changes, no commentary plumbing cleanup, no deployment work.
- Acceptance criteria:
  - The soul card block has noticeably less bottom spacing.
  - The current left-column nesting remains intact.
  - Mobile behavior stays readable.
  - Build and tests pass.
- Risks:
  - The bottom spacing may also be influenced by surrounding container padding, so we may need to tune the section-level padding rather than only the card block.

# Write Sets
- main: src/components/SoulCalendarSection.tsx

# Reviewer
- main verification

# Last Update
- 2026-04-13: spacing tweak requested for soul cards
