# Current Task
- Completed: made the soul title/line typography track the yao block tone and restored the readable fallback label in `src/components/SoulCalendarSection.tsx`.

# Route
- Route A
- Reason: this is now a single-file typography hotfix with one tight implementation slice and no shared asset or behavior changes.

# Writer Slot
- main: implementation

# Contract Freeze
- Goal: make the soul title and week line visually track the yao block's typographic tone.
- Non-goals: no data changes, no commentary logic changes, no layout structure changes beyond minimal class adjustments for typography.
- Acceptance criteria:
  - Soul title uses the same font family, weight, size scale, tracking, and color tone as the yao title as closely as possible.
  - Soul line uses a comparable font family, italic treatment, size, weight, line-height, spacing, and color tone to the yao short text.
  - Any remaining differences are deliberate and limited to the section's semantic role.
  - Build passes after the change.

# Write Sets
- main: src/components/SoulCalendarSection.tsx

# Reviewer
- reviewer: not required for Route A

# Last Update
- 2026-04-19: soul typography match completed and fallback label restored
