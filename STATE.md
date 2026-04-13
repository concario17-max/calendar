# Current Task
- Completed: Tighten pipe-table detection so only real tables render as tables.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: render only true pipe tables as semantic tables while keeping pipe-heavy prose as normal paragraphs.
- Non-goals: no data model changes, no deployment work, no header/shell changes.
- Acceptance criteria:
  - Only blocks with 3+ columns per row render as tables.
  - Non-table commentary still renders as normal prose.
  - The tests match the rendered DOM.
  - Build and tests pass.
- Risks:
  - Overly strict detection may leave a real table rendered as prose if any row is malformed.

# Write Sets
- worker_impl: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx
- reviewer: table rendering and commentary layout

# Reviewer
- reviewer: table rendering and commentary layout

# Last Update
- 2026-04-13: pipe-table detection tightened and verified
