## 2026-04-22
- task: rename the three right-side panel header labels to `오늘의 효사`, `오늘의 괘사`, and `루돌프 슈타이너의 영혼의 달력`
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`; reviewer = right-panel header copy review
- notes: the visible right-panel header labels were renamed without changing commentary content, selection behavior, or registries
## 2026-04-22
- task: remove the `2 blocks` count labels from the three right-side panels
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`; reviewer = right-panel header chrome cleanup review
- notes: the count labels were removed from the right-side panel headers without changing content or left-rail layout
## 2026-04-22
- task: remove the extra soul labels from the right soul panel and move `SOUL PANEL` up to align with the other right-side commentary headers
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`; reviewer = right-panel header alignment review
- notes: the soul panel now keeps `Rudolf Steiner''s Calendar of the Soul` visible while removing the extra `영혼` label and week-range subtitle; the `SOUL PANEL` header is aligned with the other right-side commentary headers`r`n- review: keep the soul title visible; only remove the extra labels above it
## 2026-04-21
- task: reduce the left sigil vertical spacing as much as possible without changing the reading order or registries
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`
- notes: the left sigil block now uses tighter top padding, smaller inter-block gaps, and a larger upward pull; verification passed with no registry changes

## 2026-04-21
- task: reduce the left sigil size by roughly 15-20% without changing the reading order or registries
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`
- notes: the left sigil image is now rendered in a smaller canvas width, with verification passing and no registry changes

## 2026-04-21
- task: reduce the left sigil block spacing by half without changing the reading order or registries
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- notes: the left sigil block now sits closer to the top after halving the top padding and negative margin; soul tests were re-aligned to the current render output and verification passed

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

# 2026-05-21
- task: align the feature-side tests with the leaf-module lazy-loading refactor for reading data
- route: Route B
- status: open
- writer slots: feature_tests = `src/hooks/useCalendarLogic.test.ts`, `src/components/IChingSection.test.tsx`; reviewer = `leaf-module lazy-load test alignment review`
- notes: keep visible behavior unchanged, assert async hook resolution from leaf data modules, and update UI expectations to mock the leaf modules rather than the barrel entry

## 2026-05-20
- task: finish the Route B modernization slice and resolve the DatePicker focus-tracking review finding
- route: Route B
- status: resolved
- writer slots: worker-shell = `src/index.css`, `src/components/MainContent.tsx`; worker-feature = `src/components/Header.tsx`, `src/components/DatePicker.tsx`, `src/components/CommentaryModeTabs.tsx`, `src/components/IChingSection.tsx`; reviewer = `DatePicker` focus navigation review
- notes: the date picker now tracks the focused day for arrow-key navigation, preserves PageUp/PageDown month paging on the visible month, and still returns focus to the trigger on Escape; targeted tests and build passed

## 2026-05-20
- task: fix the commentary tab labels and align the header/bonus tests with the current DOM
- route: Route B
- status: open
- writer slots: main = `src/components/CommentaryModeTabs.tsx`, `src/components/Header.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to label text and test expectation alignment; bonus commentary rendering and accessibility polish must stay intact

