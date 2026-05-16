# Current Task
- Active: stop bonus-day yao commentary from rendering the raw long-form body above the parsed commentary blocks.

# Route
- Route A
- Reason: this is a tiny single-component rendering hotfix in `src/components/IChingSection.tsx` that only changes the bonus yao commentary body condition without touching shared data, assets, or tests.

# Writer Slot
- main: write-capable lane for `STATE.md` and `src/components/IChingSection.tsx`

# Contract Freeze
- Goal: when a bonus-day yao entry is selected, do not render `activeYaoData.body` above the parsed commentary; only the parsed commentary blocks should remain.
- Non-goals:
  - do not redesign the header
  - do not alter bonus source files, parser logic, or image loading
  - do not touch unrelated in-progress header extraction files (`src/components/Header.tsx`, `src/components/Header.test.tsx`, `src/components/CommentaryModeTabs.tsx`)
  - do not add browser verification
- Write sets:
  - main: `STATE.md`
  - main: `src/components/IChingSection.tsx`
- Acceptance criteria:
  - bonus-day yao commentary no longer shows the raw long-form body block above the parsed commentary
  - bonus-day gua commentary behavior stays unchanged
  - regular-date yao commentary keeps current behavior unchanged
  - `npm.cmd run build` passes
- Why the write split is safe:
  - the bug is isolated to one render branch in one component
  - no shared data or parser changes are required for this hotfix

# Reviewer
- reviewer: not required for this Route A one-file rendering fix

# Last Update
- 2026-05-16: reclassified the task as a Route A one-file hotfix for bonus-day yao commentary rendering.
