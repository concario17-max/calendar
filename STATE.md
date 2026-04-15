# Current Task
- Completed: Remove the remaining rounded `reading-gua-meta` block so the top card shows gua heading/meta as a plain paragraph and the lower verse card keeps sigil plus Today's Reading title/short/body.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: show the gua header/meta in the top card and keep the lower verse card focused on the sigil, Today's Reading title/short, and the yaoData.body block without a separate Anamil card.
- Non-goals: no commentary routing change, no data migration, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - The top card contains the gua heading and meta as a single summary block, and does not carry the sigil.
  - The lower verse card contains the sigil, Today's Reading title/short, and the yaoData.body block inside the same card.
  - Commentary layout and soul section behavior stay intact.
  - Build and tests pass.
- Risks:
  - The lower card can become too dense if the sigil and body text are not spaced carefully.

# Write Sets
- worker_summary: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: reading card simplification

# Last Update
- 2026-04-15: removed rounded gua meta block and verified with test/build
