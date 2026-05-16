# Current Task
- Active: fix the bonus-day empty-state regression where the bonus props are filtered too early and `IChingSection` falls back to `Reading data is not available yet.` before it can render both left-rail readings.

# Route
- Route A
- Reason: this is still a tiny local hotfix, but the root cause spans the bonus prop handoff in `MainContent` plus the guard fallback in `IChingSection`, so the write set expands to two tightly-coupled files in one feature slice without requiring shared-module or test edits.

# Writer Slot
- main: write-capable lane for `STATE.md`, `ERROR_LOG.md`, `src/components/MainContent.tsx`, and `src/components/IChingSection.tsx`

# Contract Freeze
- Goal: allow bonus days to render from `bonusGuaItems` / `bonusYaoItems` even when regular `guaData` and `yaoData` are null for April 2-6, including when the active commentary tab is only one side of the bonus set.
- Non-goals:
  - do not redesign the header
  - do not alter the existing regular-date numbering rules or bonus source files
  - do not touch unrelated in-progress header extraction files (`src/components/Header.tsx`, `src/components/Header.test.tsx`, `src/components/CommentaryModeTabs.tsx`)
  - do not add browser verification
- Write sets:
  - main: `STATE.md`
  - main: `ERROR_LOG.md`
  - main: `src/components/MainContent.tsx`
  - main: `src/components/IChingSection.tsx`
- Acceptance criteria:
  - bonus dates no longer hit the generic `Reading data is not available yet.` empty state solely because regular `guaData` / `yaoData` are null or because the inactive bonus array was filtered out upstream
  - regular dates keep current behavior unchanged
  - `npm.cmd run build` passes
- Why the write split is safe:
  - the regression is caused by one guard in the section component
  - no data generation, hook, asset, or shared header work needs to move

# Reviewer
- reviewer: not required for this Route A one-file guard fix

# Last Update
- 2026-05-16: expanded the same Route A hotfix to include `MainContent` after confirming the upstream bonus prop filtering was also causing the empty-state regression.
