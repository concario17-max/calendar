# Current Task
- Completed: covered the MainContent viewport-height and overflow-hidden shell contract in the reading panel tests.

# Route
- Route A
- Reason: this is a single test-file adjustment that asserts the MainContent shell contract and preserves the existing sticky layout checks.

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: verify the MainContent shell enforces the viewport-height and overflow-hidden contract.
- Non-goals: no markup/layout redesign, no commentary registry updates, no data regeneration, no deployment work.
- Acceptance criteria:
  - The main element has the viewport-height and overflow-hidden class contract.
  - The left reading rail remains sticky.
  - The right commentary panel remains independently scrollable.
  - Build and tests pass after the adjustment.

# Write Sets
- main: src/components/IChingSection.test.tsx

# Reviewer
- reviewer: MainContent shell contract and sticky panel regression

# Last Update
- 2026-04-19: covered the MainContent viewport shell contract and verified the sticky layout checks
