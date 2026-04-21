# Current Task
- Resolved: updated the soul title range format to `50주(3월 16-22) / 3주(4월 21-27)`.

# Route
- Route B
- Reason: the change touches shared soul rendering plus tests, so the route stays on the multi-file review path.

# Writer Slot
- main: planner only
- worker-panel: `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: display the soul range line as `50주(3월 16-22) / 3주(4월 21-27)`.
- Non-goals: do not change the data registries or commentary content.
  - Acceptance criteria:
  - The soul title slot renders the two visible ranges without the `일` suffix.
  - The rest of the reading/content behavior remains intact.

# Reviewer
- reviewer-layout: soul formatting regression review

# Last Update
- 2026-04-21: resolved soul title-range formatting update.