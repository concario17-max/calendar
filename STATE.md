# Current Task
- Completed: Regenerated the commentary registries from the updated `괘사-3.odt` and `효사-3.odt` source files, and updated the registry tests to assert the 3rd entries are present and readable.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: regenerate `src/data/guaCommentary.ts` and `src/data/yaoCommentary.ts` from the updated `괘사/` and `효사/` folders, including the refreshed `3` entries.
- Non-goals: no UI layout redesign, no commentary routing change, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - `괘사-3.odt` and `효사-3.odt` are incorporated into the generated commentary data.
  - The corresponding commentary lookup returns the updated `3` entries.
  - Build and tests pass.

# Write Sets
- worker_data: scripts/extract_commentary.py, src/data/guaCommentary.ts, src/data/yaoCommentary.ts, related tests

# Reviewer
- reviewer: commentary source regeneration

# Last Update
- 2026-04-16: completed commentary source refresh for `괘사-3` and `효사-3`
