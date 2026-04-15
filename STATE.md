# Current Task
- Completed: Render list-backed commentary blocks as middle-dot lists instead of exposing `[[item]]` markers.

# Route
- Route A

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: keep the registry marker contract internal and render list-backed commentary blocks as middle-dot lists in the UI.
- Non-goals: no commentary routing change, no deployment work, no unrelated layout work, no registry rewrite.
- Acceptance criteria:
  - `[[item]]` markers never appear in rendered commentary.
  - List-backed commentary renders as a semantic list with visible bullet/middle-dot markers.
  - Plain paragraphs and pipe-delimited tables still render correctly.
  - Build and tests pass.
- Risks:
  - The parser must distinguish registry markers from ordinary prose carefully.
  - A list marker bug could accidentally reclassify plain paragraphs.

# Write Sets
- main_impl: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: middle-dot list rendering

# Last Update
- 2026-04-15: list marker rendering fix completed
