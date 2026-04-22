# Current Task
- Active: remove the `2 blocks` count labels from the three right-side panels.

# Route
- Route B
- Reason: the change touches the shared right-side commentary chrome across multiple panel headers.

# Writer Slot
- main: planner only
- worker-panel: `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`
- worker-review: review of right-panel header chrome and remaining count labels

# Contract Freeze
- Goal: remove the `2 blocks` count labels from the three right-side panels.
- Non-goals: do not change data registries, commentary content, or left-rail layout.
- Acceptance criteria:
  - The three right-side panels no longer show any `2 blocks` count label.
  - Existing commentary content and selection behavior remain intact.

# Reviewer
- reviewer-layout: right-panel header chrome cleanup review

# Last Update
- 2026-04-22: removed the right-side `blocks` count labels and verified the targeted IChing and soul panel tests.
