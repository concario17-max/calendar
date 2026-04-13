# Current Task
- Completed: Implement the commentary source toggle end-to-end, including gua/yao commentary sources and the April 7 mapping.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: let the commentary panel toggle between gua content and yao content, with the toggle placed beside the existing Commentary label, and verify the April 7 mapping (gua 5, yao 25).
- Non-goals: no layout rewrite outside the commentary panel, no data migration away from existing text files, no deployment work.
- Acceptance criteria:
  - Commentary can switch between gua and yao sources.
  - The toggle sits next to the Commentary label.
  - April 7 resolves to gua 5 and yao 25.
  - The commentary source selection is testable and covered by tests.
  - The April 7 mapping is covered at the hook or logic layer.
  - Build and tests pass.
- Risks:
  - The current data model may need a minimal extension to carry both commentary sources cleanly.
  - UI state can drift if the toggle is not wired through a single source of truth.
  - This slice stays single-worker because the commentary source, date mapping, and rendered panel are one tightly coupled flow.

# Write Sets
- worker_impl: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx, src/hooks/useCalendarLogic.ts, src/hooks/useCalendarLogic.test.ts, src/types/index.ts, src/data/index.ts, src/data/yaoCommentary.ts, src/data/guaCommentary.ts, src/data/guaCommentary.test.ts
- reviewer: commentary source toggle and April 7 mapping

# Reviewer
- reviewer: commentary source toggle and April 7 mapping

# Last Update
- 2026-04-13: commentary source toggle verified with targeted tests and build
