# Current Task
- Active: make the global page header visually shorter while keeping the same layout and controls.

# Route
- Route B
- Reason: this spans the shared header plus two child controls across multiple files, so it needs a worker/reviewer pass.

# Writer Slot
- main: implementation lane for header compression

# Contract Freeze
- Goal: reduce the visual height of the global header without changing its content or behavior.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, or commentary content
  - do not alter user-provided untracked folders/files
  - do not redesign the header beyond tightening spacing and control sizes
- Write sets:
  - main:
    - `src/components/Header.tsx`
    - `src/components/CommentaryModeTabs.tsx`
    - `src/components/DatePicker.tsx`
- Acceptance criteria:
  - the header uses less vertical space on desktop and mobile
  - the title, tabs, date picker, and today button still render and function the same
  - `npm.cmd run lint` and `npm.cmd run build` pass
- Why this is Route B:
  - this is a small layout-only tweak, but it spans multiple components and needs a reviewer pass.

# Reviewer
- reviewer: complete

# Last Update
- 2026-05-26: softened the mobile header compression; lint and build passed.
