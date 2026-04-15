# Current Task
- Completed: Rename the commentary source toggle labels from `gua / yao` to `괘사 / 효사`.

# Route
- Route A

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: localize the commentary source toggle labels so the selector reads `괘사 / 효사` instead of `gua / yao`.
- Non-goals: no data routing change, no registry rewrite, no deployment work, no unrelated layout work.
- Acceptance criteria:
  - The toggle labels render as `괘사` and `효사`.
  - Commentary routing continues to work unchanged.
  - Build and tests pass.
- Risks:
  - None beyond a label mismatch if a component path is missed.

# Write Sets
- main_impl: src/components/IChingSection.tsx

# Reviewer
- reviewer: toggle label localization

# Last Update
- 2026-04-15: toggle label localization completed
