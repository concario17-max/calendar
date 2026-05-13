# Current Task
- Completed: optimize the current two-panel reading layout by re-centering the left rail content, widening the right reading canvas, tightening left vertical rhythm, and improving header-to-body flow.

# Route
- Route B
- Reason: the scope spans shared shell styling plus panel-specific layout across multiple files, needs coordinated write sets, and requires both worker implementation and reviewer verification.

# Writer Slot
- main: planner-only; may edit `STATE.md` and `MULTI_AGENT_LOG.md` only

# Contract Freeze
- Goal: make the current layout feel more balanced by shifting the left rail content inward, giving the right panel more usable reading width, aligning visual start lines across both panels, tightening the left stack spacing, and smoothing the handoff from header to content.
- Non-goals: do not change commentary data, do not redesign the comic/text switching behavior, and do not alter the underlying date/content selection logic.
- Write sets:
  - worker-shell: `src/index.css`, `src/components/Header.tsx`, `src/components/Header.test.tsx`
  - worker-rail: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - the left rail content starts farther inward and feels easier to scan.
  - the right reading canvas uses more of the available width without breaking the document rhythm.
  - the left and right content feel more aligned around a common visual center.
  - left rail spacing feels tighter and more intentional.
  - the header-to-content transition feels less detached.
  - targeted verification passes.

# Reviewer
- completed: reviewer pass found no concrete regressions; residual risk is limited to unverified visual behavior around the 768px/1024px breakpoints.

# Last Update
- 2026-05-13: Route B integration verified with targeted tests and build; reviewer pass completed and task closed.
