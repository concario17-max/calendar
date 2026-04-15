# Current Task
- In progress: Remove the horizontal divider between the gua title line and the gua meta text in the top card.

# Route
- Route A

# Writer Slot
- main: single-file hotfix lane

# Contract Freeze
- Goal: keep the top card as gua heading/meta only, but remove the visible horizontal divider between the heading line and the meta text.
- Non-goals: no commentary routing change, no data migration, no deployment work, no unrelated typography overhaul, no body layout changes.
- Acceptance criteria:
  - The top card contains the gua heading and meta as a single summary block, and does not carry the sigil.
  - There is no horizontal divider between the gua heading line and the gua meta text.
  - Commentary layout and soul section behavior stay intact.
  - Build and tests pass.

# Write Sets
- main: src/components/IChingSection.tsx

# Reviewer
- reviewer: top divider removal

# Last Update
- 2026-04-15: removing top-card divider between gua heading and meta text
