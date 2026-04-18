# Current Task
- In progress: halve the sigil size and move the `Asphadit` explanatory body into the commentary panel under the commentary title, while keeping the rest of the reading layout intact.

# Route
- Route A
- Reason: this narrows to a single reading-panel component plus its test, with no shared asset or multi-slice rollout.

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: halve the sigil size and move the `Asphadit` explanatory body from the left reading stack into the commentary panel under the commentary title.
- Non-goals: no commentary registry updates, no data regeneration, no deployment work, no unrelated typography overhaul, no control relocation, no broader layout rewrite.
- Acceptance criteria:
  - The sigil renders at roughly half its current size.
  - The `Asphadit` explanatory body appears under the commentary title in the commentary panel.
  - The left reading stack no longer renders that body text.
  - Build and tests pass after the layout change.

# Write Sets
- main: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: sigil downsize and commentary-body relocation

# Last Update
- 2026-04-18: retargeted the task to downsize the sigil and relocate the Asphadit body into the commentary panel
