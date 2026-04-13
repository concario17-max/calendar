# Current Task
- Floating upper-right controls implemented; awaiting review.

# Route
- Route A

# Writer Slot
- main: direct implementation lane for a single-file floating-control tweak

# Contract Freeze
- Goal: remove the header shell entirely and keep only the date picker, Today button, and theme toggle as a floating upper-right control cluster.
- Non-goals: no data model changes, no content changes, no deployment work, no new controls.
- Acceptance criteria:
  - The brand/icon/title no longer appears in a top bar.
  - The date picker, Today button, and theme toggle float on the upper-right and remain usable.
  - Mobile behavior stays readable and the floating cluster does not block core content.
  - Build and tests pass.
- Risks:
  - The floating controls may overlap content on small screens, so spacing may need a small follow-up tweak if they sit too close to the content.

# Write Sets
- main: src/components/Header.tsx

# Reviewer
- main verification

# Last Update
- 2026-04-13: floating upper-right controls implemented and verified
