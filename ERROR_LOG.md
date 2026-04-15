time: 2026-04-14 17:29 KST
location: scripts/check-encoding.mjs
summary: Existing encoding check failed in `src/components/IChingSection.tsx`
details: `npm.cmd run check:encoding` reported a potential encoding issue in `src/components/IChingSection.tsx`. This was not introduced by the numbered ODT commentary update.
status: open

time: 2026-04-15 10:48 KST
location: PowerShell `npm test`
summary: PowerShell blocked npm script execution
details: Running `npm test` directly in PowerShell failed because `npm.ps1` is blocked by the local execution policy. The command was retried successfully via `cmd /c npm test`.
status: resolved

time: 2026-04-15 12:02 KST
location: PowerShell `npm test`
summary: PowerShell blocked direct npm test execution during verification
details: `npm test -- --run` failed under PowerShell due to the local execution policy blocking `npm.ps1`. The test command will be run through `cmd /c npm test -- --run` instead.
status: resolved
