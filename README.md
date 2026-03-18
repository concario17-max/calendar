# Celestial Ephemeris

Celestial Ephemeris is a contemplative calendar app that maps each selected date to:

1. an I Ching hexagram summary
2. a daily yao passage
3. Rudolf Steiner's Calendar of the Soul verses

It is a static React application with no backend. Source texts are bundled into the app at build time, and journal entries are stored locally in the browser.

## Live Deployments

- Primary app: [https://calendar.simsang.org](https://calendar.simsang.org)
- Cloudflare Pages preview domain: `calendar-2ty.pages.dev`

Important:

- `calendar.simsang.org` is the deployment target for this repository.
- `tibet.simsang.org` belongs to a different Cloudflare Pages project and is not affected by changes in this repo.

## Tech Stack

- React 19
- TypeScript
- Vite 7
- Tailwind CSS
- Vitest + Testing Library
- Cloudflare Pages

## Data Sources

Root text files are the editable source of truth:

- `1.gua.txt`
- `2.yao.txt`
- `3.soul.txt`

The app itself reads generated TypeScript constants:

- `src/data/guaData.ts`
- `src/data/yaoData.ts`
- `src/data/soulData.ts`

To regenerate them after editing the root text files:

```powershell
node convert_data.cjs
```

To verify that generated files still match the root text files:

```powershell
npm run check:data
```

To scan key UI files for mojibake-style replacement characters:

```powershell
npm run check:encoding
```

## Local Development

Install dependencies:

```powershell
npm install
```

Start the dev server:

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Run tests:

```powershell
npm test -- --run
```

## Theme Behavior

- Default theme is always light on first visit.
- If the user explicitly toggles dark mode, the preference is stored in `localStorage.theme`.

## Journal Storage

Journal entries are stored locally in the browser only.

Storage keys:

- `journal_YYYY-MM-DD`
- `journal_q_YYYY-MM-DD`
- `theme`

There is no sync across browsers or devices.

## TXT Export

The journal modal supports two export modes:

- `이 구절 저장`: exports only the currently selected passages
- `전체 구절 저장`: exports all bundled source passages

## Verification Checklist

Before shipping changes:

```powershell
npm run build
npm test -- --run
npm run check:data
npm run check:encoding
```

Then verify on the deployed site:

1. branding and favicon on `calendar.simsang.org`
2. light mode default on mobile
3. date selection around April 1 to April 7
4. journal save and TXT export menu
5. soul section rendering for a date with two verses
