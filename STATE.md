# Current Task
- Active: remove the legacy `image/괘사` asset path and keep 괘사 learning-comic loading sourced only from `학습만화/괘사`.

# Route
- Route A
- Reason: this is a small cleanup of one legacy asset path plus the matching loader/test updates in the same commentary image-loading slice.

# Writer Slot
- main: removing the legacy 괘사 image path and tightening the commentary image loader directly

# Contract Freeze
- Goal: remove `image/괘사` from both the filesystem and the loader path while keeping 괘사 학습만화 working from `학습만화/괘사`.
- Non-goals: do not redesign the UI, do not alter 효사 or soul behavior beyond shared loader safety, and do not touch unrelated commentary parsing.
- Write sets:
  - main: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`, `STATE.md`
- Acceptance criteria:
  - The legacy `image/괘사` file is removed.
  - 괘사 학습만화 still loads from `학습만화/괘사`.
  - Targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-12: re-scoped the task to remove the legacy `image/괘사` path and rely on `학습만화/괘사` only.
