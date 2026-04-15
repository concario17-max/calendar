# Current Task
- Completed: Hide the fixed date picker and theme toggle header when the user scrolls down.

# Route
- Route A

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: hide the floating date picker and theme toggle header while scrolling down, and show it again near the top.
- Non-goals: no content routing change, no commentary registry rewrite, no deployment work, no unrelated layout work.
- Acceptance criteria:
  - The fixed header controls fade out or move away when the page scrolls down.
  - The controls reappear when the page returns near the top.
  - Build and tests pass.
- Risks:
  - The threshold could feel too eager or too sticky if the scroll state is too sensitive.

# Write Sets
- main_impl: src/App.tsx, src/components/Header.tsx

# Reviewer
- reviewer: scroll-hiding header controls

# Last Update
- 2026-04-15: scroll-hiding header controls completed
