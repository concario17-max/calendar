# Current Task
- Remove the top reading summary header from the split reading area, while keeping the left passage body and right commentary panels, and keep Rudolf Steiner's Calendar of the Soul in the normal vertical flow below.

# Route
- Route B

# Writer Slot
- main: planner-only until contract freeze and write sets are recorded
- worker_feature: remove the top summary header and adjust tests if needed

# Contract Freeze
- Goal: simplify the split reading area by removing the upper `READING SUMMARY / CURRENT LINE` header card, while preserving the body/commentary split and the stacked soul section below.
- Non-goals: no data model changes, no commentary plumbing cleanup, no redesign of soul calendar, no deployment work.
- Acceptance criteria:
  - The top summary header card is gone.
  - The left passage body remains in place.
  - The right commentary panel remains in place.
  - `Rudolf Steiner's Calendar of the Soul` still appears below in the normal vertical flow.
  - Build and tests pass.
- Risks:
  - Tests may still assert the removed header, so they will need to be updated.

# Write Sets
- worker_feature: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx if needed
- reviewer: main verification

# Reviewer
- main verification

# Last Update
- 2026-04-13: top summary header removed; build and tests passed
