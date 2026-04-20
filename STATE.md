# Current Task
- Completed: recreated the app to match the `design` folder directly, replacing the previous layout system with the reference editorial pattern.

# Route
- Route B
- Reason: the change spans shared shell styling, the side rail, the reading canvas, typography, and global surface tokens across multiple files.

# Writer Slot
- main: planner only
- worker-shell: `src/components/MainContent.tsx`, `src/components/Header.tsx`, `src/index.css`, `tailwind.config.js`
- worker-panel: `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`
- worker-nav: `src/components/Header.tsx`, `src/components/MainContent.tsx`

# Contract Freeze
- Goal: recreate the app so it matches the `design` folder's editorial pattern directly, with a fixed left manifesto-like rail, a separate right reading canvas, a thin top bar, and surface contrast replacing the old card-heavy layout.
- Non-goals: no data changes, no commentary registry changes, no content rewrites.
  - Acceptance criteria:
  - The left rail is fixed-width and reads like the design reference's manifesto panel.
  - The right panel is a separate reading canvas with a cleaner editorial flow.
  - The top bar is thin and minimal, not a heavy app header.
  - Surface contrast, spacing, and typography carry most of the visual separation.
  - Borders/dividers are minimized or eliminated wherever possible in favor of tonal layering.
  - The current data and commentary behavior remain intact.

# Reviewer
- reviewer-layout: editorial fidelity, fixed-rail, and border-minimal regression review

# Last Update
- 2026-04-20: rebuilt the shared shell and verified production build plus targeted component tests
