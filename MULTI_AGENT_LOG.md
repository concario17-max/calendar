## 2026-04-21
- task: restore the soul title block on the left rail while keeping the right soul panel unchanged
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the left rail now shows the soul title block without the card body, and the right soul panel remains intact; verification passed

## 2026-04-21
- task: move the soul section cards from the left rail into the right soul panel
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the left rail no longer renders the soul card stack, and selecting soul mode now shows the soul card stack in the right panel; verification passed

## 2026-04-21
- task: align the soul commentary heading with the current soul naming
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the soul commentary heading now uses `Rudolf Steiner's Calendar of the Soul` instead of the old CoTS-derived title; verification passed

## 2026-04-21
- task: normalize the soul test fixture to `50?(3? 16-22) / 3?(4? 21-27)`
- route: Route A
- status: resolved
- writer slots: main = `src/components/SoulCalendarSection.test.tsx`
- notes: the rendered component already strips the suffix, and the test fixture now matches the no-`?` title format
- result: the soul section test now expects `50?(3? 16-22) / 3?(4? 21-27)` and verification passed

# Multi-Agent Log

## 2026-04-21
- task: normalize the soul test fixture to `50雅?3??16-22) / 3雅?4??21-27)`
- route: Route A
- status: open
- writer slots: main = `src/components/SoulCalendarSection.test.tsx`
- notes: the rendered component already strips the suffix, but the test fixture still carried the older input string
## 2026-04-19
- task: delete the top blank space above the reading rail
- route: Route B
- status: resolved
- writer slots: worker-1 = src/components/MainContent.tsx; src/components/IChingSection.tsx; reviewer = visual spacing regression review
- notes: the initial gap was removed by zeroing shell and panel padding

## 2026-04-21
- task: normalize the soul test fixture to `50雅?3??16-22) / 3雅?4??21-27)`
- route: Route A
- status: open
- writer slots: main = `src/components/SoulCalendarSection.test.tsx`
- notes: the rendered component already strips the suffix, but the test fixture still carried the older input string
## 2026-04-19
- task: remove the fade-in-up translateY offset from the reading rail
- route: Route B
- status: resolved
- writer slots: worker-1 = src/components/MainContent.tsx; src/components/IChingSection.tsx; reviewer = visual spacing regression review
- notes: the remaining offset came from the animation class, which was removed from the main shell and reading section

## 2026-04-21
- task: normalize the soul test fixture to `50雅?3??16-22) / 3雅?4??21-27)`
- route: Route A
- status: open
- writer slots: main = `src/components/SoulCalendarSection.test.tsx`
- notes: the rendered component already strips the suffix, but the test fixture still carried the older input string
## 2026-04-19
- task: reduce the perceived narrowness in the reading layout
- route: Route B
- status: resolved
- writer slots: worker-shell = src/components/MainContent.tsx (reverted); worker-panel = src/components/IChingSection.tsx; src/components/SoulCalendarSection.tsx; src/components/IChingSection.test.tsx; src/components/SoulCalendarSection.test.tsx; reviewer = layout spacing regression review
- notes: the shell-width tweak was reverted after review; the final change set widened the reading rail via internal paddings, row heights, and content clamps, with tests updated for the current soul label format

## 2026-04-20
- task: implement a fixed-width left rail and a responsive right panel
- route: Route B
- status: resolved
- writer slots: worker-shell = `src/components/MainContent.tsx`; worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`; reviewer = fixed-rail regression review
- notes: the left rail now uses a fixed px width with scroll-safe behavior, and the right panel absorbs viewport changes responsively

## 2026-04-20
- task: apply the design-folder editorial shell and remove divider-heavy separation
- route: Route B
- status: resolved
- writer slots: worker-shell = `src/components/MainContent.tsx`, `src/components/Header.tsx`, `src/index.css`, `tailwind.config.js`; worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`; reviewer = editorial contrast regression review
- notes: tonal contrast now carries the left/right separation, with visible border/divider usage reduced to accent-only levels where possible

