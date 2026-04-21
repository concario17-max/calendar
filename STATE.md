# Current Task
- Resolved: aligned the title sizes to the `괘사` title scale and switched the body text to a different color family.

# Route
- Route B
- Reason: the change spans shared typography across the left-panel blocks and the soul section, with regression coverage on multiple files.

# Writer Slot
- main: planner only
- worker-panel: `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`
- worker-nav: idle

# Contract Freeze
- Goal: make the title sizes in `효사`, `괘사`, and `소울` match the `괘사` title scale, and move the body text into a distinct non-brown color family.
- Non-goals: do not change the data registries or commentary content.
  - Acceptance criteria:
  - The title scale is consistent across `효사`, `괘사`, and `소울`, using the `괘사` title scale as the baseline.
  - The body text uses a different color family from the brown title color.
  - The rest of the reading/content behavior remains intact.

# Reviewer
- reviewer-layout: typography and body-color regression review

# Last Update
- 2026-04-21: completed title-scale alignment and body-color separation
