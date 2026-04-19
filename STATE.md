# Current Task
- Completed: unified the visible reading typography by removing the serif brand font from the main reading view and aligning the section title sizes.

# Route
- Route B
- Reason: this touched multiple components in the shared reading view and required coordinated typography changes across the left rail and soul header.

# Writer Slot
- main: planner-only
- worker-1: typography implementation
- reviewer: typography consistency review

# Contract Freeze
- Goal: make the visible reading UI use one coherent typography system with fewer font families and more consistent title sizes.
- Non-goals: no commentary registry updates, no data regeneration, no layout redesign, no deployment work.
- Acceptance criteria:
  - The main reading headings use the same font family as the body text instead of the serif brand font.
  - The soul header matches the rest of the reading view typography more closely.
  - Title sizes follow a cleaner shared scale.
  - Build passes after the change.

# Write Sets
- worker-1: src/components/IChingSection.tsx; src/components/SoulCalendarSection.tsx

# Reviewer
- reviewer: typography consistency and hierarchy regression

# Last Update
- 2026-04-19: completed the typography unification and reviewer re-check
