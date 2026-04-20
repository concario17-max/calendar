# Current Task
- Resolved: swapped the left rail order so `효사` appears before `괘사`, and halved the sigil vertical spacing.

# Route
- Route B
- Reason: the change touches the shared reading panel layout and its regression tests, so the panel order and spacing need to be updated together.

# Writer Slot
- main: planner only
- worker-shell: `src/components/Header.tsx`, `src/components/MainContent.tsx`
- worker-panel: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: reorder the left rail to show `효사` before `괘사`, and reduce the sigil vertical spacing by half.
- Non-goals: do not change the data model or commentary content.
  - Acceptance criteria:
  - The left rail shows the `효사` block before the `괘사` block.
  - The sigil vertical spacing is visibly tighter, roughly half of the current spacing.
  - The commentary behavior and data registries remain intact.

# Reviewer
- reviewer-layout: left-rail order and spacing regression review

# Last Update
- 2026-04-20: completed the left-rail order swap and sigil spacing reduction, then closed the task
