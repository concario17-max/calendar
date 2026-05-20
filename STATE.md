# Current Task
- Active: add desktop prev/next day arrow controls in the body-side margins and wire them to date navigation.

# Route
- Route A
- Reason: this is a contained two-component UI hotfix inside `src/components/MainContent.tsx` and `src/components/IChingSection.tsx` with no shared data, assets, or cross-directory changes required.

# Writer Slot
- main: write-capable lane for `STATE.md`, `src/components/MainContent.tsx`, and `src/components/IChingSection.tsx`

# Contract Freeze
- Goal: add previous-day and next-day arrow buttons near the main reading body margins on desktop, and make them move the selected date by one day backward or forward.
- Non-goals:
  - do not redesign the header
  - do not change the bonus-day data model or commentary parsing
  - do not touch unrelated in-progress header extraction files (`src/components/Header.tsx`, `src/components/Header.test.tsx`, `src/components/CommentaryModeTabs.tsx`)
  - do not add browser verification
- Write sets:
  - main: `STATE.md`
  - main: `src/components/MainContent.tsx`
  - main: `src/components/IChingSection.tsx`
- Acceptance criteria:
  - desktop view shows left and right arrow controls beside the main reading body area
  - clicking the left arrow moves to the previous calendar day
  - clicking the right arrow moves to the next calendar day
  - mobile layout does not get a cramped floating arrow treatment
  - `npm.cmd run build` passes
- Why the write split is safe:
  - state ownership already lives in `MainContent`, so the change is just prop plumbing plus local rendering
  - no hook, parser, or data-file changes are needed

# Reviewer
- reviewer: not required for this Route A UI hotfix

# Last Update
- 2026-05-20: reclassified the task as a Route A date-navigation UI hotfix for the reading body margins.
