# Current Task
- Completed: Restored missing core summary content by recursively traversing nested ODT blocks under office:text and regenerating commentary registries.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: preserve the current commentary routing while fixing the ODT extraction pipeline so the missing summary content is captured from nested block structures.
- Non-goals: no layout redesign, no source registry rewrite, no deployment work, no unrelated data migration.
- Acceptance criteria:
  - The extractor captures the summary content that currently disappears from `괘사/` and `효사/`.
  - Existing commentary routing continues to work.
  - Tests cover the restored summary content for at least one representative gua and yao entry.
  - Build and tests pass.
- Risks:
  - Nested ODT structures may require recursive traversal and careful normalization.
  - Re-extraction could shift commentary block boundaries if the parser is too aggressive.
  - Keep the change focused on extraction and regenerated data.

# Write Sets
- worker_extract: scripts/extract_commentary.py, src/data/guaCommentary.ts, src/data/yaoCommentary.ts, src/data/guaCommentary.test.ts, src/data/yaoCommentary.test.ts, package.json
- reviewer: missing summary restoration and extraction coverage

# Reviewer
- reviewer: missing summary restoration and extraction coverage

# Last Update
- 2026-04-15: recursive summary extraction completed and verified
