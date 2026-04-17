# Current Task
- Completed: Refreshed the 4th commentary bundles from `괘사-4.odt` and `효사-4.odt`, and updated the registry tests to reflect the new numbered entries.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: regenerate `src/data/guaCommentary.ts` and `src/data/yaoCommentary.ts` from the updated `괘사/` and `효사/` folders, including the refreshed `4` entries.
- Non-goals: no UI layout redesign, no commentary routing change, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - `괘사-4.odt` and `효사-4.odt` are incorporated into the generated commentary data.
  - The corresponding commentary lookup returns the updated `4` entries.
  - Build and tests pass.

# Write Sets
- worker_data: scripts/extract_commentary.py, src/data/guaCommentary.ts, src/data/yaoCommentary.ts, related tests

# Reviewer
- reviewer: commentary source regeneration for 4th bundle

# Last Update
- 2026-04-17: refreshed the 4th commentary bundle and verified the new `49` / `289` registry entries
