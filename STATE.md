# Current Task
- Completed: removed the extra soul labels from the right soul panel and moved `SOUL PANEL` up to align with the other right-side commentary headers.

# Route
- Route B
- Reason: the change touched the soul panel header structure and the shared right-side commentary chrome, which was a multi-file layout adjustment across the soul panel and its tests.

# Writer Slot
- main: planner only
- worker-panel: idle
- worker-review: idle

# Contract Freeze
- Goal: remove the extra soul labels from the right soul panel and align `SOUL PANEL` with the other right-side commentary headers.
- Non-goals: do not change data registries, commentary content, or left-rail layout.
- Acceptance criteria:
  - The soul panel no longer shows the extra `영혼` label or the week-range line above the soul title.
  - The soul title `Rudolf Steiner's Calendar of the Soul` remains visible in the right soul panel.
  - `SOUL PANEL` sits on the same header line hierarchy as the other right-side commentary panel labels.
  - Existing commentary content and selection behavior remain intact.

# Reviewer
- reviewer-layout: right-panel header alignment and soul-label removal review

# Last Update
- 2026-04-22: completed the soul panel header cleanup and verified the targeted soul panel test and build.
