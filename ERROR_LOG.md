time: 2026-05-22 11:46 KST
location: `npm.cmd run test -- --run src/components/IChingSection.test.tsx src/components/SoulCalendarSection.test.tsx`
summary: Initial targeted test run failed after shared wrapper extraction
details: `IChingSection.test.tsx` could not find `data-testid="commentary-folio"` because the new shared `CommentaryFrame` prop was passed as `data-testid` instead of `testId`. The prop name was corrected and the targeted tests passed on retry.
status: resolved

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


time: 2026-04-17 11:51 +09:00
location: git push origin main
summary: Push failed again due to temporary GitHub connectivity error
details: Local commit 7336e67 was created successfully, but git push origin main could not reach github.com over HTTPS. Retry is pending.
status: open


time: 2026-04-17 11:51 +09:00
location: git push origin main
summary: Push retry succeeded
details: Retried git push origin main after a temporary connectivity failure, and commit 7336e67 was published to remote main.
status: resolved

time: 2026-04-18 21:25 KST
location: git commit
summary: Commit blocked by index.lock permission error while finalizing per-section commentary buttons
details: `git commit -m "feat: add per-section commentary buttons"` failed once with `fatal: Unable to create 'C:/Users/roadsea/Desktop/calendar/.git/index.lock': Permission denied` after staging succeeded. Retry is pending.
status: open

time: 2026-04-21 16:08 KST
location: `npm.cmd test -- --run src/components/IChingSection.test.tsx src/components/SoulCalendarSection.test.tsx`
summary: Soul section tests failed against stale labels and week-range expectations
details: `SoulCalendarSection.test.tsx` was still asserting the older soul label and subtitle strings, so the targeted test run failed even though the runtime output had already moved to the current soul title and formatted week-range text. The test fixtures need to be aligned with the current render output before re-running verification.
status: open

time: 2026-04-21 16:11 KST
location: PowerShell chained verification command
summary: PowerShell rejected `&&` in the verification command
details: A chained `npm.cmd test ... && npm.cmd run build` invocation failed because this PowerShell version does not accept `&&` as a statement separator. The verification needs to be rerun with separate commands or through `cmd /c`.
status: open

time: 2026-04-21 16:12 KST
location: `npm.cmd test -- --run src/components/IChingSection.test.tsx src/components/SoulCalendarSection.test.tsx`
summary: Soul section test fixtures were aligned with the current render output
details: The soul section test expectations were updated from the stale label and week-range strings to the current rendered text, and the targeted test run then passed.
status: resolved

time: 2026-04-21 16:12 KST
location: PowerShell chained verification command
summary: Verification rerun through `cmd /c` succeeded
details: The failed chained verification was rerun as separate `cmd /c` commands, and both the targeted tests and the build completed successfully.
status: resolved

time: 2026-04-18 22:36 KST
location: git commit
summary: Commit blocked by index.lock permission error while restoring the soul header
details: `git commit -m "fix: restore soul header and remove soul cards"` failed with `fatal: Unable to create 'C:/Users/roadsea/Desktop/calendar/.git/index.lock': Permission denied` after staging succeeded. Retry pending.
status: open

time: 2026-04-18 21:25 KST
location: git commit / git push origin main
summary: Commit and push succeeded after retrying with elevated permissions
details: Retried the commit with escalated permissions, created commit `24cb3da`, and pushed it to `origin/main` successfully.
status: resolved

time: 2026-04-18 21:26 KST
location: git add ERROR_LOG.md
summary: Stage blocked by index.lock permission error while closing error log
details: `git add ERROR_LOG.md` failed with `fatal: Unable to create 'C:/Users/roadsea/Desktop/calendar/.git/index.lock': Permission denied` while trying to stage the error log for a follow-up docs commit.
status: open

time: 2026-04-18 21:26 KST
location: git add / git commit / git push origin main
summary: Error log staged and published after retrying with elevated permissions
details: Retried staging with escalated permissions, created follow-up docs commit `263a164`, and pushed it to `origin/main`. The error log entry is now captured in the repository.
status: resolved

time: 2026-04-18 16:38 KST
location: git commit / git push origin main
summary: Commit blocked by index lock permission error and push blocked by HTTPS connectivity
details: After the left-panel alignment change, `git commit -m "fix: align today's reading with commentary row"` failed with `Unable to create '.git/index.lock': Permission denied`. A prior `git add -u` completed, so the repository is staged, but commit/push still needs to be retried. A subsequent `git push origin main` attempt also failed because github.com could not be reached over HTTPS from the sandboxed shell.
status: open

