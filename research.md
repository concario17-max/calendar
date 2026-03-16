# Calendar Project Research Report

Last reviewed commit: `d45028c`
Report updated: 2026-03-16

## 1. Executive Summary

This project is a single-page React application that maps a selected date to:

1. an I Ching `yaoNum`
2. a derived `guaNum`
3. a matching `Calendar of the Soul` weekly section

The app does not use any external API for content lookup. Its domain data lives inside the repository in three large text files:

- `1.gua.txt`
- `2.yao.txt`
- `3.soul.txt`

Those source files are converted into TypeScript string constants in `src/data/*.ts`, then parsed in the browser at runtime.

The major work completed during this review was:

1. code-layer mojibake cleanup
2. restoration of the text source files from healthy git history
3. regeneration of `src/data/*.ts`
4. Korean UI label normalization
5. improvement of soul-calendar parsing so section headers and subtitles survive the restored source format

Current build and test status is healthy.

## 2. Stack and Runtime Model

### 2.1 Tech stack

- React 19
- TypeScript 5.9
- Vite 7
- Tailwind CSS 3
- Vitest + jsdom
- `lucide-react` icons

### 2.2 Core runtime shape

Entry flow:

`index.html`
-> `src/main.tsx`
-> `App`
-> `useCalendarLogic`
-> rendered sections

There is no router and no multi-page navigation. The whole experience is one stateful screen.

## 3. Repository Structure

### 3.1 Application code

- `src/main.tsx`
  - mounts the app
- `src/App.tsx`
  - top-level orchestration
  - toast display
  - journal modal state
- `src/components/`
  - presentational sections and modal UI
- `src/hooks/`
  - theme logic and date-to-content mapping
- `src/utils/`
  - parsing, numbering, range matching
- `src/types/`
  - typed parsing outputs
- `src/data/`
  - generated string constants

### 3.2 Source-of-truth content files

- `1.gua.txt`
- `2.yao.txt`
- `3.soul.txt`

These are the real content database for the app.

### 3.3 Generation script

- `convert_data.cjs`
  - converts the root text files into:
    - `src/data/guaData.ts`
    - `src/data/yaoData.ts`
    - `src/data/soulData.ts`

### 3.4 Static assets

- `public/images/yao-25.png` through `public/images/yao-384.png`

These images are referenced directly by `yaoNum`.

## 4. How the App Works

## 4.1 Top-level state

`useCalendarLogic()` produces:

- `selectedDate`
- `setSelectedDate`
- `yaoNum`
- `guaNum`
- `guaData`
- `yaoData`
- `hitSoulGroup`
- `soulSections`

`App.tsx` additionally owns:

- `isJournalOpen`
- `toastMessage`

## 4.2 Date selection

The header contains a custom date picker.

Behavior:

- open calendar popover
- move month with chevrons
- choose a date
- keyboard arrows move by day or week while open
- `Escape` closes
- outside click closes

The `Today` button resets to `new Date()`.

## 4.3 Theme

`useTheme()` reads:

1. `localStorage.theme`
2. system dark-mode preference if no saved value exists

It toggles the `dark` class on `document.documentElement`.

## 4.4 Journal

The journal is browser-local only.

Storage keys:

- `journal_YYYY-MM-DD`
- `journal_q_YYYY-MM-DD`

Capabilities:

- write per-date journal text
- save locally
- download a `.txt` export
- show a guided prompt derived from the selected yao title

## 5. Domain Logic

## 5.1 Parsing at startup

`useCalendarLogic()` parses the source text once via `useMemo([])`:

- `parseNumberedBlocks(GUA_TEXT)`
- `parseNumberedBlocks(YAO_TEXT)`
- `parseSoulGroups(SOUL_TEXT)`

That creates:

- `GUA_MAP`
- `YAO_MAP`
- `SOUL_GROUPS`

## 5.2 Date to yao

`calcYaoNum(date)` uses a fixed cycle:

- cycle start: April 7
- active span: 360 days
- valid mapping: `25..384`
- April 2 through April 6 return `null`

This means the app intentionally leaves a gap before the yearly cycle restarts.

## 5.3 Yao to gua

`calcGuaNum(yaoNum)` uses:

`Math.floor((yaoNum - 1) / 6) + 1`

