# Current Task
- Resolved: normalized title widths to `max-w-[40ch]` for the reading titles.

# Route
- Route A
- Reason: this is a narrow typography tweak limited to title widths in the reading components.

# Writer Slot
- main: planner only
- worker-panel: `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: make the main reading titles use `max-w-[40ch]`.
- Non-goals: do not change the data registries, commentary content, or non-title body widths.
  - Acceptance criteria:
  - The ??, ??, and ?? titles use the same `max-w-[40ch]` cap.
  - The rest of the reading/content behavior remains intact.

# Reviewer
- reviewer-layout: title-width regression review

# Last Update
- 2026-04-21: resolved title-width normalization.
