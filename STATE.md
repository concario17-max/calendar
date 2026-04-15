# Current Task
- Completed: Enlarge the sigil about 1.5x and remove its framed box so the upper verse row feels lighter and less cramped.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: keep the top card as gua heading/meta only and make the upper verse row feel lighter by enlarging the sigil about 1.5x and removing its framed box.
- Non-goals: no commentary routing change, no data migration, no deployment work, no unrelated typography overhaul, no body layout changes.
- Acceptance criteria:
  - The top card contains the gua heading and meta as a single summary block, and does not carry the sigil.
  - The lower verse row keeps Today's Reading title/short on the left and the sigil on the right.
  - The sigil is visually larger, no longer inside a framed box, and still centered on the right.
  - Commentary layout and soul section behavior stay intact.
  - Build and tests pass.

# Write Sets
- worker_layout: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: upper verse sigil size

# Last Update
- 2026-04-15: upper verse sigil box removed; build and tests passed on the larger frameless icon balance
