# Current Task
- Active: fix the tablet-width stacked layout scroll trap so the right commentary panel remains reachable and scrollable when it drops below the left panel.

# Route
- Route B
- Reason: this fix crosses shared responsive CSS, main layout structure, and verification updates, so Route A no longer fits once test coverage and multi-file responsive behavior are involved.

# Writer Slot
- main: planner-only; no implementation writes outside `STATE.md`

# Contract Freeze
- Goal: when the viewport is narrow enough that the right panel stacks beneath the left panel, the page must still scroll naturally so the entire right panel content is reachable.
- Non-goals: do not redesign desktop split behavior, do not change commentary content logic, and do not introduce browser-only verification requirements.
- Write sets:
  - worker_shared: `src/index.css`
  - worker_layout: `src/components/MainContent.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - stacked layout widths no longer trap the right panel below a hidden overflow boundary.
  - desktop split layout behavior remains intact.
  - relevant automated verification passes.

- contract_freeze: yes

# Reviewer
- reviewer: `019e1fcf-cef6-7a21-81e6-db4c4a7498a6`

# Last Update
- 2026-05-13: re-scoped the task from header dark-mode toggle removal to stacked-layout scroll recovery.
