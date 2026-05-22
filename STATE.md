# Current Task
- Active: remove the header's surrounding top/bottom background so the header bar sits directly on the page canvas while preserving all current behavior.

# Route
- Route B
- Reason: the fix touches shared surface styling and needs coordinated implementation plus review under the workspace route rules.

# Writer Slot
- main: planner-only; may edit only STATE.md and MULTI_AGENT_LOG.md until contract freeze and write sets are recorded.

# Contract Freeze
- Goal: remove the decorative top/bottom background around the header while keeping the header content, controls, and sticky behavior unchanged.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not redesign the header beyond removing the surrounding background treatment
- Write sets:
  - worker_header_bg:
    - `src/index.css`
    - `src/components/Header.tsx`
  - reviewer_header_bg:
    - review the same files for visual regressions and behavior preservation
- Acceptance criteria:
  - the header no longer shows decorative top/bottom background bands
  - header content, sticky behavior, and controls remain unchanged
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route B:
  - this touches a shared surface style and needs explicit write-set ownership and review coordination.

# Reviewer
- reviewer: reviewer_header_bg

# Last Update
- 2026-05-22: header background-band removal implemented and verified with `npm.cmd run lint` and `npm.cmd run build`.
