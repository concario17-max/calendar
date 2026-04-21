# Current Task
- Resolved: renamed the soul section to `슈타이너의 영혼의 달력`, removed the English soul title, and moved the week range into the title slot.

# Route
- Route B
- Reason: the change touches shared header/section copy, left-panel typography, and regression coverage across multiple files.

# Writer Slot
- main: planner only
- worker-panel: `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: change the soul section to a Korean title, remove the English title from the UI, and show the week range in the title slot so the soul block reads as a localized section header.
- Non-goals: do not change the data registries or commentary content.
  - Acceptance criteria:
  - The soul section title reads `슈타이너의 영혼의 달력`.
  - The English title `Rudolf Steiner's Calendar of the Soul` no longer appears in the UI.
  - The week range is shown in the title area, not as a separate English heading.
  - The rest of the reading/content behavior remains intact.

# Reviewer
- reviewer-layout: soul title and header copy regression review

# Last Update
- 2026-04-21: localized the soul section title and moved the week range into the title slot