time: 2026-04-18 16:39 KST
location: git commit / git push origin main
summary: Commit and push retried successfully after permission and connectivity issues
details: Re-ran the commit with elevated permissions, created commit `b72f8cb`, and successfully pushed it to `origin/main`.
status: resolved

time: 2026-04-18 21:38 KST
location: git add STATE.md src/App.tsx src/components/Header.tsx src/components/MainContent.tsx src/hooks/useCalendarLogic.ts
summary: Staging blocked by index.lock permission error while finalizing shell wiring cleanup
details: Attempting to stage the shell wiring slice failed with `fatal: Unable to create '.git/index.lock': Permission denied`. The repository will retry staging with elevated permissions.
status: open

## 2026-04-19 17:32:21
- location: `git add STATE.md src/components/IChingSection.tsx`
- summary: staging failed with a permission error
- details: `git add` returned `Unable to create '.git/index.lock': Permission denied` while preparing the small layout update commit.
- status: open

## 2026-04-19 17:32:21
- location: `git add STATE.md src/components/IChingSection.tsx`
- summary: staging retry succeeded after escalating permissions
- details: the same layout update was staged, committed, and pushed successfully after rerunning the git write step outside the sandbox.
- status: resolved
time: 2026-04-19 17:52 KST
location: git add / git commit / git push origin main
summary: Commit flow blocked by index.lock permission error and GitHub connectivity failure
details: Attempting to stage STATE.md, src/components/IChingSection.tsx, src/components/SoulCalendarSection.tsx, and MULTI_AGENT_LOG.md failed with Unable to create '.git/index.lock': Permission denied. The follow-up push also failed to reach github.com over HTTPS. Retry is pending.
status: open
time: 2026-04-19 17:52 KST
location: git add / git commit / git push origin main
summary: Commit flow resolved after retrying outside the sandbox
details: The typography hotfix and agent log were committed as `f5e35a9` and pushed to `origin/main` successfully after retrying the git write step with elevated permissions.
status: resolved
time: 2026-04-19 20:08 KST
location: git commit
summary: Commit blocked by index.lock permission error
details: `git commit -m "style: widen reading panels and sync soul labels"` failed with `Unable to create '.git/index.lock': Permission denied` after the current layout changes were staged. Retry outside the sandbox is required.
status: open
time: 2026-04-19 20:09 KST
location: git commit / git push origin main
summary: Layout spacing changes committed and pushed after retry
details: The widened reading panel adjustments and their matching tests were committed as `185f589` and pushed to `origin/main` after retrying the git write step with elevated permissions.
status: resolved
## 2026-04-20
- time: 2026-04-20 14:13 KST
- location: git add
- summary: index.lock permission blocked staging
- details: `git add` failed with `Unable to create ... .git/index.lock: Permission denied` while staging the design-folder editorial shell changes. Implementation files were not yet staged.
- status: resolved

## 2026-04-20
- time: 2026-04-20 14:15 KST
- location: git commit
- summary: index.lock permission blocked commit
- details: `git commit -m "feat: recreate app with design editorial layout"` failed with `Unable to create ... .git/index.lock: Permission denied` after staging completed. Retry with elevated permissions is required.
- status: open

## 2026-04-20
- time: 2026-04-20T??:??:??+09:00
- location: spawn_agent(thread)
- summary: subagent thread limit reached while splitting header and panel work
- details: attempted to create a second worker for IChingSection, but the environment reported a maximum of 6 active threads; collapsed the write set into one worker lane.
- status: resolved

## 2026-04-20
- time: 2026-04-20T??:??:??+09:00
- location: shell_command(Select-String)
- summary: recursive search failed because PowerShell Select-String does not support -Recurse in this invocation
- details: attempted to find commentarySource references across src with Select-String -Recurse; command rejected the parameter
- status: resolved
- time: 2026-04-20T00:00:00+09:00
  location: terminal
  summary: git add/commit command failed on PowerShell command separator
  details: The attempted combined git command used '&&', which PowerShell does not parse as a statement separator in this environment.
  status: resolved

## 2026-04-20
- time: 2026-04-20 21:33 KST
- location: git add / git commit
- summary: PowerShell command separator blocked the commit path
- details: the combined git command used `&&`, which PowerShell in this workspace does not accept as a statement separator. The change set itself is intact; reran the git steps separately.
- status: resolved
- time: 2026-04-21 09:07
  location: git commit step
  summary: PowerShell does not support '&&' in this environment
  details: Initial combined add/commit command failed before staging or commit. Will retry with separate commands.
  status: open