## 2026-05-20
- task: fix the commentary tab labels and align the header/bonus tests with the current DOM
- route: Route B
- status: resolved
- writer slots: main = `src/components/CommentaryModeTabs.tsx`, `src/components/Header.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the radiogroup label now reads `해설 선택`, the tab labels are readable Korean strings, and the bonus expectations match the current DOM; targeted tests passed

## 2026-05-20
- task: close the remaining design-system review findings by bridging tokens, reducing hardcoded visual values, and softening the global tracking rule
- route: Route B
- status: open
- writer slots: worker_shared = `src/index.css`, `tailwind.config.js`; worker_feature = `src/components/Header.tsx`, `src/components/DatePicker.tsx`, `src/components/JournalModal.tsx`, `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/CommentaryModeTabs.tsx`
- notes: reviewer flagged duplicated token families, lingering hardcoded shadow/color values, and overly tight global tracking; the follow-up pass should keep behavior intact and preserve dark-mode support

## 2026-05-20
- task: close the remaining design-system review findings by bridging tokens, reducing hardcoded visual values, and softening the global tracking rule
- route: Route B
- status: resolved
- writer slots: worker_shared = `src/index.css`, `tailwind.config.js`; worker_feature = `src/components/Header.tsx`, `src/components/DatePicker.tsx`, `src/components/JournalModal.tsx`, `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/CommentaryModeTabs.tsx`
- notes: the semantic tokens are bridged, the shared surface variants are in use, and the body tracking is relaxed enough for mixed Korean/English text; targeted tests and build passed

## 2026-05-20
- task: improve the core UX flow for first-time visitors by clarifying the page purpose and CTA hierarchy, then fix only P0 issues
- route: Route B
- status: open
- writer slots: worker_feature = `src/components/Header.tsx`, `src/components/MainContent.tsx`, `src/components/Header.test.tsx`; reviewer = UX pass review
- notes: the pass is scoped to first-visit comprehension and CTA clarity; mobile density, loading/empty states, and deeper accessibility polish are deferred to later priority buckets

## 2026-05-20
- task: improve the core UX flow for first-time visitors by clarifying the page purpose and CTA hierarchy, then fix only P0 issues
- route: Route B
- status: resolved
- writer slots: worker_feature = `src/components/Header.tsx`, `src/components/MainContent.tsx`, `src/components/CommentaryModeTabs.tsx`, `src/components/Header.test.tsx`, `src/components/IChingSection.test.tsx`; reviewer = UX pass review
- notes: the header now states the archive purpose directly, the primary CTA reads `오늘`, and the main shell adds a short guidance line; targeted tests and build passed

## 2026-04-21
- task: normalize the soul test fixture to `50??3??16-22) / 3??4??21-27)`
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
- task: normalize the soul test fixture to `50??3??16-22) / 3??4??21-27)`
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
- task: normalize the soul test fixture to `50??3??16-22) / 3??4??21-27)`
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
- task: move the `??欲꼲??/ ???⑤슣苑좈썒?/ ????濚? segmented buttons into the header beside the calendar control and remove the duplicate in-content control
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
- task: swap the left rail order so `??欲꼲?? appears before `???⑤슣苑좈썒?, and halve the sigil vertical spacing
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to the left rail order and spacing; data registries remain out of scope\r\n- result: left rail order swapped to put `??轝꿸섣??? before `????ㅼ뒩?묒쥏??, and sigil vertical spacing halved



## 2026-04-20
- task: swap the left rail order so `??欲꼲?? appears before `???⑤슣苑좈썒?, and halve the sigil vertical spacing
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to the left rail order and spacing; data registries remain out of scope
- result: left rail order swapped to put `??欲꼲?? before `???⑤슣苑좈썒?, and sigil vertical spacing halved

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
- task: swap the left rail order back so `??欲꼲?? appears before `???⑤슣苑좈썒?
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the task is limited to left-rail order only; data registries remain out of scope

## 2026-04-20
- task: swap the left rail order back so `??欲꼲?? appears before `???⑤슣苑좈썒?
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the left rail order was restored without changing data registries
- result: the left rail again shows `??欲꼲?? before `???⑤슣苑좈썒?

## 2026-04-20
- task: differentiate `??欲꼲??, `???⑤슣苑좈썒?, and `Soul` in the left panel so the reading stack is clearly hierarchical
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`
- notes: the task is limited to left-panel typography and spacing hierarchy; data registries remain out of scope

## 2026-04-20
- task: differentiate `??欲꼲??, `???⑤슣苑좈썒?, and `Soul` in the left panel so the reading stack is clearly hierarchical
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
## 2026-04-21`r`n- task: align the title sizes to the `???⑤슣苑좈썒? title scale and switch the body text to a different color family
- route: Route B
- status: resolved
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.test.tsx`
- notes: typography and body-color only; data registries and commentary content remain out of scope
- result: the title sizes now follow the `???⑤슣苑좈썒? scale and the body text uses a separate slate-like color family

