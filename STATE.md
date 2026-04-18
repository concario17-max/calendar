# Current Task
- In progress: Remove the layered background shell and restack the left panel so the sigil sits at the top, followed by yao, gua, and soul in that order.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: remove the large background layer and restack the left panel into a single vertical flow: big centered sigil at the top, then yao, then gua, then soul.
- Non-goals: no commentary registry updates, no data regeneration, no deployment work, no unrelated typography overhaul, no commentary-panel redesign.
- Acceptance criteria:
  - The layered background shell is removed from the page.
  - The sigil is centered at the top of the left area and rendered at roughly triple the prior size.
  - Yao, gua, and soul appear below it in that order on the left side.
  - The right commentary area remains readable and unchanged unless needed for alignment.
  - Build and tests pass after the layout-only changes.

# Write Sets
- worker_shared: src/App.tsx, src/index.css, src/components/MainContent.tsx
- worker_left: src/components/IChingSection.tsx, src/components/SoulCalendarSection.tsx, src/components/IChingSection.test.tsx, src/components/SoulCalendarSection.test.tsx
- worker_right: none

# Reviewer
- reviewer: left background shell removed and left panel restacked in sigil/yao/gua/soul order

# Last Update
- 2026-04-18: starting implementation for the shared-shell-only layout pass; route stays Route B because the task spans 3 files and must remove the layered page shell without touching the section components
