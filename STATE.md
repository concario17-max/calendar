# Current Task
- Completed: Render commentary list markers as semantic `ul/li` blocks in the commentary panel.

# Route
- Route A

# Writer Slot
- main: direct implementation lane

# Contract Freeze
- Goal: interpret the extractor's list marker format and render list-backed commentary blocks as semantic `ul/li` content.
- Non-goals: no commentary routing change, no deployment work, no unrelated layout work, no broad typography redesign.
- Acceptance criteria:
  - Commentary entries that originate as list items render as semantic `ul/li` content.
  - Existing non-list commentary paragraphs remain plain text.
  - Existing pipe-delimited table blocks remain semantic tables.
  - Build and tests pass.
- Risks:
  - Some commentary blocks may mix list lines and prose, so detection must avoid over-applying list semantics.
  - The marker format may need a conservative parser so tables and prose are not misclassified.

# Write Sets
- main_impl: src/components/IChingSection.tsx, src/components/IChingSection.test.tsx

# Reviewer
- reviewer: semantic commentary list rendering

# Last Update
- 2026-04-15: commentary list semantics rendering completed
