# Current Task
- Active: keep the desktop prev/next day arrow controls floating beside the body margins while the reading panel scrolls, and keep the one-day date navigation wired up.

# Route
- Route A
- Reason: this is a contained follow-up UI hotfix inside `src/components/IChingSection.tsx` plus task-state logging in `STATE.md`, with no shared data, assets, tests, or cross-directory changes required.

# Writer Slot
- main: write-capable lane for `STATE.md` and `src/components/IChingSection.tsx`

# Contract Freeze
- Goal: keep the previous-day and next-day arrow buttons floating beside the main reading body margins on desktop even while the right reading panel scrolls, while still moving the selected date by one day backward or forward.
- Non-goals:
  - do not redesign the header
  - do not change the bonus-day data model or commentary parsing
  - do not touch unrelated in-progress header extraction files (`src/components/Header.tsx`, `src/components/Header.test.tsx`, `src/components/CommentaryModeTabs.tsx`)
  - do not add browser verification
- Write sets:
  - main: `STATE.md`
  - main: `src/components/IChingSection.tsx`
- Acceptance criteria:
  - desktop view shows left and right arrow controls beside the main reading body area
  - desktop arrows stay visually floating while the right reading panel scrolls
  - clicking the left arrow moves to the previous calendar day
  - clicking the right arrow moves to the next calendar day
  - mobile layout does not get a cramped floating arrow treatment
  - `npm.cmd run build` passes
- Why the write split is safe:
  - state ownership and handlers are already wired, so this is just a local positioning change
  - no hook, parser, or data-file changes are needed

# Reviewer
- reviewer: not required for this Route A UI hotfix

# Last Update
- 2026-05-20: narrowed the Route A task to a sticky/floating follow-up for the existing body-side date navigation arrows.
