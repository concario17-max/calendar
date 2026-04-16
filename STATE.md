# Current Task
- Completed: Fix commentary list bullets so rendered commentary list markers show as visible middle dots instead of a broken pseudo-element.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: replace the corrupted commentary list bullet pseudo-element in `src/components/IChingSection.tsx` with a visible middle-dot marker so rendered commentary lists display correctly.
- Non-goals: no commentary data regeneration, no layout redesign, no routing change, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - Commentary list items render with a visible bullet or middle-dot marker in the UI.
  - The list semantic structure remains intact.
  - Build and tests pass.

# Write Sets
- worker_layout: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: commentary bullet visibility

# Last Update
- 2026-04-16: bullet marker rendering was corrected by replacing the corrupted pseudo-element content with a visible middle-dot marker
