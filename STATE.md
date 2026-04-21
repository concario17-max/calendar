# Current Task
- Fix the left soul title block under `Rudolf Steiner's Calendar of the Soul` so it shows `50주(3월 16-22일) · 3주(4월 21-27일)`.

# Route
- Route A
- Reason: narrow label-format change isolated to the soul week label rendering and its assertions.

# Writer Slot
- main: implementation
- worker-panel: idle
- worker-nav: idle

# Contract Freeze
- Goal: render the left soul title block subtitle as `50주(3월 16-22일) · 3주(4월 21-27일)`.
- Non-goals: do not change data registries or the journal modal export text.
- Acceptance criteria:
  - The left soul title block shows `50주(3월 16-22일) · 3주(4월 21-27일)`.
  - Existing commentary content and selection behavior remain intact.

# Reviewer
- reviewer-layout: soul-week-label regression review

# Last Update
- 2026-04-21: resolved the left soul title block subtitle format.
