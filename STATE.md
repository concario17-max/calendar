# Current Task
- In progress: Rebuild the commentary registries against the fully updated `괘사/` and `효사/` source folders, remove stale exclusion logic, and realign the tests to the complete regenerated key sets.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: regenerate `src/data/guaCommentary.ts` and `src/data/yaoCommentary.ts` so they include all current source entries from the modified `괘사/` and `효사/` folders, and remove any exclusion logic that no longer matches source.
- Non-goals: no UI/layout redesign, no commentary routing change, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - The registry includes the current gua keys `5..64` and the current yao keys `25..384` as represented in source.
  - The registry tests assert the refreshed complete key sets from the current folders.
  - Build and tests pass.

# Write Sets
- worker_data: scripts/extract_commentary.py, src/data/guaCommentary.ts, src/data/yaoCommentary.ts, src/data/guaCommentary.test.ts, src/data/yaoCommentary.test.ts

# Reviewer
- reviewer: missing commentary entries restored from source

# Last Update
- 2026-04-17: source folders now expose the full commentary key sets and the registries should be regenerated without stale exclusions