## 2026-04-21
- task: update the soul title range format to `50??3??16-22) / 3??4??21-27)`
- route: Route B
- status: open
- writer slots: worker-panel = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`, `src/components/IChingSection.test.tsx`
- notes: the change is limited to soul title formatting and matching tests; data registries remain out of scope
## 2026-04-21`r`n- task: unify the body font size across `??欲꼲??, `???⑤슣苑좈썒?, and `?????, and add breathing room below the soul block
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
## 2026-04-21`r`n- task: rename soul section to `?????????????濚?????? and move the week range into the title slot
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
## 2026-04-21`r`n- task: add visible labels and subtle separators to distinguish `??欲꼲??, `???⑤슣苑좈썒?, and `Soul` in the left panel
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
## 2026-04-21`r`n- task: add visible labels and subtle separators to distinguish `??欲꼲??, `???⑤슣苑좈썒?, and `Soul` in the left panel
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
- task: normalize the soul week labels on both sides to `50二?3??16-22?? 쨌 3二?4??21-27??`
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.tsx`
- notes: the left soul title block and the right soul panel now render the same formatted week-label string; verification passed

## 2026-04-21
- task: fix the left soul title block subtitle to `50二?3??16-22?? 쨌 3二?4??21-27??`
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`
- notes: the left soul title block subtitle now uses the requested formatted weeks label; verification passed

## 2026-04-21
- task: rename the soul block label to `?곹샎` and align the subtitle typography with adjacent body text
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

## 2026-04-21
- task: lift the left sigil block upward
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`
- notes: the left sigil block now sits higher in the left rail while preserving reading order; verification passed

## 2026-04-21
- task: mirror the soul-panel decorated surface onto the gua/yao commentary panels
- route: Route B
- status: resolved
- writer slots: main = state/log only; worker-panel = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`; worker-soul = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`
- notes: right-panel commentary now uses the same decorated surface language as the soul panel while leaving the left rail and registries untouched

## 2026-04-21
- task: remove original line-break preservation from commentary prose so paragraphs wrap naturally
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`
- notes: commentary prose no longer preserves source newlines; verification passed

## 2026-04-21
- task: widen the commentary prose body so it wraps less aggressively
- route: Route A
- status: resolved
- writer slots: main = `src/components/IChingSection.tsx`
- notes: commentary prose body now uses a full-width layout instead of a narrow 40ch cap; verification passed

## 2026-04-22
- task: remove the extra soul labels from the right soul panel and align `SOUL PANEL` with the other right-side commentary headers
- route: Route B
- status: active
- writer slots: worker-panel = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`; reviewer = right-panel header alignment review
- notes: the soul panel header and the surrounding right-side commentary chrome need to match the existing header hierarchy; current data/content must remain intact

## 2026-04-22
- task: reduce the right-side boxed surfaces and keep the title, description, and body flowing on a flatter reading surface
- route: Route B
- status: resolved
- writer slots: worker-right = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`; worker-soul = `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`; reviewer = `right-panel simplification review`
- notes: the right-side commentary and soul chrome now use flatter surfaces with fewer boxed containers, and the targeted tests/build passed

## 2026-04-22
- task: emphasize the `🔑 핵심 키워드:` line in the right-side commentary panels with a restrained background highlight
- route: Route B
- status: resolved
- writer slots: worker-keyword = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`; reviewer = `keyword emphasis review`
- notes: the keyword lead line now uses a subtle text-background highlight while other commentary lines remain unstyled and the targeted test/build passed

## 2026-04-22
- task: restore the soul panel to the 76c6695 layout while keeping the rest of the right-side canvas unchanged
- route: Route B
- status: resolved
- writer slots: worker-soul-rollback = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`, `src/components/SoulCalendarSection.tsx`, `src/components/SoulCalendarSection.test.tsx`; reviewer = `soul panel rollback review`
- notes: the shared soul rendering path was restored and the soul shell/chrome returned to the 76c6695 layout; targeted tests and build passed

