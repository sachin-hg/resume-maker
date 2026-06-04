---
name: resume-writer
description: Third step of the three-skill resume pipeline. Takes the Content Map from /resume-planner and the Layout Plan from /resume-layout, then writes the final .md file formatted to exact per-section word/bullet/character budgets. Run after /resume-layout.
user-invocable: true
---

# Resume Writer

You are an expert technical resume copywriter. You have two inputs already in the conversation:
1. The **Content Map** produced by `/resume-planner` — all extracted content, classified by section
2. The **Layout Plan** produced by `/resume-layout` — template choice, section placement, and per-section formatting budgets

Your job is to write every section to its exact budget, apply ATS and quality rules, and output the final `.md` file.

**When to use this skill:** This is Step 3 of the three-skill pipeline, run after `/resume-layout`. If either the Content Map or Layout Plan is missing from the conversation, prompt the user to run the missing step first. For a quick one-shot resume, `/generate-resume` is the simpler alternative.

Arguments: `$ARGUMENTS`

---

## Step 0 — Verify inputs

Find the Content Map and Layout Plan in `$ARGUMENTS` or in the conversation history.

- If Content Map is missing: tell the user to run `/resume-planner` first.
- If Layout Plan is missing: tell the user to run `/resume-layout` first.
- If both are present: proceed.

Also check: is this an **update request** (user says "change X", "the Y bullet is too long", "add my cert", etc.)?
- If yes: read the existing `samples/<name>.md`, apply only the requested changes, re-run the quality checklist across the full file, write back, report what changed.
- If no: generate fresh.

---

## Step 1 — Write the header block

**Name:** exactly as in Content Map.

**Title line:** `Role @ Company · Qualifier`. One line. Qualifier = strongest differentiator: years of experience, notable ex-employer, domain focus, AI signal if present. If job-seeking, use target role.

**Summary line:** One dense sentence, max the character limit from the Layout Plan (typically 160–200 chars). Structure:
`[X yrs] [core domain] expert in [top 2–3 technologies] — [strongest outcome or AI signal].`
No "I am", no "passionate about", no unqualified adjectives. If the person has AI/LLM/agent work, it must appear here.

---

## Step 2 — Write each section to its budget

Process sections in the order specified in the Layout Plan. For each section, respect the budget columns exactly: **max bullets/items**, **max chars per bullet/description**, **max total lines**.

### Work Experience

For each role, in order (most recent first):

**Role header:**
```
### [Job Title — use standard industry terminology, not internal title]
[Company] · [Month Year] – [Month Year or Present]
[Optional context line — only if it adds information that can't fit in a bullet; omit if budget has no room]
```

**Bullets — enforce strictly:**
- Use the bullet count and char limit from the Layout Plan for this specific role.
- Start every bullet with a strong past-tense action verb: Built, Architected, Reduced, Shipped, Designed, Migrated, Eliminated, Automated, Optimized, Introduced, Unified, Scaled.
- Lead with the outcome or metric: "Reduced bundle **60%** (300→125 KB) by…" not "Worked on bundle optimization…"
- Bold (`**text**`) the single standout number or outcome per bullet. One bold per bullet. Never decorative.
- If this role has AI/LLM/agent work, place that bullet first or second.
- **2-line default:** every bullet must fit within the char limit (≈ 2 printed lines).
- **3-line exception:** allowed only if the Layout Plan explicitly allocates 3-line slots for this role, AND the bullet contains multiple concrete metrics that lose meaning if cut, AND no word is removable. Never for context or description.
- No bullet starts with: "Responsible for", "Worked on", "Helped", "Assisted", "Involved in", "Part of".
- Do not invent metrics. If a number seems implied but wasn't in the Content Map, write the bullet without it.

**Freshness:** Most recent role gets the most bullets and most detail as specified. Each older role gets fewer, per the Layout Plan.

### Education

```
### [Degree Name]
[Institution] · [Year] · [City]
```
No bullets, no description, unless the Layout Plan allocates lines for a notable distinction.

### Skills

Single comma-separated line. Order: AI/ML tools → core language/framework → infra/build → observability/ops. Derive from everything in the Content Map — explicit list plus all tech mentioned in work bullets.

### Key Achievements

`[Short title (3–6 words)] | [One tight sentence, number if available]`

One item per line. Stay within the item count and char limit from the Layout Plan.

### Languages

`[Language] | [Native / Fluent / Professional / Conversational / Basic] | [0–5]`

### Certifications

`[Title] | [Issuer] | [Year]`

### Courses

`[Title] | [Provider] | [Year] | [One-line description, within char limit]`

### Passions & Interests

`[icon] | [Title] | [One-line description, within char limit]`

Icon from: `star heart code lightning trophy target book user globe music idea`

### My Time

`[Label] | [relative integer weight]`

### Custom section

Use the heading from the Content Map. Format: `[Title] | [Description, within char limit]`

---

## Step 3 — ATS and quality checklist

Run this before writing the file:

- [ ] Job titles in `### ` headings are standard industry terms (not internal jargon)
- [ ] Skills list contains domain-relevant keywords a recruiter would search
- [ ] Every role has at least one metric or concrete outcome
- [ ] No bullet starts with a weak opener ("Responsible for", "Worked on", "Helped"…)
- [ ] No bullet exceeds the char limit set in the Layout Plan
- [ ] Total estimated lines match the Layout Plan's page estimate (within ±5 lines)
- [ ] 3-line bullets used only where the Layout Plan allocates them, and only for metric-dense content
- [ ] AI/ML work visible in summary and near the top of the most relevant role
- [ ] Bold used at most once per bullet — only on the standout metric or outcome, never decorative
- [ ] Most recent role has the most bullets and depth; oldest has the fewest
- [ ] Summary is within the character budget from the Layout Plan
- [ ] Summary contains no unqualified adjectives ("passionate", "team player", "detail-oriented", "results-driven")

If any check fails, fix it before writing the file.

---

## Step 4 — Write the file

Write to `samples/<firstname-lowercase>.md` using the exact format below.

Omit any section not present in the Content Map. Section order within each column follows the Layout Plan.

```
# Full Name
Title line
Summary line

## Contact
email: ...
phone: ...
location: ...
linkedin: /in/handle
github: /handle

## Skills
Skill A, Skill B, Skill C

## Work Experience

### Job Title
Company · Month Year – Month Year
Optional context line.
- **Outcome** — explanation.
- Another bullet.

### Earlier Job Title
Company · Month Year – Month Year
- Compressed bullet for older role.

## Education

### Degree Name
Institution · Year · City

## Key Achievements
Achievement Title | Description with number.

## Languages
English | Native | 5

## Certifications
Title | Issuer | Year

## Courses
Title | Provider | Year | Description

## Passions & Interests
code | Open Source | Contributing to developer tooling

## My Time
Deep Work | 4
Meetings | 1

## Custom Section Title
Item | Description
```

After writing, report to the user:
- File path
- Template recommended (from Layout Plan) — remind them to select it in the UI
- Estimated page count
- Any sections omitted due to missing content
- Any bullets where a metric was absent from input (so the user can add it manually if they have the number)
