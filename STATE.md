# Current Task
- In progress: Reduce the sigil column width so the upper verse row gives the title/short more breathing room while keeping the sigil centered on the right.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: keep the top card as gua heading/meta only and rebalance the lower verse row so the title/short lead on the left while the sigil remains centered on the right but no longer dominates the row.
- Non-goals: no commentary routing change, no data migration, no deployment work, no unrelated typography overhaul, no body layout changes.
- Acceptance criteria:
  - The top card contains the gua heading and meta as a single summary block, and does not carry the sigil.
  - The lower verse row places Today's Reading title/short on the left and the sigil on the right.
  - The sigil is vertically centered in the upper verse row and constrained so it does not crush the title column.
  - Commentary layout and soul section behavior stay intact.
  - Build and tests pass.

# Write Sets
- worker_layout: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: upper verse row balance

# Last Update
- 2026-04-15: constrained the sigil column width so the title/short row can breathe without changing commentary or soul behavior
