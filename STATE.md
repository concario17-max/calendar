# Current Task
- Align the header so the icon and title stay left and the remaining controls stay right.

# Route
- Route A

# Writer Slot
- main: direct implementation lane for a single-file header alignment tweak

# Contract Freeze
- Goal: align the header into two clear groups, with the brand icon/title on the left and the remaining controls on the right.
- Non-goals: no data model changes, no content changes, no deployment work.
- Acceptance criteria:
  - The header reads as two groups: brand on the left, controls on the right.
  - Mobile behavior stays readable.
  - Build and tests pass.
- Risks:
  - The long title may still wrap on very small screens, so spacing may need small follow-up tuning if the two-group layout compresses too much.

# Write Sets
- main: src/components/Header.tsx

# Reviewer
- main verification

# Last Update
- 2026-04-13: header alignment requested