- time: 2026-04-21 09:08
  location: git commit step
  summary: PowerShell command separator retry succeeded
  details: Retried staging and commit with semicolon-separated PowerShell commands after the initial '&&' parse failure.
  status: resolved

- time: 2026-04-21 09:09
  location: verification step
  summary: PowerShell does not support '&&' in this environment
  details: Combined test/build command failed before execution. Will retry as separate commands.
  status: open

- time: 2026-04-21 09:09
  location: verification step
  summary: PowerShell separator retry succeeded
  details: Re-ran test and build as separate PowerShell commands after the initial parse failure.
  status: resolved

- time: 2026-04-21 09:10
  location: git commit step
  summary: PowerShell rejected '&&' while staging and committing
  details: The combined git add/commit command failed at parse time in PowerShell. Retrying with separated commands.
  status: resolved

- time: 2026-04-21
  location: PowerShell git commit step
  summary: Git command failed because PowerShell does not accept `&&` as a statement separator in this shell.
  details: The combined stage/commit/push command aborted before commit execution. Re-run with semicolons or separate commands.
  status: resolved
- time: 2026-04-22 00:00 KST
  location: shell_command / rg.exe
  summary: rg access denied while scanning src/components
  details: rg.exe returned Access is denied when searching for soul-panel strings; Select-String and Get-Content were used instead.
  status: resolved

- time: 2026-04-22 09:23 KST
  location: PowerShell `npm test`
  summary: PowerShell blocked npm.ps1 during targeted soul panel test run
  details: `npm test -- src/components/SoulCalendarSection.test.tsx --run` failed under PowerShell because `npm.ps1` is blocked by the local execution policy. The command was rerun successfully via `npm.cmd`.
  status: resolved
- time: 2026-04-22 00:00 KST
  location: shell_command / rg.exe; PowerShell npm.ps1
  summary: fallback inspection and npm.cmd rerun resolved the soul-panel verification blockers
  details: rg.exe access denied was bypassed with Select-String/Get-Content, and PowerShell execution-policy blocking of npm.ps1 was bypassed by rerunning the targeted test with npm.cmd.
  status: resolved
- time: 2026-04-22 14:33 KST
  location: PowerShell `npm test` / `npm run build`
  summary: PowerShell execution policy blocked npm.ps1 during verification
  details: Both targeted test and build commands failed before execution because PowerShell could not load `npm.ps1`. Will rerun via `npm.cmd` to complete verification.
  status: resolved
- time: 2026-04-22 14:33 KST
  location: PowerShell `npm test`
  summary: PowerShell execution policy blocked the initial targeted soul-panel test run
  details: `npm test -- --run src/components/SoulCalendarSection.test.tsx` failed because PowerShell attempted to load `npm.ps1`, which is blocked by the local execution policy. The command will be rerun via `npm.cmd`.
  status: resolved
- time: 2026-04-22 14:37 KST
  location: PowerShell `npm test` / `npm run build`
  summary: verification reran successfully via `npm.cmd`
  details: The earlier PowerShell execution-policy failure was bypassed by rerunning both commands with `npm.cmd`; targeted tests and production build then passed.
  status: resolved
- time: 2026-04-22 14:37 KST
  location: `src/components/IChingSection.tsx`
  summary: build failure from missing `SoulCalendarSection` import was removed
  details: `IChingSection` no longer depends on a missing sibling module; the soul-panel rendering is handled locally, which restored the build.
  status: resolved
- time: 2026-04-22 14:41 KST
  location: PowerShell shell command composition
  summary: command chaining used invalid `&&` syntax in this PowerShell session
  details: A status-check command failed because PowerShell here does not accept `&&` as a statement separator. The command was rerun with `;` and the workspace check completed successfully.
  status: resolved
- time: 2026-04-22 17:20 KST
  location: PowerShell shell command composition
  summary: git commit chain failed because `&&` is unsupported in this PowerShell session
  details: A combined `git add && git commit && git push` command failed before staging because this shell treats `&&` as an invalid statement separator. The command will be rerun with PowerShell separators or separate commands.
  status: resolved

