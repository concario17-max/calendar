# Current Task
- In progress: Swap the upper verse row so the title/short lead on the left and the sigil sits centered on the right.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: keep the top card as gua heading/meta only and re-balance the lower verse row so the title/short lead on the left and the sigil sits centered on the right.
- Non-goals: no commentary routing change, no data migration, no deployment work, no unrelated typography overhaul, no body layout changes.
- Acceptance criteria:
  - The top card contains the gua heading and meta as a single summary block, and does not carry the sigil.
  - The lower verse row places Today's Reading title/short on the left and the sigil on the right.
  - The sigil is vertically centered in the upper verse row.
  - Commentary layout and soul section behavior stay intact.
  - Build and tests pass.

# Write Sets
- worker_layout: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: upper verse row balance

# Last Update
- 2026-04-15: upper verse row rebalanced with title/short left and sigil centered right
