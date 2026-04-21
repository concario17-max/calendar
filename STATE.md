# Current Task
- Update the soul commentary heading in the reading panel so it no longer shows the old `CoTS Verses for Weeks ...` title.

# Route
- Route A
- Reason: narrow content-string fix isolated to the soul commentary heading and its assertions.

# Writer Slot
- main: implementation
- worker-panel: idle
- worker-nav: idle

# Contract Freeze
- Goal: make the soul-mode commentary heading match the current soul naming instead of the old CoTS-derived title.
- Non-goals: do not change data registries, journal modal export text, or the reading-shell layout.
  - Acceptance criteria:
  - Selecting the soul commentary mode no longer shows the old CoTS heading.
  - The soul commentary heading uses the current soul naming consistently.
  - Existing commentary content and selection behavior remain intact.

# Reviewer
- reviewer-layout: soul-commentary-heading regression review

# Last Update
- 2026-04-21: resolved soul commentary heading fix; verification passed.