## 2026-04-22
- task: compact the mobile header chrome and switch the reading panels to a stacked layout below the mobile breakpoint
- route: Route B
- status: resolved
- writer slots: worker-mobile-panels = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`; worker-mobile-shell = `src/components/MainContent.tsx`, `src/components/Header.tsx`, `src/components/Header.test.tsx`; reviewer = `mobile layout review`
- notes: the mobile shell now scrolls naturally, the header stacks into a compact readable chrome on small screens, and the reading panels stack cleanly below the breakpoint; targeted tests and build passed







## 2026-04-22
- task: finish the mobile layout fix by removing the shell CSS that forced the cramped split
- route: Route B
- status: resolved
- writer slots: worker-mobile-panels = `src/components/IChingSection.tsx`, `src/index.css`, `src/components/IChingSection.test.tsx`; worker-mobile-shell = `src/components/MainContent.tsx`, `src/components/Header.tsx`, `src/components/Header.test.tsx`; reviewer = `mobile layout review`
- notes: the mobile shell now allows vertical scrolling, the reading panels stack cleanly below the breakpoint, and the header remains compact on small screens; targeted tests and build passed

## 2026-05-13
- task: optimize the current two-panel reading layout by shifting the left rail content inward, widening the right reading canvas, tightening left spacing, and improving header-to-body flow
- route: Route B
- status: resolved
- writer slots: worker-shell = `src/index.css`, `src/components/Header.tsx`, `src/components/Header.test.tsx`; worker-rail = `src/components/IChingSection.tsx`, `src/components/IChingSection.test.tsx`; reviewer = `layout regression review`
- notes: the task is intentionally split between shared shell/header styling and panel-specific content alignment so write ownership stays disjoint
- review: targeted tests and build passed; reviewer found no concrete regressions and flagged only residual breakpoint-specific visual risk around 768px and 1024px widths

## 2026-04-22
- task: restore mobile date navigation while keeping the compact header and desktop behavior unchanged
- route: Route B
- status: resolved
- writer slots: worker-mobile-header-fix = `src/components/Header.tsx`, `src/components/Header.test.tsx`; reviewer = `mobile header regression review`
- notes: the date picker and Today control are visible again on small screens, the desktop header remains unchanged, and the targeted test/build passed

## 2026-04-22
- task: make the mobile header wrap safely on narrow screens so restored date navigation stays visible
- route: Route B
- status: resolved
- writer slots: worker-mobile-header-wrap = `src/components/Header.tsx`, `src/components/Header.test.tsx`; reviewer = `mobile header wrap review`
- notes: the mobile header now stacks the commentary segmented control separately from the date/today/theme controls, preventing overflow on 320-360px widths while leaving desktop behavior unchanged

## 2026-04-22
- task: render the mobile header as two clean rows with the title on the first row and all controls on the second row
- route: Route B
- status: resolved
- writer slots: worker-mobile-header-rows = `src/components/Header.tsx`, `src/components/Header.test.tsx`; reviewer = `mobile header rows review`
- notes: the mobile header now keeps the title isolated on the first row, places the controls together on the second row, and preserves desktop behavior; targeted test and build passed

## 2026-05-20
- task: refactor the frontend to reduce duplication, split shared UI and business logic, and keep lint/type/build clean without changing behavior
- route: Route B
- status: open
- writer slots: worker_shared = `src/types/index.ts`, `src/utils/logic.ts`, `src/index.css`; worker_reading = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/hooks/useCalendarLogic.ts`; worker_shell = `src/App.tsx`, `src/components/MainContent.tsx`, `src/components/Header.tsx`, `src/components/CommentaryModeTabs.tsx`, `src/components/DatePicker.tsx`, `src/components/JournalModal.tsx`; reviewer = `frontend refactor review`
- notes: the task is split so shared contracts, reading logic, and shell composition can move independently without overlapping write ownership

