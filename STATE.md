# Current Task
- Completed: removed the `fade-in-up` translateY offset so the reading rail starts flush with the viewport top.

# Route
- Route B
- Reason: this touched the shared shell and left rail layout in `src/components/MainContent.tsx` and `src/components/IChingSection.tsx`.

# Writer Slot
- main: planner-only
- worker-1: top-gap removal implementation
- reviewer: visual spacing regression review

# Contract Freeze
- Goal: remove the `fade-in-up` translateY offset so the reading rail begins flush with the viewport top.
- Non-goals: no data changes, no commentary registry changes, no behavior changes.
- Acceptance criteria:
  - The visible reading content starts at the top edge without the animation-induced offset.
  - The left and right panels remain aligned after removing the offset.
  - No other layout or commentary behavior changes.

# Reviewer
- reviewer: visual spacing regression

# Last Update
- 2026-04-19: fade-in animation offset removed from the reading rail
