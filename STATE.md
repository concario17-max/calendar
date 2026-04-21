# Current Task
- Move the soul section cards out of the left rail and render them in the right soul panel instead.

# Route
- Route A
- Reason: narrow layout move isolated to the soul section rendering and its assertions.

# Writer Slot
- main: implementation
- worker-panel: idle
- worker-nav: idle

# Contract Freeze
- Goal: remove the left-rail soul cards and show the same soul cards in the right soul panel instead.
- Non-goals: do not change data registries or the journal modal export text.
  - Acceptance criteria:
  - The left rail no longer renders the soul section cards.
  - Selecting soul mode renders the soul cards in the right panel.
  - Existing commentary content and selection behavior remain intact.

# Reviewer
- reviewer-layout: soul-panel relocation regression review

# Last Update
- 2026-04-21: resolved soul-card relocation to the right panel; verification passed.
