# Current Task
- Completed: Rebuilt commentary routing so gua/yao commentary is selected by the number embedded in the current verse title, using the numbered ODT source files in `괘사/` and `효사/`.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: extract the numbered ODT contents in `괘사/` and `효사/` into plain text commentary registries keyed by the embedded title number, and render the matching commentary for the currently displayed verse.
- Non-goals: no layout rewrite outside the commentary source plumbing, no deployment work, no unrelated data migrations.
- Acceptance criteria:
  - The current verse number selects the matching gua commentary from the numbered `괘사/` ODT source.
  - The current verse number selects the matching yao commentary from the numbered `효사/` ODT source.
  - The commentary panel still supports gua/yao source switching.
  - The registry lookup is covered by tests.
  - Build and tests pass.
- Risks:
  - The ODT files may contain multiple numbered blocks that need one-time extraction/normalization before they can be committed as plain data.
  - File-number mismatches could route the wrong commentary if the registry keying is not exact.
  - This slice stays single-worker unless the folder set fans out into clearly disjoint writing targets.

# Write Sets
- worker_impl: scripts/extract_commentary.py, package.json, src/data/guaCommentary.ts, src/data/yaoCommentary.ts, src/data/index.ts, src/data/guaCommentary.test.ts, src/data/yaoCommentary.test.ts, src/hooks/useCalendarLogic.ts, src/hooks/useCalendarLogic.test.ts, src/components/IChingSection.tsx, src/components/IChingSection.test.tsx, src/components/MainContent.tsx, src/App.tsx, src/types/index.ts
- reviewer: numbered commentary routing and registry coverage

# Reviewer
- reviewer: numbered commentary routing and registry coverage

# Last Update
- 2026-04-15: commentary extraction and number-based routing completed
