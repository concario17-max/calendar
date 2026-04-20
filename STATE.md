# Current Task
- Active: restore the `Today` button block and theme toggle in the header while keeping the `효사 / 괘사 / 영혼` segmented control to the left of the calendar control and preserving the shell chrome label cleanup.

# Route
- Route B
- Reason: the change touches shared shell chrome and panel labels across multiple components, so the shell and panel must be updated together.

# Writer Slot
- main: planner only
- worker-shell: `src/components/Header.tsx`, `src/components/MainContent.tsx`
- worker-panel: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: restore the `Today` button block and theme toggle in the header while keeping the segmented control in the header to the left of the calendar control, and preserve the shell chrome label cleanup.
- Non-goals: do not change the data model or commentary content.
  - Acceptance criteria:
  - The left rail no longer shows `Manifesto` or `Reading rail`.
  - The right area no longer shows `Commentary` or `Reading canvas`.
  - The header title reads `Celestial Ephemeris`.
  - The segmented control remains in the header to the left of the calendar control.
  - The `Today` button block and theme toggle are present in the header.
  - The current data and commentary behavior remain intact.

# Reviewer
- reviewer-layout: shell chrome and label removal review

# Last Update
- 2026-04-20: restored the Today block and theme toggle in the header while keeping the shell chrome label cleanup intact; tests and build passed
