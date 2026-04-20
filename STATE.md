# Current Task
- Resolved: swapped the left rail order back so `효사` appears before `괘사`.

# Route
- Route B
- Reason: the change touches the shared reading panel layout and its regression tests, so the panel order needs to be updated together.

# Writer Slot
- main: planner only
- worker-panel: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: restore the left rail to show the `효사` block before the `괘사` block.
- Non-goals: do not change the data model or commentary content.
  - Acceptance criteria:
  - The left rail shows the `효사` block before the `괘사` block.
  - The sigil spacing remains as recently adjusted.
  - The commentary behavior and data registries remain intact.

# Reviewer
- reviewer-layout: left-rail order regression review

# Last Update
- 2026-04-20: restored the `효사`-before-`괘사` order and closed the task
