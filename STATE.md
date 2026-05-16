# Current Task
- Active: sync the newly added `image/효사` learning-comic assets into the repository without changing loader logic.

# Route
- Route A
- Reason: this is a contained asset-only sync in one directory with no implementation logic changes.

# Writer Slot
- main: updating the tracked 효사 comic assets directly

# Contract Freeze
- Goal: add the newly provided 효사 learning-comic image files under `image/효사` so the existing glob loader can pick them up automatically.
- Non-goals: do not modify rendering logic, do not rename files, and do not touch unrelated in-progress header extraction files or untracked folders.
- Write sets:
  - main: `STATE.md`, `image/효사/*`
- Acceptance criteria:
  - all newly provided 효사 comic image files are tracked.
  - existing loader behavior remains unchanged.
  - verification confirms the new assets are present, with any verification gap reported honestly if unrelated worktree changes block a full build.

# Reviewer
- self-review after asset verification

# Last Update
- 2026-05-16: re-scoped the active task to sync the newly added `image/효사` files `378.png` through `384.png`.