## 2026-04-20
- task: move the `??鰲??/ ??怨뚯꽠雅?/ ????繹? segmented buttons into the header beside the calendar control and remove the duplicate in-content control
- route: Route B
- status: resolved
- writer slots: worker-shell = `src/components/Header.tsx`, `src/components/MainContent.tsx`; worker-nav = `src/components/Header.tsx`, `src/components/IChingSection.tsx`
- notes: the header control row absorbed the segmented buttons while the reading panel lost the duplicated in-content control. The task was re-scoped again into shell chrome cleanup after the design-shell rebuild completed.

## 2026-04-20
- task: rename the header title to `Celestial Ephemeris`, keep the segmented control in the header, and remove shell chrome labels and controls
- route: Route B
- status: resolved
- writer slots: worker-shell = `src/components/Header.tsx`, `src/components/MainContent.tsx`; worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the header title was renamed to Celestial Ephemeris, the segmented control stays left of the calendar control, and the shell chrome labels/controls were stripped back while leaving the current data and commentary content intact

## 2026-04-20
- task: restore the Today block and theme toggle in the header while keeping the segmented control to the left of the calendar control
- route: Route B
- status: resolved
- writer slots: worker-shell = `src/components/Header.tsx`, `src/components/Header.test.tsx`; worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the header Today block and theme toggle were restored while keeping the shell label cleanup intact and leaving data registries and commentary content untouched

## 2026-04-20
- task: switch typography to Pretendard-first with serif reserved for titles only
- route: Route B
- status: resolved
- writer slots: worker-shell = `src/components/Header.tsx`, `src/components/MainContent.tsx`, `tailwind.config.js`, `src/index.css`; worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/Header.test.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`
- notes: Pretendard now drives the app body/control text while serif styling is kept to title surfaces only; data registries remain out of scope

## 2026-04-20
- task: make the entire app use Pretendard only
- route: Route B
- status: resolved
- writer slots: worker-shell = `src/components/Header.tsx`, `src/components/MainContent.tsx`, `tailwind.config.js`, `src/index.css`; worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/Header.test.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`
- notes: the task narrowed the shared typography stack to Pretendard only by removing serif families from the application font system; data registries remain out of scope

## 2026-04-20
- task: tighten the UI density and visual rhythm
- route: Route B
- status: resolved
- writer slots: worker-shell = `src/components/Header.tsx`, `src/components/MainContent.tsx`, `src/index.css`, `tailwind.config.js`; worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/Header.test.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`
- notes: spacing, rhythm, and accent-color refinement were tightened across the shell and reading panels without changing data registries

## 2026-04-20
- task: swap the left rail order so `??鰲?? appears before `??怨뚯꽠雅?, and halve the sigil vertical spacing
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to the left rail order and spacing; data registries remain out of scope\r\n- result: left rail order swapped to put `??欲꼲?? before `???⑤슣苑좈썒?, and sigil vertical spacing halved



## 2026-04-20
- task: swap the left rail order so `??鰲?? appears before `??怨뚯꽠雅?, and halve the sigil vertical spacing
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to the left rail order and spacing; data registries remain out of scope
- result: left rail order swapped to put `??鰲?? before `??怨뚯꽠雅?, and sigil vertical spacing halved

## 2026-04-20
- task: lift the sigil block higher inside the left rail without changing the content order
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to the sigil position; data registries remain out of scope

## 2026-04-20
- task: lift the sigil block higher inside the left rail without changing the content order
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to the sigil position; data registries remain out of scope
- result: the sigil block now sits higher in the left rail and the content order stays intact

## 2026-04-20
- task: regroup the left panel into one main reading block and two aligned reference blocks so the panel reads as a cleaner stack
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to left-panel hierarchy and spacing; data registries remain out of scope

## 2026-04-20
- task: regroup the left panel into one main reading block and two aligned reference blocks so the panel reads as a cleaner stack
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to left-panel hierarchy and spacing; data registries remain out of scope

## 2026-04-20
- task: regroup the left panel into one main reading block and two aligned reference blocks so the panel reads as a cleaner stack
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the left panel now reads as one main block plus two aligned reference blocks; data registries remain out of scope
- result: the left panel hierarchy was cleaned up without changing the content order semantics or commentary data

## 2026-04-20
- task: swap the left rail order back so `??鰲?? appears before `??怨뚯꽠雅?
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to left-rail order only; data registries remain out of scope

## 2026-04-20
- task: swap the left rail order back so `??鰲?? appears before `??怨뚯꽠雅?
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the left rail order was restored without changing data registries
- result: the left rail again shows `??鰲?? before `??怨뚯꽠雅?

## 2026-04-20
- task: differentiate `??鰲??, `??怨뚯꽠雅?, and `Soul` in the left panel so the reading stack is clearly hierarchical
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`
- notes: the task is limited to left-panel typography and spacing hierarchy; data registries remain out of scope

## 2026-04-20
- task: differentiate `??鰲??, `??怨뚯꽠雅?, and `Soul` in the left panel so the reading stack is clearly hierarchical
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`
- notes: the left panel now reads as one main block plus two aligned reference blocks; data registries remain out of scope
- result: the hierarchy is clearer and the three blocks now differ in visual weight

