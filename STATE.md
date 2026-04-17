# Current Task
- Completed: Aligned the commentary registry tests with the actual refreshed gua/yao key sets, including the known source gaps.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: keep the regenerated registries intact and update the registry tests so they assert the actual refreshed key sets from the current folders, including known gaps.
- Non-goals: no UI layout redesign, no commentary routing change, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - The registry tests assert the actual refreshed gua keys `5..64` excluding `11` and `28`.
  - The registry tests assert the actual refreshed yao keys `25..384` excluding `61..66` and `191`.
  - Build and tests pass.

# Write Sets
- worker_data: src/data/guaCommentary.test.ts, src/data/yaoCommentary.test.ts

# Reviewer
- reviewer: commentary registry completeness and numbering

# Last Update
- 2026-04-17: updated registry tests and regenerated data for the actual gapped key sets
