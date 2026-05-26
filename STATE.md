# Current Task
- Active: fix stale comic image behavior in `src/components/IChingSection.tsx` and align `src/components/IChingSection.test.tsx`.

# Route
- Route B
- Reason: the requested change spans the reading component and its focused unit test.

# Writer Slot
- main: write-capable

# Contract Freeze
- Goal: keep synchronous cache lookup for repeat comic renders, but clear the visible comic during uncached switches so stale art does not linger under a new alt label.
- Non-goals:
  - do not add new libraries
  - do not change reading outcomes, date mapping, commentary content, or component APIs
  - do not alter user-provided untracked folders/files
  - do not redesign the reading UI
  - do not change routing behavior
  - do not change image assets or file formats
  - do not change the eager image attributes on the visible comic
- Write sets:
  - main:
    - `src/components/IChingSection.tsx`
    - `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - cached repeat renders can still attach immediately via `getLearningImageUrlFromCache`
  - uncached switches do not keep the previous comic visible
  - the visible comic image remains eager with high fetch priority
  - tests cover the uncached switch loading/empty state and eager image attributes
  - content and routing behavior remain unchanged
  - `npm.cmd run lint` and `npm.cmd run build` pass

# Reviewer
- reviewer: not needed

# Last Update
- 2026-05-26: cleared stale comic reuse on uncached switches and updated tests.