## 2026-04-29
- time: 2026-04-29 Asia/Seoul
- location: STATE.md route setup
- summary: apply_patch could not read STATE.md because the file contained invalid UTF-8 bytes.
- details: Rewrote STATE.md with UTF-8 content so the required route log could be recorded before implementation.
- status: resolved
- time: 2026-04-29 10:41 KST
- location: `npm.cmd run build`
- summary: production build is blocked by an unrelated type error in `src/components/IChingSection.test.tsx`
- details: `tsc -b` now fails on `Cannot find name 'readingVerseUnit'` in `src/components/IChingSection.test.tsx:147`, which is outside the files owned by this slice. The header test still passes; build verification remains deferred until that unrelated error is fixed.
- status: open
- time: 2026-04-29 Asia/Seoul
- location: `npm.cmd run build`
- summary: previous build-blocking type error is resolved after the reading canvas test update.
- details: `npm.cmd run build` passed; Vite reported only the existing large chunk size warning.
- status: resolved

- time: 2026-05-12 11:20 KST
- location: `npm.cmd run build`
- summary: nested commentary list patch initially failed type-check in the flat-list fallback
- details: `src/components/IChingSection.tsx` returned `{ text: string | null }[]` from the plain list fallback, so `tsc -b` rejected the first build attempt during verification. The fallback was narrowed and the build was rerun.
- status: resolved

- time: 2026-05-13 12:46 KST
- location: `git add`
- summary: git staging was briefly blocked by a stale `index.lock` report after a failed PowerShell chained command.
- details: a combined `git add && git commit` command failed because this PowerShell session does not accept `&&`, and the next staging attempt reported `.git/index.lock`. The lock was gone on re-check, staging was retried, and commit flow resumed normally.
- status: resolved

- time: 2026-05-13 14:22 KST
- location: `git add && git commit && git push`
- summary: a chained git command failed because this PowerShell session does not support `&&` separators.
- details: the dark-mode-toggle cleanup itself was unaffected. The git steps were rerun as separate commands and completed normally afterward.
- status: resolved

- time: 2026-05-13 14:28 KST
- location: `npm run build`
- summary: the initial build verification was blocked by PowerShell execution policy on `npm.ps1`.
- details: the command failed before invoking the repo build. The check was rerun successfully with `npm.cmd run build` and completed normally.
- status: resolved

- time: 2026-05-13 22:27 KST
- location: `npm test -- src/components/Header.test.tsx`
- summary: PowerShell blocked the initial targeted test run on `npm.ps1`.
- details: the test command failed before invoking Vitest because script execution is disabled for `npm.ps1` in this shell. The same test passed when rerun with `npm.cmd`.
- status: resolved
## 2026-05-13 22:28:32
- location: `C:\Users\roadsea\Desktop\calendar`
- summary: verification blocked once by PowerShell execution policy, then completed via `cmd /c`
- details: `npm.ps1` could not be loaded because script execution is disabled on the first `npm test` attempt; the targeted Vitest run was retried through `cmd /c` and `src/components/IChingSection.test.tsx` passed after the layout class updates and expectation adjustments.
- status: resolved
## 2026-05-15
- time: 2026-05-15T00:00:00+09:00
- location: build verification
- summary: `npm run build` failed under PowerShell execution policy.
- details: `npm.ps1` could not be loaded because script execution is disabled in this shell. Will retry with `npm.cmd` to complete verification.
- status: resolved

- time: 2026-05-16 21:??
  location: npm.ps1 verification
  summary: PowerShell execution policy blocked npm.ps1 during build/test verification
  details: Initial build/test commands failed before execution because the shell resolved npm to npm.ps1, which is disabled under the current policy. Will rerun via npm.cmd.
  status: open

- time: 2026-05-16 21:12:38 +09:00
  location: npm.ps1 verification
  summary: PowerShell execution policy blocked npm.ps1 during build/test verification
  details: Initial build/test commands failed before execution because the shell resolved npm to npm.ps1, which is disabled under the current policy. Will rerun via npm.cmd.
  status: open

- time: 2026-05-16 21:13:02 +09:00
  location: npm.cmd run build
  summary: Build failed in unrelated UI file during verification
  details: TypeScript stopped in src/components/IChingSection.tsx with missing getGuaCommentary/getYaoCommentary names and an arity mismatch on getSelectedCommentaryText. This blocks full build verification but is outside the worker_data write set.
  status: open

- time: 2026-05-16 21:13 +09:00
  location: PowerShell `npm run build`
  summary: PowerShell blocked npm.ps1 during build verification
  details: The first build attempt failed before execution because this shell resolved npm to npm.ps1, which is blocked by the local execution policy. The build will be retried via npm.cmd.
  status: open

- time: 2026-05-16 21:14 +09:00
  location: PowerShell `npm run build` / `npm test`
  summary: Build and targeted test verification succeeded after rerunning through npm.cmd
  details: The PowerShell execution-policy block was bypassed by using `npm.cmd`; `npm.cmd run build` and `npm.cmd test -- --run src/components/IChingSection.test.tsx` both passed.
  status: resolved

