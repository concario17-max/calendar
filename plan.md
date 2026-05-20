# Repository Modernization Plan

## Scope Summary

This app is a single-page React + Vite experience centered on one reading surface. The main user flows are date selection, commentary mode switching, bonus-day browsing, soul-section reading, and journal export.

Current structure:
- Entry: `src/main.tsx` -> `src/App.tsx`
- Shell and state plumbing: `src/components/MainContent.tsx`
- Header controls: `src/components/Header.tsx`, `src/components/DatePicker.tsx`, `src/components/CommentaryModeTabs.tsx`
- Main reading surface: `src/components/IChingSection.tsx`
- Soul section: `src/components/SoulCalendarSection.tsx`
- Journal modal: `src/components/JournalModal.tsx`
- State/logic: `src/hooks/useCalendarLogic.ts`, `src/hooks/useTheme.ts`
- Design system: `src/index.css`, `tailwind.config.js`
- Data layer: `src/data/*`, especially `yaoCommentary.ts`, `guaCommentary.ts`, `yaoData.ts`, `guaData.ts`, `soulData.ts`

Main constraints:
- No feature regression
- No new libraries
- Mobile-first improvements
- Better polish without flashy animation
- Changes should be split into small, reviewable PR-sized slices

## Audit Findings

- The app is effectively one routed screen, so UI structure and state flow matter more than route handling.
- Global CSS carries a lot of layout responsibility. That makes visual polish dependent on a few high-impact style changes in `src/index.css`.
- The biggest performance pressure comes from large generated data files, especially `src/data/yaoCommentary.ts` and `src/data/yaoData.ts`.
- Accessibility is decent in spots, but custom controls like the date picker, segmented toggles, floating arrows, and bonus selectors need a closer pass.
- Some shared UI patterns already exist, but several page-specific components still duplicate shell/card/header behavior.

## Priority Plan

### P0

1. Normalize the shell and spacing system
- Goal: make the layout feel intentionally designed instead of assembled.
- Expected files:
  - `src/index.css`
  - `src/components/MainContent.tsx`
  - `src/components/IChingSection.tsx`
  - `src/components/Header.tsx`
- Risk:
  - High, because global spacing and overflow rules can break desktop/mobile balance quickly.
- Verification:
  - `npm.cmd run build`
  - existing component tests for header, main reading, and soul layout

2. Tighten accessibility and keyboard flow on custom controls
- Goal: make the date picker, commentary mode tabs, floating arrows, and bonus selectors easier to operate with keyboard and assistive tech.
- Expected files:
  - `src/components/DatePicker.tsx`
  - `src/components/CommentaryModeTabs.tsx`
  - `src/components/IChingSection.tsx`
  - `src/components/Header.tsx`
- Risk:
  - Medium, because small ARIA and focus changes can affect existing tests and interactions.
- Verification:
  - `npm.cmd test`
  - targeted component tests for keyboard and aria behavior

### P1

3. Reduce bundle pressure from large data modules
- Goal: improve startup and keep the build from growing further.
- Expected files:
  - `src/data/yaoCommentary.ts`
  - `src/data/yaoData.ts`
  - `src/data/guaCommentary.ts`
  - `src/data/guaData.ts`
  - `src/data/soulData.ts`
  - `vite.config.ts`
- Risk:
  - High, because data loading and chunking are tightly coupled to current rendering assumptions.
- Verification:
  - `npm.cmd run build`
  - compare bundle output and chunk warnings
  - data sync tests

4. Extract repeated shell and card patterns into shared components
- Goal: stop repeating the same visual language across the main reading surface, soul section, and modal surfaces.
- Expected files:
  - `src/components/IChingSection.tsx`
  - `src/components/SoulCalendarSection.tsx`
  - `src/components/JournalModal.tsx`
  - possibly a new shared component file under `src/components/`
- Risk:
  - Medium to high, because shared extraction can ripple across multiple screens.
- Verification:
  - `npm.cmd run build`
  - component tests for the affected screens

5. Clarify state boundaries
- Goal: make date selection, commentary source, bonus-day selection, and theme state easier to reason about.
- Expected files:
  - `src/hooks/useCalendarLogic.ts`
  - `src/App.tsx`
  - `src/components/MainContent.tsx`
  - `src/hooks/useTheme.ts`
- Risk:
  - Medium, because state refactors can cause subtle regressions if transitions are not preserved.
- Verification:
  - `npm.cmd test -- --run src/hooks/useCalendarLogic.test.ts`
  - `npm.cmd run build`

### P2

6. Polish typography, visual hierarchy, and motion
- Goal: make the interface feel calmer, sharper, and more premium without adding gimmicky animations.
- Expected files:
  - `src/index.css`
  - `src/components/Header.tsx`
  - `src/components/JournalModal.tsx`
  - `src/components/SoulCalendarSection.tsx`
- Risk:
  - Low to medium, mainly visual regression risk.
- Verification:
  - `npm.cmd run build`
  - manual visual inspection in mobile and desktop widths

7. Improve empty states and fallback messaging
- Goal: make unavailable content or missing assets feel intentional instead of broken.
- Expected files:
  - `src/components/IChingSection.tsx`
  - `src/components/SoulCalendarSection.tsx`
  - `src/components/JournalModal.tsx`
- Risk:
  - Low, because these are mostly copy and fallback rendering changes.
- Verification:
  - targeted component tests
  - `npm.cmd run build`

8. Clean up developer-facing quality gates
- Goal: keep future updates safer by preserving data sync and encoding checks.
- Expected files:
  - `package.json`
  - `scripts/check-data-sync.mjs`
  - `scripts/check-encoding.mjs`
  - `STATE.md`
- Risk:
  - Low, but only if the scripts remain narrow and deterministic.
- Verification:
  - `npm.cmd run check:data`
  - `npm.cmd run check:encoding`

## Recommended PR Split

1. PR 1: P0 shell, spacing, and basic accessibility polish
2. PR 2: P1 shared component extraction and state cleanup
3. PR 3: P1 performance and bundle work
4. PR 4: P2 visual refinement and empty-state polish
5. PR 5: P2 developer workflow cleanup if still needed

## Notes

- The app has no true multi-route router layer right now, so “routing” work is really about state-driven screen transitions inside one page.
- The most valuable early win is not a new feature; it is making the current layout feel deliberate and consistent across widths.
- Any redesign should keep the current reading flow intact:
  - left side for the reading surface
  - right side for commentary and detail
  - mobile collapsing without hidden content

