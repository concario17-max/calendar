# Current Task
- Completed: Keep guaData.meta in the top card and keep yaoData.body inside the lower reading-verse-unit card.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: show the gua header/meta in the top card and keep the lower verse card focused on the sigil, Today's Reading title/short, and an internal yaoData.body block.
- Non-goals: no commentary routing change, no data migration, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - The top card contains the gua heading and meta, and does not carry the sigil.
  - The lower verse card contains the sigil, Today's Reading title/short, and the yaoData.body block inside the same card.
  - Commentary layout and soul section behavior stay intact.
  - Build and tests pass.
- Risks:
  - The lower card can become too dense if the sigil and body text are not spaced carefully.

# Write Sets
- worker_summary: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: reading card regrouping

# Last Update
- 2026-04-15: verse-body moved inside reading-verse-unit and verified with test/build
