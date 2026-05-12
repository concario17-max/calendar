# Current Task
- Active: support nested `[[list]]` / `[[item]]` commentary markup so structured list content renders correctly instead of leaking raw markers.

# Route
- Route A
- Reason: this is a tight parser-and-renderer refinement limited to one feature component and its tests, with straightforward verification.

# Writer Slot
- main: implementing nested commentary list parsing directly

# Contract Freeze
- Goal: parse nested marker lists into a tree and render them semantically, while preserving existing table, paragraph, and flat-list behavior.
- Non-goals: do not change date logic, routing, soul behavior, learning-comic toggle behavior, or unrelated commentary layout.
- Write sets:
  - main: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - Valid nested `[[list]]` / `[[item]]` structures render as nested lists instead of raw marker text.
  - Existing flat marker lists and plain text/list/table parsing continue to work.
  - Existing targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-12: re-froze the task around nested marker-list parsing and rendering in commentary blocks.
