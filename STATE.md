# Current Task
- Completed: reduce the right-side canvas box count and keep the title, description, and body flowing on a flatter reading surface.

# Route
- Route B
- Reason: the requested UI simplification touches shared reading chrome across the right-side commentary and soul panels, plus related tests.

# Writer Slot
- main: planner only
- worker-right: idle
- worker-soul: idle
- worker-review: idle

# Contract Freeze
- Goal: simplify the right-side canvas so the title and description sit directly on the background while the body remains in a flatter flowing section with fewer boxed surfaces.
- Non-goals: do not change data registries, left-rail layout, selection behavior, or the wording of the content.
- Write sets:
  - worker-right: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
  - worker-soul: `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- Acceptance criteria:
  - The right-side reading area uses fewer boxed surfaces.
  - The title and description read directly on the background.
  - The body remains readable in a flatter flowing section.
  - Soul-panel chrome stays visually aligned with the right-side commentary chrome.
  - Targeted tests and build continue to pass.

# Reviewer
- reviewer-right-panel: right-side canvas simplification review

# Last Update
- 2026-04-22: reduced the right-side boxed surfaces and kept the title, description, and body on a flatter reading surface.
