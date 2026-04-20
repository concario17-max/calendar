# Current Task
- Active: UI density and visual rhythm refinement implemented and verified.

# Route
- Route B
- Reason: the change spans the shared shell controls plus both reading panels and the shared design tokens, so shell and panel spacing must be updated together.

# Writer Slot
- main: planner only
- worker-shell: `src/components/Header.tsx`, `src/components/MainContent.tsx`, `src/index.css`, `tailwind.config.js`
- worker-panel: `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/Header.test.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: reduce visual density without changing the reading data or commentary behavior.
- Non-goals: do not change the data model or commentary content.
  - Acceptance criteria:
  - Header controls read less crowded.
  - Left rail top spacing is more compact without clipping the content.
  - Right commentary blocks have clearer rhythm and spacing.
  - Soul remains visually quieter than the main reading text.
  - Gold accents are reduced to true emphasis points only.
  - No data registry content changes are introduced.

# Reviewer
- reviewer-layout: spacing, rhythm, and accent-color regression review

# Last Update
- 2026-04-20: implemented and verified the UI density and rhythm refinement; header controls, left rail spacing, right commentary spacing, and accent usage were tightened without changing registries
