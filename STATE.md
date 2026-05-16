# Current Task
- Active: extend the bonus-day data mapping so every null-date bonus day (`4/2`, `4/3`, `4/4`, `4/5`, `4/6`) uses the same populated bonus reading set instead of leaving only `4/5` connected.

# Route
- Route A
- Reason: this follow-up is a tiny one-file data-mapping change in `src/data/bonusReadings.ts`, with `STATE.md` updated for route logging, and does not require broader component or test changes.

# Writer Slot
- main: write-capable lane for `STATE.md`, `ERROR_LOG.md`, and `src/data/bonusReadings.ts`

# Contract Freeze
- Goal: map all bonus dates from April 2 through April 6 to the same populated bonus gua/yao number arrays that April 5 already uses.
- Non-goals:
  - do not redesign the header
  - do not alter the existing regular-date numbering rules or bonus source files
  - do not touch unrelated in-progress header extraction files (`src/components/Header.tsx`, `src/components/Header.test.tsx`, `src/components/CommentaryModeTabs.tsx`)
  - do not add browser verification
- Write sets:
  - main: `STATE.md`
  - main: `ERROR_LOG.md`
  - main: `src/data/bonusReadings.ts`
- Acceptance criteria:
  - `4/2`, `4/3`, `4/4`, and `4/6` expose the same bonus gua/yao arrays as `4/5`
  - regular dates keep current behavior unchanged
  - `npm.cmd run build` passes
- Why the write split is safe:
  - the remaining gap is only in the date-to-bonus-array mapping table
  - no component, hook, asset, or shared header work needs to move

# Reviewer
- reviewer: not required for this Route A one-file mapping fix

# Last Update
- 2026-05-16: reclassified the follow-up as a Route A one-file mapping update to connect every bonus date to the populated bonus reading arrays.
