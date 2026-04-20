# Current Task
- Resolved: differentiated `효사`, `괘사`, and `Soul` in the left panel so the reading stack is clearly hierarchical.

# Route
- Route B
- Reason: the change touches the shared left-panel typography and spacing hierarchy, so the reading stack needs to be updated together.

# Writer Slot
- main: planner only
- worker-panel: `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: make `효사` the visual lead, `괘사` a smaller supporting block, and `Soul` the quietest block in the left panel.
- Non-goals: do not change the data model or commentary content.
  - Acceptance criteria:
  - The left panel clearly reads as `효사` first, `괘사` second, `Soul` third.
  - The typography and spacing communicate a clear main/supporting/reference hierarchy.
  - The commentary behavior and data registries remain intact.

# Reviewer
- reviewer-layout: left-panel hierarchy regression review

# Last Update
- 2026-04-20: completed the left-panel hierarchy pass and closed the task
