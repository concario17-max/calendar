## 2026-04-21
- task: normalize the soul test fixture to `50?(3? 16-22) / 3?(4? 21-27)`
- route: Route A
- status: resolved
- writer slots: main = `src/components/SoulCalendarSection.test.tsx`
- notes: the rendered component already strips the suffix, and the test fixture now matches the no-`?` title format
- result: the soul section test now expects `50?(3? 16-22) / 3?(4? 21-27)` and verification passed

# Multi-Agent Log

## 2026-04-21
- task: normalize the soul test fixture to `50주(3월 16-22) / 3주(4월 21-27)`
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
- task: normalize the soul test fixture to `50주(3월 16-22) / 3주(4월 21-27)`
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
- task: normalize the soul test fixture to `50주(3월 16-22) / 3주(4월 21-27)`
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
- task: move the `??κ텢 / ?우꼷沅?/ ?怨뱀깕` segmented buttons into the header beside the calendar control and remove the duplicate in-content control
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
- task: swap the left rail order so `??κ텢` appears before `?우꼷沅?, and halve the sigil vertical spacing
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to the left rail order and spacing; data registries remain out of scope\r\n- result: left rail order swapped to put `??觀?? before `??곌섭亦?, and sigil vertical spacing halved



## 2026-04-20
- task: swap the left rail order so `??κ텢` appears before `?우꼷沅?, and halve the sigil vertical spacing
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to the left rail order and spacing; data registries remain out of scope
- result: left rail order swapped to put `??κ텢` before `?우꼷沅?, and sigil vertical spacing halved

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
- task: swap the left rail order back so `??κ텢` appears before `?우꼷沅?
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to left-rail order only; data registries remain out of scope

## 2026-04-20
- task: swap the left rail order back so `??κ텢` appears before `?우꼷沅?
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the left rail order was restored without changing data registries
- result: the left rail again shows `??κ텢` before `?우꼷沅?

## 2026-04-20
- task: differentiate `??κ텢`, `?우꼷沅?, and `Soul` in the left panel so the reading stack is clearly hierarchical
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`
- notes: the task is limited to left-panel typography and spacing hierarchy; data registries remain out of scope

## 2026-04-20
- task: differentiate `??κ텢`, `?우꼷沅?, and `Soul` in the left panel so the reading stack is clearly hierarchical
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`
- notes: the left panel now reads as one main block plus two aligned reference blocks; data registries remain out of scope
- result: the hierarchy is clearer and the three blocks now differ in visual weight

## 2026-04-21
- task: update the soul title range format to `50雅?3??16-22) / 3雅?4??21-27)`
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to soul title formatting and matching tests; data registries remain out of scope
## 2026-04-21`r`n- task: align the title sizes to the `?우꼷沅? title scale and switch the body text to a different color family
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`
- notes: typography and body-color only; data registries and commentary content remain out of scope
- result: the title sizes now follow the `?우꼷沅? scale and the body text uses a separate slate-like color family

## 2026-04-21
- task: update the soul title range format to `50雅?3??16-22) / 3雅?4??21-27)`
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to soul title formatting and matching tests; data registries remain out of scope
## 2026-04-21`r`n- task: unify the body font size across `??κ텢`, `?우꼷沅?, and `???뒻`, and add breathing room below the soul block
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: typography and spacing only; data registries and commentary content remain out of scope
- result: the three left-panel blocks now share a consistent body font size and the soul block has extra bottom breathing room

## 2026-04-21
- task: update the soul title range format to `50雅?3??16-22) / 3雅?4??21-27)`
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to soul title formatting and matching tests; data registries remain out of scope
## 2026-04-21`r`n- task: rename soul section to `?????瑗???怨뱀깕?????? and move the week range into the title slot
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: localized soul title copy only; data registries and commentary content remain out of scope
- result: the soul section now uses the Korean title and shows the week range in the title slot

## 2026-04-21
- task: update the soul title range format to `50雅?3??16-22) / 3雅?4??21-27)`
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to soul title formatting and matching tests; data registries remain out of scope
## 2026-04-21`r`n- task: add visible labels and subtle separators to distinguish `??κ텢`, `?우꼷沅?, and `Soul` in the left panel
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to left-panel labels and separators; data registries remain out of scope

## 2026-04-21
- task: update the soul title range format to `50雅?3??16-22) / 3雅?4??21-27)`
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to soul title formatting and matching tests; data registries remain out of scope
## 2026-04-21`r`n- task: add visible labels and subtle separators to distinguish `??κ텢`, `?우꼷沅?, and `Soul` in the left panel
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the left-panel labels and separators now make the hierarchy obvious; data registries remain out of scope
- result: the left panel now shows clear labels and subtle separators for the three stacked blocks