## 2026-04-21
- task: update the soul title range format to `50??3??16-22) / 3??4??21-27)`
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to soul title formatting and matching tests; data registries remain out of scope
## 2026-04-21`r`n- task: align the title sizes to the `??怨뚯꽠雅? title scale and switch the body text to a different color family
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`
- notes: typography and body-color only; data registries and commentary content remain out of scope
- result: the title sizes now follow the `??怨뚯꽠雅? scale and the body text uses a separate slate-like color family

## 2026-04-21
- task: update the soul title range format to `50??3??16-22) / 3??4??21-27)`
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to soul title formatting and matching tests; data registries remain out of scope
## 2026-04-21`r`n- task: unify the body font size across `??鰲??, `??怨뚯꽠雅?, and `?????, and add breathing room below the soul block
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: typography and spacing only; data registries and commentary content remain out of scope
- result: the three left-panel blocks now share a consistent body font size and the soul block has extra bottom breathing room

## 2026-04-21
- task: update the soul title range format to `50??3??16-22) / 3??4??21-27)`
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to soul title formatting and matching tests; data registries remain out of scope
## 2026-04-21`r`n- task: rename soul section to `?????????????繹?????? and move the week range into the title slot
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: localized soul title copy only; data registries and commentary content remain out of scope
- result: the soul section now uses the Korean title and shows the week range in the title slot

## 2026-04-21
- task: update the soul title range format to `50??3??16-22) / 3??4??21-27)`
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to soul title formatting and matching tests; data registries remain out of scope
## 2026-04-21`r`n- task: add visible labels and subtle separators to distinguish `??鰲??, `??怨뚯꽠雅?, and `Soul` in the left panel
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to left-panel labels and separators; data registries remain out of scope

## 2026-04-21
- task: update the soul title range format to `50??3??16-22) / 3??4??21-27)`
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to soul title formatting and matching tests; data registries remain out of scope
## 2026-04-21`r`n- task: add visible labels and subtle separators to distinguish `??鰲??, `??怨뚯꽠雅?, and `Soul` in the left panel
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the left-panel labels and separators now make the hierarchy obvious; data registries remain out of scope
- result: the left panel now shows clear labels and subtle separators for the three stacked blocks
## 2026-04-21
- task: narrow the sigil area in the left rail so it stops feeling oversized
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`
- notes: the sigil block now uses a narrower max width without touching registries or commentary content
- result: the left rail sigil area is visibly slimmer and build verification passed

## 2026-04-21
- task: normalize title widths to `max-w-[40ch]` for the reading titles
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`
- notes: the ??, ??, and ?? titles now share a 40ch cap while body widths stay unchanged
- result: the title widths are unified and build verification passed

## 2026-04-21
- task: normalize reading body widths to `max-w-[40ch]` for the main reading content blocks
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`
- notes: the main reading summary/body blocks now share a 40ch cap while titles keep their existing widths
- result: the reading body widths are normalized and build verification passed
## 2026-04-21
- task: replace the soul panel title with `Rudolf Steiner's Calendar of the Soul` and render the lower soul text in a heavily decorated card
- route: Route A
- status: resolved
- writer slots: main = `src/components/SoulCalendarSection.tsx`
- notes: the soul panel now shows the English title and a decorative card body for the current soul sections
- result: the soul panel title/body update is complete and verification passed

- 2026-04-21: JournalModal soul export text aligned to the current soul naming; verified with JournalModal test and build.

## 2026-04-21
- task: normalize the soul week labels on both sides to `50주(3월 16-22일) · 3주(4월 21-27일)`
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.tsx`
- notes: the left soul title block and the right soul panel now render the same formatted week-label string; verification passed

## 2026-04-21
- task: fix the left soul title block subtitle to `50주(3월 16-22일) · 3주(4월 21-27일)`
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the left soul title block subtitle now uses the requested formatted weeks label; verification passed

## 2026-04-21
- task: rename the soul block label to `영혼` and align the subtitle typography with adjacent body text
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: both soul title blocks now use the shorter label and the week-label subtitle matches the surrounding body-text styling; verification passed

## 2026-04-21
- task: add bottom breathing room below the left soul subtitle
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`
- notes: the left soul title block now has extra bottom spacing below the subtitle; verification passed
