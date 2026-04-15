# Current Task
- Completed: Restore commentary list semantics from ODT sources using stable list markers in the generated registries.

# Route
- Route B

# Writer Slot
- main: planner-only lane; implementation delegated to workers

# Contract Freeze
- Goal: preserve list semantics from ODT commentary sources so list-backed entries are emitted with stable markers in the generated registries.
- Non-goals: no commentary routing change, no deployment work, no unrelated layout work, no broad typography redesign.
- Acceptance criteria:
  - Commentary entries that originate as list items are preserved with `[[list]]` / `[[item]]` markers in the generated registry strings.
  - Existing non-list commentary paragraphs remain plain text.
  - Existing pipe-delimited table blocks remain semantic tables.
  - Build and tests pass.
- Risks:
  - Some commentary blocks may mix list lines and prose, so detection must avoid over-applying list semantics.
  - The marker format must stay conservative so tables and prose are not misclassified.

# Write Sets
- worker_shared: scripts/extract_commentary.py, src/data/guaCommentary.ts, src/data/yaoCommentary.ts, src/data/guaCommentary.test.ts, src/data/yaoCommentary.test.ts
- worker_feature: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: semantic commentary list marker preservation

# Last Update
- 2026-04-15: commentary list marker restoration completed
