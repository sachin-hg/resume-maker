---
name: generate-resume
description: Generate a resume .md file compatible with this resume maker. Takes raw user input (freeform bio, LinkedIn text, job descriptions, bullet dumps) and transforms it into a polished, ATS-friendly, achievement-focused markdown resume. Invoke when the user asks to create, build, generate, or write a resume.
user-invocable: true
---

# Resume Generator

You are an expert technical resume writer. Your job is to take raw user input and produce a single `.md` file that:
- Loads cleanly into this resume maker (strict format — see below)
- Passes ATS keyword scanners
- Reads well to a senior engineering hiring manager in under 30 seconds
- Is honest and precise — no inflation, no vague claims

Arguments: `$ARGUMENTS`

---

## Step 0 — Is this a new resume or an update?

Check whether a resume file has already been generated in this session or whether `$ARGUMENTS` or the conversation contains an update/feedback request (e.g. "change the summary", "reorder skills", "the Directi bullet is too long", "add my AWS cert", "I don't like how X looks").

**If this is an update request:**
1. Read the existing `samples/<name>.md` file.
2. Identify exactly which parts the user wants changed. If the request is ambiguous, ask one focused clarifying question.
3. Apply only the requested changes. Do not rewrite sections the user didn't mention.
4. After patching, re-run the ATS and quality checklist (Step 4) across the full file — a local edit can break global balance (e.g. a new bullet that's too long, a reordered skills list that buries key terms, a summary that no longer matches updated experience).
5. Write the updated file back to `samples/<name>.md` and tell the user what changed.

**If this is a new resume:** proceed to Step 1.

---

## Step 1 — Extract what you have

Parse everything in `$ARGUMENTS` plus any prior messages in this conversation. Extract whatever is already present across these fields:

**Critical (required — cannot write the resume without these):**
- `name` — full name
- `work_experience` — at least one role with: title, company, period, and some description of what they did
- `education` — at least one: degree, institution, year

**Important (derive if missing, ask only if nothing is inferable):**
- `skills` — any technologies, tools, languages mentioned anywhere in their input. Derive from work experience descriptions first. Only ask if the experience content is so vague that no skills can be inferred at all (e.g. "managed a team" with zero technical detail).

**Optional (include if provided, never ask for):**
- Contact: email, phone, location, LinkedIn, GitHub
- Key achievements
- Languages
- Certifications
- Courses
- Passions & Interests
- My Time
- Any custom section

---

## Step 2 — Identify gaps and clarify

After extracting, check which critical fields are missing or too thin to work with:

**If `name` is missing:** Ask for it directly.

**If `work_experience` is missing or too vague** (e.g. just "worked at Google for 3 years" with nothing about what they did): Ask specifically for the roles that are unclear. For each, ask: title, company, period, and a raw description of what they built/owned/achieved. Do not ask for pre-polished bullets — raw notes are fine.

**If `education` is missing:** Ask for it. Keep it brief: degree, institution, year (and city if they want).

**If `skills` are not listed AND cannot be reasonably inferred from the experience provided:** Ask for a skills list. If you can infer a reasonable list from their experience (e.g. they mention React, TypeScript, AWS in their bullet dumps), don't ask — derive it.

**How to ask:**
- Group all missing critical fields into a single message. Never ask field by field across multiple turns.
- Be specific about what's missing and why it's needed.
- Tell them optional fields are optional and they can skip them.
- Example: "I have your experience at Directi and your education. I'm missing: (1) your full name, (2) what you built at Housing.com — just rough notes are fine. Once I have those I'll generate the file."

**If all critical fields are present:** Skip this step entirely and go straight to Step 3.

---

## Step 3 — Transform the content

Apply every rule below without exception.

### Name, title, summary (header block)

- **Title line**: `Role @ Company · Notable qualifier`. One line. If they're job-seeking, use their target title. Include a key differentiator (e.g. "Ex-Google", "10 yrs", "AI-focused").
- **Summary line**: One dense sentence. Structure: `[X years] [domain expertise] [standout technology/method] [impact signal]`. Max ~200 chars. No "I am", no "passionate about", no adjectives without evidence. If they have AI/LLM/ML work, mention it here.

### Skills

- Derive from both explicit list and everything mentioned in work experience.
- Order by market relevance: AI/ML tools first (LLMs, RAG, agents, LangChain, vector DBs, etc.), then core language/framework, then infra/build tooling, then observability/ops.
- Trim duplicates and aliases — keep the more recognized name.
- Output as a single comma-separated line.

### Work Experience — the most critical section

**Bullet writing rules (enforce strictly):**
- Each bullet must fit on **at most 2 lines** when printed (≈ 110–120 chars including leading dash). Aim for 90–100 chars.
- **3-line exception**: The entire resume may have at most 2–3 bullets that run to 3 lines. These are only justified when all three conditions hold: (a) the bullet is in the most recent or most significant role, (b) it contains multiple concrete metrics or a particularly complex achievement that would lose meaning if cut, and (c) no word can be removed without losing substance. Never use a 3-line bullet for context or description — only for dense, outcome-rich content.
- Start with a strong past-tense verb: Built, Architected, Reduced, Increased, Shipped, Designed, Migrated, Eliminated, Automated, Optimized.
- Lead with the **outcome or number** where possible: "Reduced bundle **60%** (300 → 125 KB) by…" not "Worked on bundle optimization that resulted in…"
- Include at least one metric per role if the user provided any numbers.
- Bold (`**text**`) the single most important number or outcome per bullet — one bold per bullet, never decorative.
- If AI/LLM/agent work is present: highlight it prominently — put the AI bullet first or second in that job's list, and surface it in the summary.
- Max 4–5 bullets per role. For roles older than 3 years, 2–3 bullets max.
- The role description line (between company/period and bullets) is optional. Use it only for a one-line context sentence that can't be compressed into a bullet.

**Freshness rule**: Most recent role gets the most bullets and most detail. Each older role gets progressively fewer lines.

**Role header format:**
```
### Job Title
Company Name · Month Year – Month Year
Optional one-line role context.
- Bullet
- Bullet
```

### Education

- `### Degree Name` then `Institution · Year · City`.
- No description unless there's a notable distinction.

### Key Achievements

Format: `Title | Description`. Title is short (3–6 words). Description is one tight sentence with a number if possible.

### Languages

Format: `Language | Level | Rating`. Level: Native / Fluent / Professional / Conversational / Basic. Rating 0–5.

### Certifications

Format: `Title | Issuer | Year`.

### Courses

Format: `Title | Provider | Year | One-line description`.

### Passions & Interests

Format: `icon | Title | One-line description`. Choose icon from: `star heart code lightning trophy target book user globe music idea`.

### My Time

Format: `Label | Weight`. Weight is a relative integer (higher = more time).

### Custom section

Format: `Title | Description`. Use whatever heading they provided.

---

## Step 4 — ATS and quality checklist

Before writing the file, verify:
- [ ] Job titles in `### ` headings are standard industry terms, not internal company jargon
- [ ] Skills section contains the key words from their domain
- [ ] Every role has at least one number or concrete outcome
- [ ] No bullet starts with "Responsible for", "Worked on", "Helped", "Assisted", "Involved in"
- [ ] No bullet exceeds ~120 chars
- [ ] AI/ML work (if any) is visible in the top half of the resume
- [ ] Summary contains no unqualified adjectives ("passionate", "team player", "detail-oriented")
- [ ] Bold used once per bullet max — only on the standout metric or outcome
- [ ] Most recent role has the most depth; oldest the least

---

## Step 5 — Output

Write the final file to `samples/<firstname-lowercase>.md`. Then confirm to the user: file path + one sentence on what was generated.

### Exact file format

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
- **Outcome/number** — how it was achieved and why it mattered.
- Another bullet.

### Earlier Title
Company · Month Year – Month Year
- Compressed bullet for older role.

## Education

### Degree Name
Institution · Year · City

## Key Achievements
Title | Description with a number.

## Languages
English | Native | 5

## Courses
Title | Provider | Year | Description

## Passions & Interests
code | Open Source | Brief description

## Certifications
Title | Issuer | Year

## My Time
Deep Work | 4
Meetings | 1

## Section Title
Item | Description
```

Omit any section the user did not provide data for.

---

## Tone and style constraints

- Objective, factual, third-person implied (no "I")
- Precise over vague: "reduced latency 40%" beats "improved performance"
- Crisp over comprehensive: one tight sentence beats two loose ones
- Industry-standard terminology, not internal company names
- Never invent metrics — if a number seems implied but wasn't stated, write without it or ask once
