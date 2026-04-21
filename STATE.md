# Current Task
- Completed: removed original line-break preservation from the commentary prose so the paragraph wraps naturally.

# Route
- Route A
- Reason: single-file wrapping change isolated to the commentary prose renderer.

# Writer Slot
- main: idle
- worker-panel: idle
- worker-soul: idle

# Contract Freeze
- Goal: preserve the natural wrapping change for commentary prose while keeping parsing and content intact.
- Non-goals: do not change data registries, left-rail layout, or the journal modal export text.
  - Acceptance criteria:
  - Commentary prose wraps naturally from width, not from the source line breaks.
  - Existing commentary content, parsing, and selection behavior remain intact.
  - The left rail is untouched.

# Reviewer
- reviewer-layout: commentary wrapping regression review

# Last Update
- 2026-04-21: completed the commentary prose wrapping cleanup.
