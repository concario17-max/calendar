# Current Task
- Completed: show the soul section body with week numbers plus date ranges in `src/components/SoulCalendarSection.tsx`.

# Route
- Route A
- Reason: single-file display hotfix in `src/components/SoulCalendarSection.tsx` with no shared-asset or multi-file coordination.

# Writer Slot
- main: implementation

# Contract Freeze
- Goal: show the soul section body as week numbers plus date ranges, e.g. `51주. 3월 23-29 / 2주. 4월 14-20`.
- Non-goals: no data changes, no commentary registry changes, no behavior changes, no layout changes.
- Acceptance criteria:
  - The soul visible text line includes the week number and date range for the active sections.
  - The format stays readable and left-aligned in the existing soul section.
  - No other layout or commentary behavior changes.

# Reviewer
- not required for Route A small-slice hotfix

# Last Update
- 2026-04-19: soul date-range display change completed
