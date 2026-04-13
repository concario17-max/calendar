# Current Task
- Make the header read clearly as left brand and right controls, with stronger visual separation.

# Route
- Route A

# Writer Slot
- main: direct implementation lane for a single-file header layout tweak

# Contract Freeze
- Goal: make the header clearly read as two groups, with the brand icon/title on the left and the remaining controls on the right.
- Non-goals: no data model changes, no content changes, no deployment work.
- Acceptance criteria:
  - The header reads as two visually distinct groups: brand on the left, controls on the right.
  - Mobile behavior stays readable.
  - Build and tests pass.
- Risks:
  - The long title may still wrap on very small screens, so the right group may need a small follow-up tweak if space gets tight.

# Write Sets
- main: src/components/Header.tsx

# Reviewer
- main verification

# Last Update
- 2026-04-13: header separation requested
