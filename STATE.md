# Current Task
- Active: fix the bonus-day empty-state regression where `IChingSection` exits early with `Reading data is not available yet.` before it can render bonus items.

# Route
- Route A
- Reason: this is a tiny local hotfix in a single implementation file to relax an incorrect early-return guard for bonus days without changing the broader bonus-source contract.

# Writer Slot
- main: write-capable lane for `STATE.md`, `ERROR_LOG.md`, and `src/components/IChingSection.tsx`

# Contract Freeze
- Goal: allow bonus days to render from `bonusGuaItems` / `bonusYaoItems` even when regular `guaData` and `yaoData` are null for April 2-6.
- Non-goals:
  - do not redesign the header
  - do not alter the existing regular-date numbering rules or bonus source files
  - do not touch unrelated in-progress header extraction files (`src/components/Header.tsx`, `src/components/Header.test.tsx`, `src/components/CommentaryModeTabs.tsx`)
  - do not add browser verification
- Write sets:
  - main: `STATE.md`
  - main: `ERROR_LOG.md`
  - main: `src/components/IChingSection.tsx`
- Acceptance criteria:
  - bonus dates no longer hit the generic `Reading data is not available yet.` empty state solely because regular `guaData` / `yaoData` are null
  - regular dates keep current behavior unchanged
  - `npm.cmd run build` passes
- Why the write split is safe:
  - the regression is caused by one guard in the section component
  - no data generation, hook, asset, or shared header work needs to move

# Reviewer
- reviewer: not required for this Route A one-file guard fix

# Last Update
- 2026-05-16: reclassified the follow-up regression as a Route A single-file hotfix for the bonus-day early-return guard in `IChingSection`.
