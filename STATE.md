# Current Task
- Add the soul title block back into the left rail without the card body, while keeping the right soul panel unchanged.

# Route
- Route A
- Reason: narrow layout addition isolated to the soul title block rendering and its assertions.

# Writer Slot
- main: implementation
- worker-panel: idle
- worker-nav: idle

# Contract Freeze
- Goal: add the soul title block back into the left rail without the card body, while leaving the right soul panel unchanged.
- Non-goals: do not change data registries or the journal modal export text.
  - Acceptance criteria:
  - The left rail renders the soul title block again without the card body.
  - The right soul panel stays unchanged.
  - Existing commentary content and selection behavior remain intact.

# Reviewer
- reviewer-layout: soul-title-block regression review

# Last Update
- 2026-04-21: resolved soul title block restoration on the left rail; verification passed.
