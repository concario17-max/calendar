# Current Task
- Completed: emphasize the `🔑 핵심 키워드:` line in the right-side commentary panels using a subtle text-background highlight while leaving the rest of the layout unchanged.

# Route
- Route B
- Reason: the keyword emphasis touches the shared right-side commentary renderer and its tests, and the change is tightly coupled to the same right-panel slice.

# Writer Slot
- main: planner only
- worker-keyword: idle
- worker-review: idle

# Contract Freeze
- Goal: add a restrained background highlight to the `🔑 핵심 키워드:` line in the right-side commentary panels so the keyword lead line reads as a deliberate accent without changing the rest of the layout.
- Non-goals: do not change data registries, left-rail layout, section ordering, selection behavior, or the wording/content of the keyword line itself.
- Write sets:
  - worker-keyword: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - The `🔑 핵심 키워드:` line has a subtle highlighted background.
  - The highlight stays restrained and does not affect other commentary lines.
  - The rest of the right-side layout remains unchanged.
  - Targeted tests and build continue to pass.

# Reviewer
- reviewer-keyword-panel: keyword emphasis review

# Last Update
- 2026-04-22: highlighted the keyword lead line in the right-side commentary panels without changing the rest of the layout.
