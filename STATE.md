# Current Task
- Full-screen 50:50 left/right layout for the entire reading area, so the existing body stays on the left and commentary stays on the right, with future data-only updates as the maintenance path.

# Route
- Route B

# Writer Slot
- main: planner-only until contract freeze and write sets are recorded
- worker_shared: shared commentary data plumbing
- worker_feature: full-width split reading layout

# Contract Freeze
- Goal: convert the reading view into a reusable desktop split layout that renders the current verse/body on the left and commentary on the right, with mobile stacking preserved.
- Non-goals: no redesign of unrelated sections, no changes to soul calendar behavior, no deployment work, no app-wide data migration beyond the commentary plumbing needed for the split view.
- Acceptance criteria:
  - Desktop renders a full-width two-column layout that reads as the whole page split 50:50.
  - Left panel keeps the current body content.
  - Right panel shows commentary content.
  - Mobile stacks vertically and remains readable.
  - Layout is data-driven so future updates can be made by editing data, not component structure.
  - Build and tests pass after the change.
- Risks:
  - Existing tests/config may need restoration because the repo was rolled back to fc448dd.
  - Terminal output can mangle Korean strings, so verification must rely on runtime rendering and tests, not console text alone.

# Write Sets
- worker_shared: src/types/index.ts, src/hooks/useCalendarLogic.ts, src/data/yaoCommentary.ts, src/data/index.ts if needed
- worker_feature: src/components/IChingSection.tsx, src/components/MainContent.tsx, src/components/IChingSection.test.tsx if needed
- reviewer: Feynman

# Reviewer
- Feynman

# Last Update
- 2026-04-13: implementation complete; global split layout, commentary data plumbing, and role-based tests are passing
