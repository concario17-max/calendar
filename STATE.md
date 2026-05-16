# Current Task
- Active: simplify the left rail on bonus days by hiding the sigil plus the default 효사/괘사 summary blocks while keeping the 영혼 block visible.

# Route
- Route A
- Reason: this is a tiny single-component UI hotfix in `src/components/IChingSection.tsx` that conditionally hides three left-rail blocks for bonus days without changing shared data or tests.

# Writer Slot
- main: write-capable lane for `STATE.md` and `src/components/IChingSection.tsx`

# Contract Freeze
- Goal: when any bonus-day reading is active, hide the left-rail sigil plus the 효사/괘사 manuscript units, while preserving the bonus selector cards and the 영혼 block.
- Non-goals:
  - do not redesign the header
  - do not alter the existing regular-date numbering rules or bonus source files
  - do not touch unrelated in-progress header extraction files (`src/components/Header.tsx`, `src/components/Header.test.tsx`, `src/components/CommentaryModeTabs.tsx`)
  - do not add browser verification
- Write sets:
  - main: `STATE.md`
  - main: `src/components/IChingSection.tsx`
- Acceptance criteria:
  - bonus-day left rail no longer shows `Sigil not available`, the default 효사 summary block, or the default 괘사 summary block
  - the bonus selector cards remain visible
  - the 영혼 block remains visible
  - regular dates keep current behavior unchanged
  - `npm.cmd run build` passes
- Why the write split is safe:
  - the change is contained to conditional rendering in one component
  - no hook, asset, or shared header work needs to move

# Reviewer
- reviewer: not required for this Route A one-file rendering fix

# Last Update
- 2026-05-16: reclassified the follow-up as a Route A one-file UI cleanup for the bonus-day left rail.
