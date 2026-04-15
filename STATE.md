# Current Task
- Completed: Move the sigil and Anamil explanation into the lower verse card while keeping the top card gua-only.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: keep the top card gua-only while the lower verse card contains the sigil, Today's Reading title/short/body, and any Anamil explanation tied to the verse.
- Non-goals: no commentary routing change, no data migration, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - The top card contains only the gua heading and does not carry the sigil or meta.
  - The lower verse card contains the sigil, Today's Reading title/short/body, and the Anamil explanation if present.
  - Commentary layout and soul section behavior stay intact.
  - Build and tests pass.
- Risks:
  - The lower card can become too dense if the sigil and explanation are not spaced carefully.

# Write Sets
- worker_summary: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: reading card relocation

# Last Update
- 2026-04-15: top card gua-only relocation implemented and verified
