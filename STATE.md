# Current Task
- Resolved: regrouped the left panel into one main reading block and two aligned reference blocks so the panel reads as a cleaner stack.

# Route
- Route B
- Reason: the change spans the shared reading panel layout and its regression tests, so the panel hierarchy and spacing need to be updated together.

# Writer Slot
- main: planner only
- worker-panel: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: make the left panel read as one main reading block plus two smaller reference blocks, all aligned to the same left edge and spacing rhythm.
- Non-goals: do not change the data model or commentary content.
  - Acceptance criteria:
  - The current top reading block remains the visual lead.
  - The `7. ☷☵ 師 사 : 화-수` block and the Soul block read as smaller, aligned reference blocks.
  - The left panel feels less fragmented and more intentional.

# Reviewer
- reviewer-layout: left-panel hierarchy and spacing regression review

# Last Update
- 2026-04-20: completed the left-panel hierarchy regrouping and closed the task
