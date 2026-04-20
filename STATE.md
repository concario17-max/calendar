# Current Task
- Active: move the `효사 / 괘사 / 영혼` segmented buttons into the header next to the calendar control, and remove the in-content segmented control.

# Route
- Route B
- Reason: the change touches both the header shell and the reading panel, with control placement moving across shared surfaces and the in-content control being removed.

# Writer Slot
- main: planner only
- worker-shell: `src/components/Header.tsx`, `src/components/MainContent.tsx`, `src/components/IChingSection.tsx`
- worker-panel: idle
- worker-nav: idle

# Contract Freeze
- Goal: move the `효사 / 괘사 / 영혼` segmented buttons into the header next to the calendar control and remove the duplicated in-content segmented control.
- Non-goals: do not change the data model and do not alter commentary content.
  - Acceptance criteria:
  - The segmented control appears in the header beside the calendar control.
  - The old in-content segmented control is removed from the reading area.
  - The header remains visually thin and minimal.
  - The current data and commentary behavior remain intact.
  - A single worker owns the header/panel adjustment because the thread limit prevented a clean split into two implementation lanes.

# Reviewer
- reviewer-header: header layout fidelity and control placement review

# Last Update
- 2026-04-20: re-scoped the task to move the segmented control into the header beside the calendar control and remove the duplicate in-content control; worker split collapsed into one lane due thread limit
