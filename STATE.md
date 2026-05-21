# Current Task
- Active: design-system token cleanup and component variant harmonization for launch readiness, with existing behavior preserved.

# Route
- Route B
- Reason: the scope spans shared style assets plus multiple component surfaces, and it needs coordinated token + variant changes with tests and build verification.

# Writer Slot
- main: planner-only for STATE and log updates
- worker_tokens: shared design tokens, globals, and only the shared primitives that are truly needed
- worker_surfaces: component-side adoption of the unified variants across navigation, cards, forms, modal, and reading surfaces
- reviewer: pending for the design-system integration pass

# Contract Freeze
- Goal: make the app feel premium, fast, trustworthy, and mobile-first by unifying the design system without changing features.
- Non-goals:
  - do not add new libraries
  - do not change route behavior or content semantics
  - do not touch untracked user folders/files
- Write sets:
  - worker_tokens: `src/index.css`, `tailwind.config.js`, `src/components/shared/*` if truly needed
  - worker_surfaces: `src/components/Header.tsx`, `src/components/CommentaryModeTabs.tsx`, `src/components/DatePicker.tsx`, `src/components/JournalModal.tsx`, `src/components/MainContent.tsx`, `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`
  - main: `STATE.md`, `MULTI_AGENT_LOG.md`
- Acceptance criteria:
  - color, type, spacing, radius, shadow, and border rules come from a single coherent system
  - buttons, cards, inputs, modal, and navigation share consistent variants and states
  - dark mode stays supported through existing tokens or token bridges
  - existing UI behavior remains intact
  - `npm.cmd run lint`, `npm.cmd run test -- --run`, and `npm.cmd run build` pass
- Why the split is safe:
  - token/global changes are separable from component adoption, but they must agree on the same shared contract

# Reviewer
- reviewer: pending for the design-system integration pass
- reviewer focus:
  - token consistency and semantic usage
  - shared component variant consistency across screens
  - mobile-first spacing/typography balance without regressions

# Last Update
- 2026-05-21: design-system cleanup implemented and verified with lint, test, and build; typecheck script is still not defined in package.json.
