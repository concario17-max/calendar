# Current Task
- Completed: implemented a fixed-width left rail and a responsive right panel so the left content stays stable across viewport changes without clipping the soul section.

# Route
- Route B
- Reason: the final implementation touched the shell, the reading panel, the soul section, and related tests.

# Writer Slot
- main: planner only
- worker-shell: `src/components/MainContent.tsx`
- worker-panel: `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`

# Contract Freeze
- Goal: keep the left rail visually fixed in px-based width while letting the right panel absorb viewport changes responsively.
- Non-goals: no data changes, no commentary registry changes, no content rewrites.
- Acceptance criteria:
  - The left rail uses a fixed pixel width and does not shrink under normal desktop widths.
  - The right panel remains responsive and takes the remaining width.
  - The left rail stays scroll-safe so the soul section is not clipped on shorter viewports.
  - The current reading hierarchy and soul section presence are preserved.
  - Tests reflect any DOM or label changes caused by the fixed-rail layout.

# Reviewer
- reviewer-space: layout spacing and fixed-rail regression review

# Last Update
- 2026-04-20: fixed-left-rail implementation completed and reviewed
