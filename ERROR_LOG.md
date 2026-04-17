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

time: 2026-04-15 12:50 KST
location: git push origin main
summary: Push failed due to network access error
details: The local commit `c46fd0c` was created successfully, but `git push origin main` failed with a connection error to `github.com` on port 443. Retry is pending.
status: open

time: 2026-04-15 15:50 KST
location: git push origin main
summary: Push failed again due to GitHub connectivity
details: Local commit `d601b3c` succeeded, but `git push origin main` could not reach github.com over HTTPS and timed out immediately. Retry still pending.
status: open

time: 2026-04-15 15:51 KST
location: git push origin main
summary: Push retry succeeded
details: Retried `git push origin main` after a brief connectivity failure, and the local commit `d601b3c` was published to the remote `main` branch.
status: resolved

time: 2026-04-15 21:53 KST
location: PowerShell `npm test` / `npm run build`
summary: PowerShell blocked npm script execution during layout verification
details: Direct `npm` invocation in PowerShell failed because `npm.ps1` is blocked by the local execution policy. Verification completed successfully after rerunning both commands via `cmd /c npm.cmd`.
status: resolved

time: 2026-04-15 23:56 KST
location: git push origin main
summary: Push failed due to temporary GitHub connectivity error
details: Local commit `9ced130` was created successfully, but `git push origin main` could not reach github.com over HTTPS and failed immediately. The retry succeeded moments later.
status: resolved

time: 2026-04-17 11:51 +09:00
location: git push origin main
summary: Push failed due to temporary GitHub connectivity error
details: Local commit 077b98a was created successfully, but git push origin main could not reach github.com over HTTPS. Retry is pending.
status: open


time: 2026-04-17 11:51 +09:00
location: git push origin main
summary: Push retry succeeded
details: Retried git push origin main after a temporary connectivity failure, and commit 077b98a was published to remote main.
status: resolved

