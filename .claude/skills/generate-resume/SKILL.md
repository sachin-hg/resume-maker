---
name: generate-resume
description: Orchestrates the full resume creation pipeline — Plan → Layout → Write — and produces a .md file that loads correctly into this resume maker. Internally invokes /resume-planner, /resume-layout, and /resume-writer in sequence with user checkpoints between phases. Use this for a complete, guided resume creation experience. For granular control over individual phases, invoke the sub-skills directly.
user-invocable: true
---

# Generate Resume (Orchestrator)

You run the three-skill resume pipeline in sequence. Each phase is handled by a dedicated skill — you do not duplicate their logic. Your job is to sequence them, surface their outputs to the user, and give checkpoints to redirect before committing to the next phase.

**The pipeline:**
1. **Plan** — invoke `resume-planner`: extract content, classify into sections, identify gaps
2. **Layout** — invoke `resume-layout`: select template, assign sections to columns, set formatting budgets
3. **Write** — invoke `resume-writer`: write every section to spec and output the `.md` file

Arguments: `$ARGUMENTS`

---

## Before you start — is this an update or a fresh resume?

Check whether a `samples/<name>.md` file already exists in the project and whether the user's message is a change request ("change the summary", "add my AWS cert", "the Directi bullet is too long").

**If this is an update:** Skip Phases 1 and 2. Use the Skill tool to invoke `resume-writer` directly, passing the update request. Resume-writer handles patching.

**If this is a fresh resume:** Run Phases 1 → 2 → 3 in order.

---

## Phase 1 — Plan

Use the Skill tool to invoke the `resume-planner` skill. All user input from `$ARGUMENTS` and the conversation is available to it.

After the Content Map is produced:
1. Show the full Content Map to the user.
2. Say: *"Does this look right? Anything to add, correct, or remove before I decide on the layout?"*
3. Wait. If the user requests changes, apply them to the Content Map and show the revised version.
4. When the user says to proceed (or if the Content Map already looks complete and they haven't pushed back), move to Phase 2.

---

## Phase 2 — Layout

Use the Skill tool to invoke the `resume-layout` skill. The Content Map from Phase 1 is in the conversation.

After the Layout Plan is produced:
1. Show the full Layout Plan to the user — especially the template recommendation and per-section budgets.
2. Say: *"Happy with this layout? You can ask me to change the template, move sections, or adjust space budgets before I write the file."*
3. Wait. Apply any adjustments, show the revised plan.
4. When the user says to proceed, move to Phase 3.

---

## Phase 3 — Write

Use the Skill tool to invoke the `resume-writer` skill. Both the Content Map and Layout Plan are in the conversation.

After the file is written, report to the user:
- File path (`samples/<name>.md`)
- Template to select in the app UI (from the Layout Plan) — **remind them to select it manually in the browser**
- Estimated page count
- Any sections omitted (no content provided)
- Any work bullets where a metric was missing from the input (so the user can add numbers manually if they have them)

---

## North star

Every decision across all three phases serves these goals:

- **ATS-first:** Section headings, job titles, and skills are the primary ATS targets. Job titles must be standard industry terms. Skills must be keyword-dense and in the right order.
- **Outcome-driven:** Every work bullet should include a metric or concrete result. "Improved performance" is weak. "Reduced load time 40% (5.5s → 3.3s)" is a hire signal.
- **Right-sized:** 1–1.5 pages. The Layout Plan enforces this with per-section budgets. The writer enforces it per bullet.
- **AI-forward:** If the person has any LLM/agent/RAG/ML work, it surfaces in the summary line, first or second bullet of the relevant role, and first in the skills list. This is the most valued signal in the current market.
- **Honest:** No invented metrics, no inflated titles. The person must walk into an interview and be exactly who the resume describes.
