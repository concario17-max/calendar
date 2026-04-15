# Current Task
- Completed: Move the verse body out of the sigil/title grid so it spans the full lower card width beneath the upper row, while keeping commentary and soul behavior intact.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: keep the top card as gua heading/meta only and make the lower verse card use a two-stage layout: upper row with sigil + Today's Reading title/short, then a full-width body block below it.
- Non-goals: no commentary routing change, no data migration, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - The top card contains the gua heading and meta as a single summary block, and does not carry the sigil.
  - The lower verse card contains the sigil and Today's Reading title/short on the upper row, with the yaoData.body block spanning the lower card width beneath them.
  - Commentary layout and soul section behavior stay intact.
  - Build and tests pass.
- Risks:
  - The lower card can become too dense if the sigil and body text are not spaced carefully.

# Write Sets
- worker_body: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: lower body span layout

# Last Update
- 2026-04-15: lower verse body now spans the full card width beneath the upper row
