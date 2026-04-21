# Current Task
- Resolved: unified the body font size across `효사`, `괘사`, and `소울`, and added breathing room below the soul block.

# Route
- Route B
- Reason: the change touches shared typography, spacing, and regression coverage across multiple section components.

# Writer Slot
- main: planner only
- worker-panel: `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: make the body font size consistent across `효사`, `괘사`, and `소울`, and give the soul section more bottom spacing so it does not feel cramped.
- Non-goals: do not change the data registries or commentary content.
  - Acceptance criteria:
  - The body font size is uniform across `효사`, `괘사`, and `소울`.
  - The soul block has visible bottom breathing room.
  - The rest of the reading/content behavior remains intact.

# Reviewer
- reviewer-layout: typography and spacing regression review

# Last Update
- 2026-04-21: completed typography unification and soul bottom spacing
