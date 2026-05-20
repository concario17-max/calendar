# Current Task
- Active: UX P0 fixes are complete; first-visit purpose and CTA hierarchy are now explicit, and follow-up P1/P2 work can be planned separately.

# Route
- Route B
- Reason: the UX pass touches multiple feature components and tests (`src/components/Header.tsx`, `src/components/MainContent.tsx`, `src/components/Header.test.tsx`), so it exceeds Route A.

# Writer Slot
- main: planner-only lane for `STATE.md` and `MULTI_AGENT_LOG.md`
- worker_feature: `src/components/Header.tsx`, `src/components/MainContent.tsx`, `src/components/Header.test.tsx`
- reviewer: required for the UX pass

# Contract Freeze
- Goal: make the first visit understandable within a few seconds by adding a clear purpose cue and stronger CTA hierarchy, while keeping behavior intact.
- Non-goals:
- do not add new libraries
- do not change data models, parsing, or bonus-day logic
- do not change the reading/content semantics
- do not do browser verification
- Write sets:
  - main: `STATE.md`
  - main: `MULTI_AGENT_LOG.md`
- worker_feature: `src/components/Header.tsx`
- worker_feature: `src/components/CommentaryModeTabs.tsx`
- worker_feature: `src/components/MainContent.tsx`
- worker_feature: `src/components/Header.test.tsx`
- Acceptance criteria:
  - the page purpose is understandable at a glance
  - the primary navigation CTA is clearer
  - no existing feature flow regresses
  - the relevant targeted tests pass
  - `npm.cmd run build` passes
- Why the write split is safe:
  - the slice stays within header and shell copy/CTA polish

# Reviewer
- reviewer: required for the UX pass
- reviewer findings to close: first-visit purpose is still too implicit, and the primary action hierarchy can be made more explicit

# Last Update
- 2026-05-20: closed the UX P0 pass after clarifying the site purpose and CTA hierarchy for first-time visitors.
