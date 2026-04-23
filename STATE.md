# Current Task
- Completed: restore the left-panel `효사 / 괘사 / 소울` badges to a shorter original pill width.

# Route
- Route B
- Reason: the change touches shared reading-panel styling and the corresponding test contract across files.

# Writer Slot
- main: planner only
- worker-left-badge-restore: completed
- worker-review: completed

# Contract Freeze
- Goal: restore the left-panel `효사 / 괘사 / 소울` badges to a shorter original pill width.
- Non-goals: do not change registries, commentary content, the learning-comic slot, or the right-panel layout.
- Write sets:
  - worker-left-badge-restore: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - Left-panel `효사 / 괘사 / 소울` badges return to the shorter original pill width.
  - No changes to the right-panel learning-comic slot or content structure.
  - Targeted tests and build continue to pass.

# Reviewer
- reviewer-left-badge-restore: left badge restore review

# Last Update
- 2026-04-23: left-panel badge pills were tightened with reduced horizontal padding and tracking, then verified with the targeted test and build.