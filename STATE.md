# Current Task
- Format the soul week labels as `50주(3월 16-22일) · 3주(4월 21-27일)` in both the left title block and the right soul panel.

# Route
- Route A
- Reason: narrow label-format change isolated to the soul week label rendering and its assertions.

# Writer Slot
- main: implementation
- worker-panel: idle
- worker-nav: idle

# Contract Freeze
- Goal: render the soul week labels in the same `50주(3월 16-22일) · 3주(4월 21-27일)` format on both sides.
- Non-goals: do not change data registries or the journal modal export text.
- Acceptance criteria:
  - The left soul title block shows `50주(3월 16-22일) · 3주(4월 21-27일)`.
  - The right soul panel shows the same week-label format.
  - Existing commentary content and selection behavior remain intact.

# Reviewer
- reviewer-layout: soul-week-label regression review

# Last Update
- 2026-04-21: resolved soul week label formatting on both sides.