So each gua corresponds to six yao values.

## 5.4 Soul calendar matching

For the selected month/day:

1. the app finds the matching soul group
2. then splits that group into weekly sections
3. then renders the first two sections of the matched group

This is why the soul section is effectively a two-card view.

## 6. Current Parsing Rules

## 6.1 `parseNumberedBlocks`

Used for `gua` and `yao`.

Boundary pattern:

`/^(\d+)\.\s/mg`

Output:

`Map<number, string>`

## 6.2 `splitGua`

Output:

- first line -> `header`
- remaining lines -> `meta`

## 6.3 `splitYao`

Output:

- `titleLine`
- `short`
- `body`

The first paragraph after the title becomes `short`, and the remaining paragraphs become `body`.

## 6.4 `parseSoulGroups`

Group title detection:

`CoTS Verses for Weeks ...`

For each group it extracts:

- label
- week numbers
- date ranges
- raw block text

## 6.5 `parseWeekSectionsFromGroupBlock`

Recent improvement:

- restored Korean source format is now respected
- trailing text after a weekly date header is preserved
- lines like `1주 (4월 7-13) 부활절 / 봄` keep the subtitle instead of losing it

## 6.6 `extractWeeksLabel`

Recent improvement:

- labels now render in Korean style
- example: `52주 · 1주`

instead of the earlier English `Weeks 52 & 1`

## 7. UI Status After Cleanup

## 7.1 What was fixed

The UI was normalized to Korean in visible labels such as:

- app title
- button labels
- empty states
- journal actions
- toast copy
- section headings

Examples now used in UI:

- `심상 달력`
- `오늘`
- `오늘의 묵상`
- `영혼의 달력`
- `저널 기록`
- `저장하기`
- `취소`

## 7.2 Soul section improvements

The soul section now aims to preserve subtitle lines such as:

- `부활절 / 봄`
- `성요한 절기`
- seasonal markers when they appear as standalone leading lines

This was a direct result of restoring the source text and updating the parser.

## 8. Data Recovery Findings

This review confirmed that the broken source text seen in the working tree was not the only version available.

Healthy historical content existed in git:

- `1.gua.txt` restored from `cab8715`
- `2.yao.txt` restored from `cab8715`
- `3.soul.txt` restored from `5bc6bd4`

After restoration, `convert_data.cjs` was rerun to regenerate:

- `src/data/guaData.ts`
- `src/data/yaoData.ts`
- `src/data/soulData.ts`

Important note:

PowerShell console output may still display mojibake depending on terminal encoding, but Node/Vite file reads were verified to contain healthy text. Since the app and build pipeline use Node-based reads, that is the relevant validation path.

## 9. Testing Status

Current automated status:

- build passes
- all 25 tests pass

Main test coverage areas:

- date mapping
- gua/yao math
- newline normalization
- numbered block parsing
- soul group parsing
- guided question extraction

## 10. Strengths

1. Clear separation between source content, parsing, and presentation
2. No server dependency for the core product behavior
3. UTC-based day mapping avoids many timezone boundary errors
4. Most important business logic is testable in utility functions
5. Journal persistence is simple and understandable

## 11. Remaining Risks

1. Terminal encoding can still make healthy files appear broken during manual inspection
2. Not all UI behavior is covered by component-level tests
3. `App.css` is still a leftover template artifact and appears unused
4. `generate_data.js` appears legacy and may confuse future maintenance
5. Bundle size remains large because large text constants are shipped inside the JS bundle

## 12. Recommended Next Steps

Recommended order:

1. Update or replace `research.md`-adjacent process docs that still assume the old broken state
2. Remove or archive unused legacy files like `App.css` and `generate_data.js` after confirming they are not needed
3. Add at least one integration test around soul-section rendering using restored Korean source text
4. Consider moving large content out of JS constants if bundle size becomes a real issue

## 13. Final Assessment

The project is in much better shape than it first appeared.

At the start of the investigation, the most serious concern was widespread text corruption. After reviewing history and restoring the real source files, the app now has:

- restored domain text
- regenerated data constants
- normalized Korean UI labels
- stronger soul-calendar parsing
- passing build and test validation

The codebase should now be understood primarily as:

`date-driven text mapping application`

rather than a generic React UI project.
