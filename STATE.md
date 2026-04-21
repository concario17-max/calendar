# Current Task
- Resolved: added visible labels and subtle separators to distinguish `효사`, `괘사`, and `Soul` in the left panel.

# Route
- Route B
- Reason: the change touches the shared left-panel typography, separators, and regression coverage, so the reading stack needs to be updated together.

# Writer Slot
- main: planner only
- worker-panel: `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: make `효사` the visual lead, `괘사` a smaller supporting block, and `Soul` the quietest block in the left panel, with labels and separators that make the hierarchy obvious.
- Non-goals: do not change the data model or commentary content.
  - Acceptance criteria:
  - The left panel clearly reads as `효사` first, `괘사` second, `Soul` third.
  - The left panel shows visible labels and subtle separators for each block.
  - The typography, spacing, and separators communicate a clear main/supporting/reference hierarchy.
  - The commentary behavior and data registries remain intact.

# Reviewer
- reviewer-layout: left-panel hierarchy and label regression review

# Last Update
- 2026-04-21: completed the left-panel label and separator pass and closed the task
