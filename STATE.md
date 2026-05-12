# Current Task
- Active: update the tracked `image/괘사` folder so it matches the latest 괘사 학습만화 assets now present in the workspace.

# Route
- Route A
- Reason: this is a single-slice asset sync inside one existing feature path with no code redesign or multi-surface implementation split.

# Writer Slot
- main: syncing the 괘사 learning-comic image assets directly

# Contract Freeze
- Goal: make `image/괘사` reflect the latest 괘사 학습만화 set available locally.
- Non-goals: do not redesign the UI, do not alter commentary logic, and do not touch unrelated user files outside the target asset sync.
- Write sets:
  - main: `STATE.md`, `image/괘사/*`
- Acceptance criteria:
  - The latest 괘사 learning-comic files are present in `image/괘사`.
  - Existing tracked image targets are updated to the new versions where applicable.
  - The resulting asset folder contents are verified locally.

# Reviewer
- self-review of source/target file lists and git worktree state

# Last Update
- 2026-05-12: re-scoped the task from rollback work to syncing the latest 괘사 learning-comic assets into `image/괘사`.
