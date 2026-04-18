# Current Task
- Completed: Fix dark-mode contrast in the poster-like split layout so the left reading field stays visibly darker than the right commentary panel.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: keep the poster-like split layout while correcting dark-mode contrast so the left reading field reads darker than the right commentary panel in both themes.
- Non-goals: no commentary registry updates, no data regeneration, no deployment work, no unrelated typography overhaul.
- Acceptance criteria:
  - The left side still reads as a direct background field rather than a boxed card shell.
  - Gua, yao, and soul remain on the same left background and are separated by lines only.
  - The left background is visibly darker than the right commentary panel in both light and dark themes.
  - The right commentary area stays readable and uses section blocks rather than nested boxed subcards.
  - Build and tests pass after the layout-only changes.

# Write Sets
- worker_shared: src/App.tsx, src/index.css, src/components/MainContent.tsx
- worker_left: src/components/IChingSection.tsx, src/components/SoulCalendarSection.tsx, src/components/IChingSection.test.tsx, src/components/SoulCalendarSection.test.tsx
- worker_right: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: poster-like left background layout and right commentary panel separation

# Last Update
- 2026-04-18: finalized the poster-style layout with dark-mode contrast corrected and boxed empty states removed
