# Current Task
- Active: rename the header title to `Celestial Ephemeris`, keep the `효사 / 괘사 / 영혼` segmented control in the header to the left of the calendar control, and remove the shell chrome calendar text/button cluster, Today, theme, and panel labels.

# Route
- Route B
- Reason: the change touches shared shell chrome and panel labels across multiple components, so the shell and panel must be updated together.

# Writer Slot
- main: planner only
- worker-shell: `src/components/Header.tsx`, `src/components/MainContent.tsx`
- worker-panel: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: rename the header title to `Celestial Ephemeris`, keep the segmented control in the header to the left of the calendar control, and remove the shell chrome calendar text/button cluster, Today, theme, and panel labels.
- Non-goals: do not change the data model or commentary content.
  - Acceptance criteria:
  - The left rail no longer shows `Manifesto` or `Reading rail`.
  - The right area no longer shows `Commentary` or `Reading canvas`.
  - The calendar text/button cluster, Today control, and theme toggle are removed from the shell chrome.
  - The header title reads `Celestial Ephemeris`.
  - The segmented control remains in the header to the left of the calendar control.
  - The current data and commentary behavior remain intact.

# Reviewer
- reviewer-layout: shell chrome and label removal review

# Last Update
- 2026-04-20: completed the shell chrome label/control removal, header title rename, and header placement cleanup with tests and build passing
