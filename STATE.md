# Current Task
- Completed: add a collapsible learning-comic slot under the key-keyword line in the right reading panel for gua/yao only.

# Route
- Route B
- Reason: the change touches shared reading-panel presentation and the corresponding test contract across multiple files.

# Writer Slot
- main: closed
- worker-learning-comic-slot: closed
- worker-review: closed

# Contract Freeze
- Goal: add a collapsible learning-comic space under the key-keyword line in the right reading panel for `È¿»ç` and `±¥»ç` only.
- Non-goals: do not change the soul panel, the registries, or the left rail layout.
- Write sets:
  - worker-learning-comic-slot: `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- Acceptance criteria:
  - The learning-comic slot appears only for `gua` and `yao` commentary.
  - The slot is placed beneath the key-keyword line in the right panel.
  - The slot is collapsible.
  - The soul panel remains unchanged.
  - Targeted tests and build continue to pass.

# Reviewer
- reviewer-learning-comic-slot: passed

# Last Update
- 2026-04-23: learning-comic slot added under the keyword line for gua/yao and kept collapsed by default.
