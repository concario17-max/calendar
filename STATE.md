# Current Task
- Active: verify that all newly added 괘사 learning-comic images are wired into the UI and update the commentary image mapping flow wherever needed.

# Route
- Route A
- Reason: this is a tight image-wiring refinement centered on the existing commentary image-loading path and its verification.

# Writer Slot
- main: verifying and updating the 괘사 learning-comic wiring directly

# Contract Freeze
- Goal: make sure the newly added 괘사 learning-comic assets are discoverable by the current image loader and available to the commentary comic toggle across all relevant entries.
- Non-goals: do not redesign the UI, do not alter yao/soul logic unless the shared loader requires it, and do not touch unrelated commentary parsing.
- Write sets:
  - main: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`, `ERROR_LOG.md`
- Acceptance criteria:
  - The repository image locations and naming are checked against the current 괘사 loader.
  - Any required loader or test updates are implemented.
  - Targeted tests and build pass.

# Reviewer
- self-review after targeted verification

# Last Update
- 2026-05-12: shifted from the read-only audit to verifying and updating the 괘사 learning-comic asset wiring.
