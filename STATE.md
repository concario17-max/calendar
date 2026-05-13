# Current Task
- Active: sync the newly added 효사 학습만화 assets from `image/효사` into the repository so the commentary comic view can use them.

# Route
- Route A
- Reason: this is a contained asset-sync slice limited to one existing image directory with no code-path redesign.

# Writer Slot
- main: staging and publishing the refreshed 효사 comic assets directly

# Contract Freeze
- Goal: publish the newly added and updated 효사 학습만화 files under `image/효사` so they are included by the existing loader.
- Non-goals: do not redesign UI, do not change image-loading code, and do not touch unrelated asset folders.
- Write sets:
  - main: `STATE.md`, `image/효사/*`
- Acceptance criteria:
  - new 효사 이미지 files are staged and committed from `image/효사`.
  - updated existing 효사 이미지 files are included.
  - repository verification appropriate to this asset-only change is recorded.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-13: re-scoped the task from commentary default-mode behavior to 효사 comic asset sync.
