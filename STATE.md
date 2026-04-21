# Current Task
- Resolved: normalized reading body widths to `max-w-[40ch]` for the main reading content blocks.

# Route
- Route A
- Reason: narrow typography tweak limited to reading body widths in a single component file.

# Writer Slot
- main: implementation
- worker-panel: idle
- worker-nav: idle

# Contract Freeze
- Goal: make the main reading body blocks use `max-w-[40ch]`.
- Non-goals: do not change the data registries, commentary content, or title widths.
  - Acceptance criteria:
  - The main reading body/summary blocks use the same `max-w-[40ch]` cap.
  - The rest of the reading/content behavior remains intact.

# Reviewer
- reviewer-layout: body-width regression review

# Last Update
- 2026-04-21: resolved body-width normalization.