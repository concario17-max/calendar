# Current Task
- Make the header span the full width so the brand sits left and the controls sit right, instead of reading as a centered card.

# Route
- Route A

# Writer Slot
- main: direct implementation lane for a single-file header shell tweak

# Contract Freeze
- Goal: remove the centered max-width header shell so the brand icon/title anchors left and the remaining controls anchor right across the full bar.
- Non-goals: no data model changes, no content changes, no deployment work.
- Acceptance criteria:
  - The header spans the bar width and reads as two visually distinct groups: brand on the left, controls on the right.
  - Mobile behavior stays readable.
  - Build and tests pass.
- Risks:
  - The long title may still wrap on very small screens, so the right group may need a small follow-up tweak if space gets tight.

# Write Sets
- main: src/components/Header.tsx

# Reviewer
- main verification

# Last Update
- 2026-04-13: header shell expansion requested