- time: 2026-05-16 21:21:24 +09:00
  location: verification follow-up
  summary: Previously blocked verification paths are now resolved
  details: Re-ran build with npm.cmd and the project built successfully. The earlier npm.ps1 policy issue was bypassed, and no code changes were needed for the build path.
  status: resolved

- time: 2026-05-16 22:10 +09:00
  location: PowerShell git publish command
  summary: Combined git stage/commit/push command failed before execution
  details: PowerShell in this environment does not accept `&&` as a statement separator, so the combined publish command aborted with a parser error. Re-ran the git steps as separate commands.
  status: resolved

- time: 2026-05-16 22:23 +09:00
  location: PowerShell git publish command
  summary: Combined git stage/commit/push command failed before execution
  details: PowerShell again rejected `&&` as a statement separator while publishing the bonus-day mapping update. No repository state was lost; the git steps were rerun as separate commands.
  status: resolved

- time: 2026-05-20 00:00 KST
  location: `npm.cmd test -- --runInBand src/components/Header.test.tsx src/components/DatePicker.test.tsx src/components/JournalModal.test.tsx src/components/IChingSection.test.tsx src/components/SoulCalendarSection.test.tsx`
  summary: Vitest rejected the `--runInBand` flag
  details: The targeted component-test command failed before execution because this Vitest version does not support `--runInBand`. Verification will be rerun with the supported `vitest run` form.
  status: open

- time: 2026-05-20 00:00 KST
  location: `npm.cmd exec vitest run src/components/Header.test.tsx src/components/DatePicker.test.tsx src/components/JournalModal.test.tsx src/components/IChingSection.test.tsx src/components/SoulCalendarSection.test.tsx`
  summary: Vitest verification reran successfully with the supported command form
  details: Re-ran the targeted component tests with `vitest run` after the unsupported flag failure, and all selected tests passed.
  status: resolved
- time: 2026-05-21 00:05 KST
  location: `npm.cmd run lint` / `npm.cmd test` / `npm.cmd run build`
  summary: Repository verification is blocked by pre-existing feature-file errors outside the allowed shared slice
  details: ESLint still reports `src/components/DatePicker.tsx` and `src/components/IChingSection.tsx`; Vitest and the build fail because `formatWeeksLabel` is not exported from `src/components/SoulCalendarSection.tsx`. Those files are outside the requested edit scope, so the shared contracts/helpers slice cannot make the repo green on its own.
  status: open

- time: 2026-05-21
  location: src/hooks/useCalendarLogic.test.ts, src/components/IChingSection.test.tsx
  summary: leaf-loader test fixtures were still mocking the old barrel path
  details: After switching JournalModal and the shared reading hook to direct leaf imports, the tests no longer saw the expected commentary fixture data. Updated both tests to mock `../utils/readingDataLoader` directly and restored the leaf-load expectations.
  status: resolved

- time: 2026-05-21 17:39 KST
  location: `src/components/IChingSection.tsx`
  summary: build failed on a nullable commentary heading reference after the leaf-loader cleanup
  details: `tsc -b` rejected the direct `commentary.heading` read because `commentary` can be null in the render path. Tightened the heading access to a local nullable value, then reran lint, targeted tests, and build successfully.
  status: resolved
- time: 2026-05-21 18:05 KST
  location: Route B / design-system component adoption
  summary: implementation blocked because no worker delegation tool is exposed in the current session
  details: STATE.md has been re-scoped and the component-adoption contract is frozen, but the session cannot spawn the required worker/reviewer lane to edit the seven target component files without violating Route B constraints.
  status: open
- time: 2026-05-22 10:41 KST
  location: shell command during UX clarity pass
  summary: PowerShell rejected the `&&` separator in a staging and commit command
  details: attempted to chain `git add` and `git commit` with `&&`; this shell requires semicolon-separated commands or separate calls
  status: resolved
- time: 2026-05-22 11:05 KST
  location: src/components/JournalModal.tsx
  summary: malformed closing span broke lint during the mobile modal spacing pass
  details: the save button label was left with a missing '<' in the closing span after the text-density refactor; fixed immediately and re-ran lint/test/build.
  status: resolved
- time: 2026-05-22 11:27 KST
  location: shell command during P2 commit step
  summary: PowerShell rejected `&&` while chaining git staging and commit
  details: attempted to combine `git add` and `git commit` with `&&`; this shell needs separate calls or semicolon-separated commands, so the commit step was retried as split commands.
  status: resolved
