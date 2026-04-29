# Current Task
- Completed: compact the header commentary segmented chips as well as the left-panel badges.

# Route
- Route B
- Reason: the visible issue was in shared header controls and tests, not only the left reading panel.

# Writer Slot
- main: completed hotfix under subagent constraint conflict
- worker-left-badge-restore: completed
- worker-review: completed

# Contract Freeze
- Goal: make the visible `È¿»ç / ±¥»ç / ¿µÈ¥` chips compact in the header and keep the left-panel badges compact.
- Non-goals: do not change registries, commentary content, learning-comic slot behavior, or panel layout.
- Write sets:
  - main-hotfix: `src/components/Header.tsx`, `src/components/Header.test.tsx`
- Acceptance criteria:
  - Header `È¿»ç / ±¥»ç / ¿µÈ¥` chips are visibly tighter.
  - Header tests use the correct Korean labels.
  - Existing build and targeted tests pass.

# Reviewer
- self-review: targeted hotfix review completed

# Last Update
- 2026-04-29: compacted the visible header segmented chips and verified targeted tests plus build.
