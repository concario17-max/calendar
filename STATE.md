# Current Task
- Completed: renamed the three right-side panel header labels to `오늘의 효사`, `오늘의 괘사`, and `루돌프 슈타이너의 영혼의 달력`.

# Route
- Route B
- Reason: the change touches the shared right-side commentary chrome across multiple panel headers and the soul panel header copy.

# Writer Slot
- main: planner only
- worker-panel: `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`
- worker-review: review of right-panel header copy and label consistency

# Contract Freeze
- Goal: rename the three right-side panel header labels to `오늘의 효사`, `오늘의 괘사`, and `루돌프 슈타이너의 영혼의 달력`.
- Non-goals: do not change data registries, commentary content, or left-rail layout.
- Acceptance criteria:
  - The three right-side panels show the requested Korean header copy.
  - Existing commentary content and selection behavior remain intact.

# Reviewer
- reviewer-layout: right-panel header copy review

# Last Update
- 2026-04-22: renamed the right-side panel headers and verified the targeted tests plus build.