## 2026-05-21
- task: refactor the frontend to reduce duplication, split shared UI and business logic, and keep lint/type/build clean without changing behavior
- route: Route B
- status: resolved
- writer slots: worker_shared = `src/types/index.ts`, `src/utils/logic.ts`, `src/index.css`; worker_reading = `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`, `src/hooks/useCalendarLogic.ts`; worker_shell = `src/App.tsx`, `src/components/MainContent.tsx`, `src/components/Header.tsx`, `src/components/CommentaryModeTabs.tsx`, `src/components/DatePicker.tsx`, `src/components/JournalModal.tsx`; reviewer = `frontend refactor review`
- notes: duplicate shared contracts were normalized, reading-panel state mirroring was reduced, shell state ownership was centralized, DatePicker/JournalModal responsibilities were tightened, and lint/test/build all passed
# 2026-05-21 Launch-readiness modernization
- Route: Route B
- Summary: reclassified the workspace from the completed refactor pass to a new launch-readiness pass covering shell/spacing, accessibility, and bundle-pressure reduction.
- Contract freeze: updated `STATE.md` with a follow-up write set for `worker_bundle_lazy` after reviewer feedback that the previous chunk split did not reduce startup pressure.
- Contract freeze: `worker_bundle_lazy` now owns the async data-loading boundary plus its hook/component tests.
- Reviewer target: pending.
- Status: open
- 2026-05-21T16:46:42+09:00: implementation starting for the shell/spacing and accessibility slice; scope remains limited to the frozen shell write set.
- 2026-05-21T17:00:00+09:00: shell/spacing normalization and accessibility tightening are implemented and verified with targeted component tests plus lint/build; bundle/data slice remains untouched.
## 2026-05-21
- task: re-scope the bundle-pressure follow-up from barrel-based lazy loading to leaf-module lazy loading after reviewer feedback
- route: Route B
- status: open
- writer slots: worker_bundle_lazy = `src/hooks/useCalendarLogic.ts`, `src/components/IChingSection.tsx`, `src/components/MainContent.tsx`, `src/App.tsx`, `src/hooks/useCalendarLogic.test.ts`, `src/components/IChingSection.test.tsx`, `src/data/guaData.ts`, `src/data/yaoData.ts`, `src/data/soulData.ts`, `src/data/guaCommentary.ts`, `src/data/yaoCommentary.ts`, `src/data/bonusGuaCommentary.ts`, `src/data/bonusYaoCommentary.ts`; reviewer = leaf-module bundle lazy-load review
- notes: the previous barrel import still left the heavy reading-data graph on the initial synchronous path, so the follow-up must import the leaf modules directly and keep the existing behavior intact

## 2026-05-21
- task: close the remaining build fix after the leaf-module lazy-loading cleanup
- route: Route B
- status: resolved
- writer slots: worker_bundle_lazy = `src/components/IChingSection.tsx`; reviewer = leaf-module bundle lazy-load review
- notes: a nullable commentary heading reference in `IChingSection` was tightened, and lint, targeted tests, and build all passed again

- time: 2026-05-21 17:33 KST
  location: npm.cmd test -- --run
  summary: regression in IChingSection empty comic state
  details: comic-view fallback no longer shows the commentary body when the learning image is missing; needs a small render/test alignment.
  status: resolved
- time: 2026-05-21 17:40 KST
  location: STATE.md / MULTI_AGENT_LOG.md
  summary: scope widened to restore empty comic fallback text
  details: keep the leaf-module test alignment, but add a minimal IChingSection fallback change so commentary text remains visible when comic art is missing.
  status: resolved

- time: 2026-05-21 17:40 KST
  location: STATE.md
  summary: design-system cleanup task frozen as Route B
  details: new task spans shared tokens plus multiple component variants; worker split recorded for token/global and surface adoption passes.
  status: open

- time: 2026-05-21 17:55 KST
  location: STATE.md / MULTI_AGENT_LOG.md
  summary: design-system cleanup implementation kicked off with refreshed token contract
  details: token layer and component surface adoption stay split so shared primitives can settle first, then existing UI variants can adopt the new system without behavior drift.
  status: resolved

# 2026-05-21
- task: re-scope the design-system pass from broad token cleanup to component adoption on the shared surface layer
- route: Route B
- status: open
- writer slots: worker_surfaces = `src/components/Header.tsx`, `src/components/CommentaryModeTabs.tsx`, `src/components/DatePicker.tsx`, `src/components/JournalModal.tsx`, `src/components/MainContent.tsx`, `src/components/IChingSection.tsx`, `src/components/SoulCalendarSection.tsx`; reviewer = component-adoption review
- notes: token bridges are already in place; this pass now focuses on getting the listed component surfaces onto the same shared button/card/input/modal/navigation variants without changing behavior

- time: 2026-05-22 09:10 KST
  location: STATE.md
  summary: UX P0 clarity task frozen as Route B
  details: first-visit purpose clarity and CTA clarity were re-scoped into a focused shell-copy pass with one worker and reviewer.
  status: open

- time: 2026-05-22 10:50 KST
  location: STATE.md
  summary: UX P0 clarity task closed
  details: first-visit purpose and CTA clarity were reviewed and verified; task state moved to completed.
  status: resolved
