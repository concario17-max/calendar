# Current Task
- Completed: tightened the gap between the main reading card and the commentary card.

# Route
- Route A

# Writer Slot
- main: direct implementation lane for a single-file spacing tweak

# Contract Freeze
- Goal: bring the left reading card and right commentary card closer together without changing the overall layout language.
- Non-goals: no data model changes, no copy/content rewrite, no deployment work, no header/shell changes.
- Acceptance criteria:
  - The horizontal gap between the two cards is tighter and more balanced.
  - The existing layout language stays intact.
  - Build and tests pass.
- Risks:
  - Tightening the gap too much could make the cards feel crowded on medium screens.

# Write Sets
- main: src/components/IChingSection.tsx

# Reviewer
- main verification

# Last Update
- 2026-04-13: card gap tightening verified clean
