# Current Task
- Active: unify the soul commentary section onto the same centered `max-w-[52rem]` reading canvas used by 효사/괘사.

# Route
- Route A
- Reason: this is a tight single-slice UI refinement limited to one component and its tests, with straightforward verification.

# Writer Slot
- main: implementing the soul canvas width adjustment directly

# Contract Freeze
- Goal: keep the existing soul content and structure, but center the soul title and soul entry cards on the same `max-w-[52rem]` canvas as the 효사/괘사 commentary stack.
- Non-goals: do not change soul text content, week formatting logic, commentary parsing, date logic, or routing.
- Write sets:
  - main: `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- Acceptance criteria:
  - The soul heading area and soul body cards share the same centered `max-w-[52rem]` canvas.
  - Existing soul rendering behavior remains unchanged apart from width/centering.
  - Existing targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-11: re-froze the task around matching the soul panel to the same centered `max-w-[52rem]` reading canvas.
