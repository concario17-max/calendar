# Current Task
- Resolved: normalize the soul test fixture to the same `50?(3? 16-22) / 3?(4? 21-27)` display format.

# Route
- Route A
- Reason: this is a one-file test fixture normalization that keeps the rendered soul format aligned.

# Writer Slot
- main: planner only
- worker-panel: `src/components/SoulCalendarSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: make the soul test fixture assert `50?(3? 16-22) / 3?(4? 21-27)`.
- Non-goals: do not change the data registries or commentary content.
  - Acceptance criteria:
  - The soul section test expects the no-`?` title format.
  - The rest of the reading/content behavior remains intact.

# Reviewer
- reviewer-layout: test-fixture normalization review

# Last Update
- 2026-04-21: resolved test-fixture normalization for the soul title format.
