# Current Task
- In progress: remove the old global `GUA / YAO` toggle from the header, stop passing stale commentary source plumbing through the shell, and keep the section-specific commentary controls inside the reading component.

# Route
- Route B
- Reason: the task now spans shell wiring across `src/App.tsx`, `src/components/MainContent.tsx`, `src/components/Header.tsx`, and `src/hooks/useCalendarLogic.ts`, so it needs a split write set and the header cleanup.

# Writer Slot
- main: planner-only
- worker_shell: src/App.tsx, src/components/MainContent.tsx, src/components/Header.tsx, src/hooks/useCalendarLogic.ts

# Contract Freeze
- Goal: remove the old global `GUA / YAO` toggle from the header, trim stale shell-level commentary props, and keep the per-section commentary controls inside the reading component.
- Non-goals: no commentary registry updates, no data regeneration, no deployment work, no broader typography overhaul, no unrelated layout redesign, no reading-layout refactor outside the shell wiring slice.
 - Acceptance criteria:
  - The header no longer exposes the old global `GUA / YAO` toggle.
  - The shell no longer passes stale commentary source plumbing to components that do not need it.
  - The reading component still swaps content based on the selected section.
  - Build and tests pass after the shell wiring change.

# Write Sets
- worker_shell: src/App.tsx, src/components/MainContent.tsx, src/components/Header.tsx, src/hooks/useCalendarLogic.ts

# Reviewer
- reviewer: shell wiring cleanup and header toggle removal

# Last Update
- 2026-04-18: retargeted to remove shell-level commentary source plumbing and the header toggle while keeping section-specific commentary controls in the reading component
