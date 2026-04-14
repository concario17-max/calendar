# Current Task
- Completed: Rebuild gua and yao commentary data from the numbered ODT files in the `괘사/` and `효사/` folders.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: analyze the numbered ODT files in `괘사/` and `효사/`, regenerate the commentary registries from those sources, and keep the existing toggle UI working with the new number-based content.
- Non-goals: no layout rewrite beyond the commentary source plumbing, no deployment work, no unrelated data migrations.
- Acceptance criteria:
  - The numbered ODT files are analyzed and mapped by the file numbers the user attached to the titles.
  - Commentary data is regenerated from those files.
  - The existing gua/yao toggle still switches between the two commentary sources.
  - A representative mapping is covered by tests.
  - Build and tests pass.
- Risks:
  - The ODT source text may need one-time extraction/normalization before it can be committed as plain data.
  - A file-number mismatch could create wrong commentary routing if the registry is not keyed carefully.
  - This slice stays single-worker unless the folder set fans out into clearly disjoint writing targets.

# Write Sets
- worker_impl: src/data/guaCommentary.ts, src/data/yaoCommentary.ts, src/data/index.ts, src/data/guaCommentary.test.ts, src/data/yaoCommentary.test.ts, src/hooks/useCalendarLogic.ts, src/hooks/useCalendarLogic.test.ts, src/components/IChingSection.tsx, src/components/IChingSection.test.tsx
- reviewer: registry rebuild and number mapping

# Reviewer
- reviewer: registry rebuild and number mapping

# Last Update
- 2026-04-14: numbered ODT rebuild verified and closed
