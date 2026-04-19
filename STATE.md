# Current Task
- Completed: formatted the soul section line as `51주(3월 23-29일) / 2주(4월 14-20일)` in `src/components/SoulCalendarSection.tsx`.

# Route
- Route A
- Reason: single-file display hotfix in `src/components/SoulCalendarSection.tsx` with no shared-asset or multi-file coordination.

# Writer Slot
- main: implementation

# Contract Freeze
- Goal: show the soul section body as `51주(3월 23-29일) / 2주(4월 14-20일)` style week/date strings.
- Non-goals: no data changes, no commentary registry changes, no behavior changes, no layout changes.
- Acceptance criteria:
  - The soul visible text line uses `week + parenthesized date range + 일` formatting for the active sections.
  - The format stays readable and left-aligned in the existing soul section.
  - No other layout or commentary behavior changes.

# Reviewer
- not required for Route A small-slice hotfix

# Last Update
- 2026-04-19: soul date-range formatting completed
