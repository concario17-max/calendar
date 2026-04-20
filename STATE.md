# Current Task
- Active: Pretendard-only font stack is implemented and verified.

# Route
- Route B
- Reason: the font-stack change spans shared tokens plus multiple header, reading, and modal components, so shell and panel typography must be updated together.

# Writer Slot
- main: planner only
- worker-shell: `src/components/Header.tsx`, `src/components/MainContent.tsx`, `tailwind.config.js`, `src/index.css`
- worker-panel: `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/Header.test.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: make Pretendard the only font family used by the UI stack.
- Non-goals: do not change the data model or commentary content.
  - Acceptance criteria:
  - Body text, controls, labels, and reading titles render in Pretendard.
  - No serif font families remain in the application font stack.
  - The existing header controls and commentary behavior remain intact.
  - No data registry content changes are introduced.

# Reviewer
- reviewer-typography: font-stack and title-scale regression review

# Last Update
- 2026-04-20: implemented and verified the Pretendard-only UI font stack; serif font families were removed from the app font system and the body now loads Pretendard only
