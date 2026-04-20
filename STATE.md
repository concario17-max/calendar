# Current Task
- Active: Pretendard-first typography with serif reserved for titles only, implemented and verified.

# Route
- Route B
- Reason: the typography change spans shared tokens plus multiple header and reading components, so shell and panel typography must be updated together.

# Writer Slot
- main: planner only
- worker-shell: `src/components/Header.tsx`, `src/components/MainContent.tsx`, `tailwind.config.js`, `src/index.css`
- worker-panel: `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/Header.test.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: make Pretendard the default UI/body font and reserve serif styling for titles only.
- Non-goals: do not change the data model or commentary content.
  - Acceptance criteria:
  - Body text, controls, labels, and non-title reading text render in Pretendard.
  - Header title and the primary reading titles keep a single serif treatment.
  - The existing header controls and commentary behavior remain intact.
  - No data registry content changes are introduced.

# Reviewer
- reviewer-typography: font-family and title-scale regression review

# Last Update
- 2026-04-20: implemented and verified Pretendard-first typography with serif titles only; body text, controls, and labels now use Pretendard while title surfaces keep the serif treatment
