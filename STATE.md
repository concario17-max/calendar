# Current Task
- Active: produce a repo-wide modernization plan that raises visual polish, UX clarity, code quality, performance, and accessibility without changing features yet.

# Route
- Route A
- Reason: this is a planning/documentation task only, scoped to `STATE.md` and `plan.md`, with no feature code changes, shared assets, or cross-directory edits required.

# Writer Slot
- main: write-capable lane for `STATE.md` and `plan.md`

# Contract Freeze
- Goal: create a structured improvement plan for the whole site, covering design, UI/UX, code quality, performance, and accessibility, with priorities, risks, file targets, and verification notes.
- Non-goals:
  - do not change runtime code yet
  - do not add new libraries
  - do not touch unrelated in-progress feature work
  - do not do browser verification
- Write sets:
  - main: `STATE.md`
  - main: `plan.md`
- Acceptance criteria:
  - `plan.md` exists and is written in a clean, actionable structure
  - priorities are split into `P0`, `P1`, and `P2`
  - each item includes expected files, risk, and verification method
  - the plan reflects the current codebase structure and constraints
- Why the write split is safe:
  - no source code behavior changes are needed for a planning pass
  - the scope is limited to documentation/state tracking

# Reviewer
- reviewer: not required for this Route A planning task

# Last Update
- 2026-05-20: reclassified the work as a repository-wide modernization planning task.
