# Current Task
- Completed: update the soul section date-range label format to include explicit week ranges in parentheses.

# Route
- Route B
- Reason: the change touches shared presentation text and the corresponding test contract across at least two files.

# Writer Slot
- main: planner only
- worker-soul-label-format: completed
- worker-review: completed

# Contract Freeze
- Goal: change the soul section label from `50주 · 3주`-style to `50주(3월 16-22일) · 3주(4월 21-27일)`-style rendering.
- Non-goals: do not change commentary registries, navigation, header chrome, or the reading layout.
- Write sets:
  - worker-soul-label-format: `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- Acceptance criteria:
  - Soul section renders week labels with explicit parenthesized date ranges.
  - Existing soul title and layout remain intact.
  - Targeted tests and build continue to pass.

# Reviewer
- reviewer-soul-label-format: soul label format review

# Last Update
- 2026-04-22: soul label date-range format update implemented and verified.
