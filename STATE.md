# Current Task
- Active: restore mobile date navigation while keeping the compact header and the stacked mobile panels.

# Route
- Route B
- Reason: the follow-up fix touches the shared header chrome and its test after the mobile layout work introduced a regression.

# Writer Slot
- main: planner only
- worker-mobile-header-fix: idle
- worker-review: idle

# Contract Freeze
- Goal: keep the header compact on mobile while restoring access to the date picker and Today control below the small-screen breakpoint.
- Non-goals: do not change data registries, the wording of the content, or the desktop two-column layout.
- Write sets:
  - worker-mobile-header-fix: `src/components/Header.tsx`, `src/components/Header.test.tsx`
- Acceptance criteria:
  - Mobile retains compact header chrome.
  - Date navigation remains available on small screens.
  - Desktop header behavior stays unchanged.
  - Targeted tests and build continue to pass.

# Reviewer
- reviewer-mobile-header-fix: mobile header regression review

# Last Update
- 2026-04-22: preparing a follow-up fix to restore mobile date navigation after compacting the header.
