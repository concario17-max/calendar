# Current Task
- Completed: removed the left-card internal scroll trap in IChingSection so the soul section continues in the normal page flow.

# Route
- Route A

# Writer Slot
- main: direct implementation lane for a single-file reading-flow tweak

# Contract Freeze
- Goal: remove the internal scroll trap from the left reading card so the soul section reads as part of the same page flow.
- Non-goals: no data model changes, no copy/content rewrite, no deployment work, no header/shell changes.
- Acceptance criteria:
  - The left reading card no longer uses a fixed-height internal scroll container.
  - The soul section sits below the reading block in the normal page flow.
  - The existing layout language stays intact.
  - Build and tests pass.
- Risks:
  - Removing the internal scroll may increase page height on smaller desktop displays.

# Write Sets
- main: src/components/IChingSection.tsx

# Reviewer
- main verification

# Last Update
- 2026-04-13: left-card scroll trap removed and verified clean
