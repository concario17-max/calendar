# Current Task
- Completed: Regenerate commentary registries from every ODT in `괘사/` and `효사/`.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: read every `*.odt` under `괘사/` and `효사/`, merge them in deterministic folder order, and regenerate the commentary registries from the full folder contents.
- Non-goals: no commentary routing change, no deployment work, no unrelated layout work, no UI redesign.
- Acceptance criteria:
  - `괘사/` and `효사/` registries are regenerated from all numbered ODT files in those folders.
  - File order is deterministic and preserves numbered commentary entries.
  - Existing list markers, plain paragraphs, and pipe-delimited tables continue to survive generation.
  - Build and tests pass.
- Risks:
  - Folder ordering mistakes could merge chapters out of sequence.
  - New files may introduce overlapping numbers or duplicate titles if the file naming convention is inconsistent.

# Write Sets
- worker_shared: scripts/extract_commentary.py, src/data/guaCommentary.ts, src/data/yaoCommentary.ts, src/data/guaCommentary.test.ts, src/data/yaoCommentary.test.ts
- reviewer: folder-wide commentary regeneration

# Reviewer
- reviewer: folder-wide commentary regeneration

# Last Update
- 2026-04-15: commentary folder regeneration completed
