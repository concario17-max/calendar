# Current Task
- Keep the right commentary panel, but move Rudolf Steiner's Calendar of the Soul back into the left reading column so it continues under the main passage instead of appearing as a separate bottom section.

# Route
- Route B

# Writer Slot
- main: planner-only until contract freeze and write sets are recorded
- worker_feature: move the soul section into the left reading column

# Contract Freeze
- Goal: preserve the existing left/right split for the passage and commentary, while nesting the soul calendar directly under the main passage in the left column.
- Non-goals: no data model changes, no commentary plumbing cleanup, no top summary header changes, no deployment work.
- Acceptance criteria:
  - The right commentary panel stays visible.
  - `Rudolf Steiner's Calendar of the Soul` is rendered in the left column beneath the passage, not as a separate bottom section.
  - The left column remains the primary reading flow.
  - Mobile behavior stays readable.
  - Build and tests pass.
- Risks:
  - Layout nesting may require moving `SoulCalendarSection` into `IChingSection` or introducing a wrapper component, and tests may need to follow that structural change.

# Write Sets
- worker_feature: src/components/IChingSection.tsx, src/components/MainContent.tsx, src/components/IChingSection.test.tsx if needed
- reviewer: main verification

# Reviewer
- main verification

# Last Update
- 2026-04-13: soul section nested into the left column and verified by build/tests
