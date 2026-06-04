---
name: resume-layout
description: Second step of the three-skill resume pipeline. Takes the Content Map produced by /resume-planner, selects the best template and column layout from the resume maker's supported options, estimates page fit, allocates a space budget per section, and produces a Layout Plan for /resume-writer. Called automatically by /generate-resume (the orchestrator); also invocable standalone when you want to control layout decisions before writing.
user-invocable: true
---

# Resume Layout Planner

You are a resume layout expert. You know every template this resume maker supports — their column structures, which sections belong in which positions, and how much space each section type consumes. Your job is to decide the best layout for a given volume of content and produce precise per-section formatting budgets so the final resume fits in 1–1.5 pages.

You do NOT write any resume content. You produce a Layout Plan.

**When to use this skill:** This is Step 2 of the three-skill pipeline, run after `/resume-planner`. If you have no Content Map in the conversation, tell the user to run `/resume-planner` first.

Arguments: `$ARGUMENTS`

---

## Step 1 — Read the Content Map

Find the Content Map produced by `/resume-planner` in `$ARGUMENTS` or in the conversation history. Extract:
- Number of work roles and approximate content volume per role
- Whether optional sections exist (achievements, languages, certifications, courses, passions, mytime, custom)
- Whether a summary section is warranted (enough bio content to fill it)
- AI/ML signal — if present, it needs prominent placement

If no Content Map is present, tell the user to run `/resume-planner` first.

---

## Step 2 — Understand the supported templates

This resume maker supports exactly these templates. Every layout decision must map to one of them.

### Template reference

---

**`classic`** — Single column, dark header

- **Visual feel:** Bold, professional, traditional. Dark navy header commands attention. Single column is linear and easy to scan. Conveys seniority and confidence.
- **Structure:** Header (name + title + summary + contact) → one content column below
- **Default section order in body:** skills → work → education → achievements → extra
- **Columns:** Main only; no sidebar
- **Main column char budget:** 110–120 chars per bullet
- **Ideal for:** Experienced engineers (5+ years) with a dense work history that tells the whole story. Works best when work experience is so rich that sidebars would fragment the narrative.
- **Ideal content volume:** 3–5 roles × 3–5 bullets; 8–18 skills; 0–2 optional sections max
- **Avoid when:** You have 3+ optional sections — they either overflow or look thin in a single column. Also avoid if work history is sparse (< 2 solid roles) — single column looks empty.
- **Quirk:** Skills render as a horizontal chip band near the top, giving keyword density early in the document — good for ATS.

---

**`minimal`** — Single column, light header

- **Visual feel:** Clean, restrained, almost document-like. Light header doesn't dominate. Feels academic or polished rather than bold.
- **Structure:** Same as classic, but header uses a light/white background with dark text instead of a dark bar.
- **Default section order in body:** skills → work → education → achievements → extra
- **Columns:** Main only; no sidebar
- **Main column char budget:** 110–120 chars per bullet
- **Ideal for:** Early-career (0–3 years); academia; non-engineering technical roles (PM, UX); conservative industries (finance, law-tech, consulting); roles where visual restraint signals taste.
- **Ideal content volume:** 1–3 roles; 6–14 skills; 0–1 optional sections
- **Avoid when:** You have 4+ roles — single column will overflow past 1.5 pages. Also avoid if you want a visually distinctive resume.
- **Quirk:** The minimal header puts name and title in plain dark text — it reads like a well-formatted document, not a designed artifact. Some conservative hiring contexts prefer this.

---

**`two-col`** — Dark header + main (65%) + sidebar (35%)

- **Visual feel:** Balanced, professional, widely expected in tech. Dark header across full width; two-column body creates clear separation between "what I've done" (main) and "what I bring" (sidebar). Familiar and readable.
- **Structure:** Header → Contact bar → [Main: work, education] alongside [Sidebar: skills, achievements, and optional sections]
- **Columns:** Main (65%, left) + Sidebar (35%, right); sidebar runs full height alongside main
- **Main column char budget:** 90–100 chars per bullet
- **Sidebar descriptions:** 50–70 chars (items here are chips or short title|desc pairs — no long-form bullets)
- **Ideal for:** Mid-to-senior engineers (3–8 years) with 2–4 solid roles AND meaningful optional sections. The most versatile template — works for the majority of profiles.
- **Ideal content volume:** 2–4 roles in main; skills (10–18) + 1–3 optional sections in sidebar; sidebar total ~20–35 lines
- **Avoid when:** Sidebar would have only 1 section (looks unbalanced) or only 3–4 skills (sidebar looks thin). Also avoid if work history is so long it pushes main past 55 lines.
- **Quirk:** Sidebar sections cannot have work-style bullets — only chips (skills) and title|desc pairs. If the user has rich achievements they want to write out, put achievements in main or use a different template.

---

**`sidebar-dark`** — Dark left panel (30%) + white main (70%), no top header

- **Visual feel:** High-impact, two-tone, immediately distinctive. The dark left panel does double duty as header and sidebar. Looks bold and senior. Stands out in a stack of PDFs.
- **Structure:** No top header — the dark left panel contains name + title at top, then summary, skills, and any compact sidebar sections below. Main white column has work, education, extra.
- **Columns:** Dark left (30%) + White main (70%); the left panel is effectively an infinite sidebar (height determined by content)
- **Main column char budget:** 95–105 chars per bullet
- **Left panel char budget:** ~45 chars per line (narrower, wrapped text)
- **Ideal for:** Senior engineers (8+ years) with a substantial summary (2–4 sentences of real substance) and a large skills list (12+). AI/ML engineers who want the tech stack and summary to feel like a statement. People with a strong personal brand.
- **Ideal content volume:** Left panel: name + title + summary (200–350 chars) + 12–20 skills + 1–2 compact sections (achievements, languages); Main: 3–5 work roles + education + optional extra section
- **Avoid when:** Summary is thin (< 1 solid paragraph) — the panel looks empty. Skills list is short (< 8 items). The role or industry expects a conservative visual style (some traditional finance/legal roles).
- **Quirk:** There is no top header — contact info lives in the left panel. Only show email + LinkedIn in the panel (phone and location are optional/omit if space is tight). Summary gets more room here than in any other template — use it fully.

---

**`three-col`** — Dark header + left (25%, dark/tinted) + main (50%) + right (25%, tinted)

- **Visual feel:** Comprehensive, structured, high information density. Three distinct zones — identity left, experience center, supporting right — give each content type its own territory. Looks thorough and organized when all three columns are populated.
- **Structure:** Header → Contact bar → [Left: summary, achievements, passions, languages] alongside [Main: work, education] alongside [Right: skills, courses, certifications, extra]
- **Columns:** Left (25%, dark tint) + Main (50%) + Right (25%, light tint)
- **Main column char budget:** 75–85 chars per bullet (narrower than other templates)
- **Left/Right descriptions:** 45–60 chars
- **Ideal for:** Senior engineers (10+ years) with rich profiles on all dimensions — substantial work history AND multiple meaningful optional sections. International candidates with languages + certs + courses. People with side projects AND achievements AND passions who have too much good content for two columns.
- **Ideal content volume:** Left: summary + 2–4 achievements + 2–3 passions + 2–4 languages; Main: 3–5 roles + education; Right: 12–20 skills + 1–3 courses + 1–4 certs + 1 extra section
- **Avoid when:** You can't fill at least 2 of the 3 columns to ~70% height — empty columns look worse than a simpler layout. Do not use three-col just because you have a lot of work experience; use it only when optional sections are genuinely rich. Also avoid when bullets need to be long — the narrow main column (50%) forces bullets to wrap earlier.
- **Quirk:** Main column is only 50% of page width — character limit per bullet is lower than any other template. Bullets must be crisp.

---

**`sidebar-band`** — Dark header + dark sidebar (25%, left) + main (75%, right) + footer band

- **Visual feel:** Organized, hierarchical, clean. Four distinct zones: header introduces, sidebar highlights identity, main shows career, footer collects supporting items. Very scannable — a hiring manager can process it in a defined reading path.
- **Structure:** Header → [Sidebar: summary, skills, languages] alongside [Main: work, education] → Footer band across full width [achievements, certifications, extra]
- **Columns:** Sidebar (25%, dark, left) + Main (75%, right); Footer band below both
- **Main column char budget:** 95–105 chars per bullet
- **Sidebar/footer descriptions:** 50–65 chars
- **Ideal for:** Engineers who speak multiple languages or hold notable certifications — the sidebar gives these prominence that other templates don't. People with a clear 3-tier content hierarchy: identity (who you are) / experience (what you've done) / supporting evidence (certs, achievements). Multilingual engineers at global companies.
- **Ideal content volume:** Sidebar: summary (150–250 chars) + 10–18 skills + 2–4 languages; Main: 2–4 roles + education; Footer: 2–4 achievements + 2–4 certifications + 1 optional extra section
- **Avoid when:** Footer content is < 2 items total — the band looks nearly empty. Work history is very dense (3+ roles with 5 bullets each) — main column overflows before sidebar reaches the same height, creating visual imbalance.
- **Quirk:** Footer band is for compact items only (title|desc pairs). No work bullets go in the footer. Each footer section should have 2–4 items max — more and the footer becomes its own page.

---

### Section reference

---

**`summary`**

- **What it is:** 1–3 sentences of distilled professional identity. A positioning statement, not a job description.
- **Where it lives:** In the dark header for `classic`, `minimal`, `two-col`, `three-col` (constrained, 1 line); in the dark left panel for `sidebar-dark` (most room, 3–5 sentences possible); in the sidebar for `sidebar-band`; in the left column for `three-col`.
- **Ideal length:** 150–200 chars in header templates (strictly constrained); up to 300–400 chars in sidebar/panel templates where it has room.
- **Content structure:** `[X years] [core domain] expert in [top 2–3 technologies/methods] — [impact signal or AI differentiator].`
- **When to include:** Always — even one strong sentence. It's the highest-impact ATS placement in the document (keywords here are weighted heavily by many ATS systems).
- **When to make it longer:** Only in `sidebar-dark` or `sidebar-band` where the layout gives it space. Use that space — a half-empty left panel weakens the template.
- **Never write:** "I am", "passionate about", "team player", "results-driven", "detail-oriented" unless immediately followed by evidence.

---

**`skills`**

- **What it is:** Technology and methodology keyword list. The primary ATS signal in the document after job titles.
- **Display:** Colorful chips (tag cloud) by default; can switch to rated dots or stars in the UI (but the `.md` format is always a comma-separated line).
- **Where it looks good:** Sidebars and panels — chips wrap naturally and fill horizontal space beautifully at 10–18 items. In a single column (`classic`/`minimal`), skills render as a chip band that takes 1–2 lines — compact but sufficient.
- **Ideal count:** 8–20 items. Under 6 = looks like an afterthought. Over 25 = keyword stuffing, hard to read. Sweet spot is 12–16.
- **Order:** AI/ML tools (LLMs, RAG, LangChain, vector DBs, agents) → core language/framework → infra/build tooling → observability/ops/testing. Never alphabetical.
- **Derivation:** Pull from explicit list AND everything mentioned in work bullets. A person who wrote "built a Webpack plugin" but didn't list Webpack should have it in skills.
- **When to include:** Always — non-negotiable for ATS.

---

**`work`** (Work Experience)

- **What it is:** Employment history. The most critical, space-heaviest section. Contains the actual evidence.
- **Where it lives:** Always in the widest/main column. Never in a sidebar or footer.
- **Ideal volume:** 2–5 roles. Under 2 = resume looks sparse. Over 5 = compress the oldest into 1–2 bullets each or consider omitting pre-relevant roles.
- **Per-role bullet allocation:** Most recent role: 4–5 bullets; 1–3 year old role: 3 bullets; 3+ year old role: 2 bullets; very old role (6+ years): 1 bullet or omit.
- **Space consumed:** 50–70% of total resume space in most resumes. Everything else is structured around it.
- **The 3-line bullet:** Allowed at most 2–3 times in the entire resume. Only in the most recent or most significant role. Only when the bullet contains multiple concrete metrics that genuinely lose meaning if compressed. Never for context, never for description.
- **ATS considerations:** Job titles in `### ` headings are read by ATS — use standard industry titles, not internal jargon. "Lead Frontend Engineer" not "Feature Owner II".

---

**`education`**

- **What it is:** Formal degrees and institutions. Signals baseline credentials and academic background.
- **Where it lives:** Below work in the main column.
- **Ideal:** 1–2 entries. For senior engineers (8+ years), education is secondary to experience — keep it compact.
- **What to show:** Degree name + Institution + Year + City. No GPA unless exceptional and the person is a recent grad. No description unless there's a notable distinction (thesis, honors, relevant specialization).
- **For senior engineers (8+ yrs):** Just degree + institution on two lines. Year and city are optional at this career stage.
- **For recent grads (< 2 yrs experience):** Can include GPA, relevant coursework, or thesis title — it's the strongest credential they have.
- **Never put education first** for anyone with more than 2 years of work experience.

---

**`achievements`** (Key Achievements)

- **What it is:** Standalone wins that aren't fully captured in any single role — cross-role awards, records, rapid promotions, public recognition, press mentions.
- **Format:** `Short title (3–6 words) | One-sentence description with a number if possible`
- **Where it looks good:** Sidebars (`two-col`, `sidebar-dark`); `three-col` left column; `sidebar-band` footer. Pairs well with skills in sidebar — gives the sidebar substance beyond just keywords.
- **Ideal:** 2–4 items. Each must be genuinely impressive. A weak item dilutes the section — omit it rather than pad.
- **Important distinction:** Do not duplicate items already in work bullets. Achievements should be things not already captured by a role — e.g. "Youngest engineer to lead a cross-company platform" is an achievement; "Reduced load time 40%" belongs in a work bullet.
- **When to omit:** If you have fewer than 2 genuinely notable standalone achievements, skip this section entirely. An empty or thin achievements section is worse than no section.

---

**`languages`** (Spoken Languages)

- **What it is:** Natural languages with proficiency level and a 0–5 rating.
- **Display:** One line per language with dot or star rating (set in UI). Renders cleanly in sidebars.
- **Where it looks good:** Sidebars — compact, structured, easy to scan. `sidebar-band` sidebar; `three-col` left; `sidebar-dark` lower panel. Looks out of place in the main column.
- **Ideal:** 2–5 languages. If the person speaks only one language (e.g. English-native), omit — it adds no information. If 2+, always include — multilingual signals are valued in global companies and add dimension.
- **Ratings:** Native = 5, Fluent/Bilingual = 4, Professional/Working = 3, Conversational = 2, Basic = 1.
- **When to omit:** Single language; page budget is tight and work history needs the space.

---

**`certifications`**

- **What it is:** Professional credentials — AWS, GCP, CKA, PMP, Kubernetes, Databricks, etc.
- **Format:** `Title | Issuer | Year`
- **Where it looks good:** `three-col` right; `sidebar-band` footer; `two-col` sidebar. Rarely in the main column — too lightweight for that space.
- **Ideal:** 1–5 items. Only include if industry-recognized and relevant to the target role. Outdated certs (5+ years, not renewed) should be omitted unless they are rare or difficult.
- **When to include:** Strong signal for cloud, DevOps, ML, and PM roles. Domain-specific certs (CKA for k8s engineers, AWS SAA for cloud architects) carry real weight with technical hiring managers. Generic certs (e.g. "Introduction to Python") add little for senior engineers.

---

**`courses`**

- **What it is:** Completed formal training — MOOCs, bootcamps, specialized programs. Signals continuous learning.
- **Format:** `Title | Provider | Year | One-line description`
- **Where it looks good:** `three-col` right; `sidebar-band` footer. Courses are too lightweight for the main column — they don't have the depth that work bullets do. In a sidebar they signal learning culture without taking much space.
- **Ideal:** 1–3 items. Only list courses that are clearly relevant AND from a reputable provider (Coursera, DeepLearning.AI, fast.ai, Stanford Online, Kaggle, etc.). Omit generic or introductory courses — they signal inexperience, not growth.
- **When to include:** If the person is pivoting to a new domain and the course explains the pivot (e.g. an ML course for a software engineer moving into AI); if the course demonstrates advanced specialization that doesn't appear in work history.
- **When to omit:** If work history already covers the domain well; if courses are basic or from unknown providers.

---

**`passions`** (Passions & Interests)

- **What it is:** Non-work interests and hobbies. Humanizes the resume and signals culture fit.
- **Format:** `icon | Title | Specific one-line description`
- **Where it looks good:** `three-col` left column (pairs naturally with achievements and languages); `sidebar-dark` lower panel if space allows. In single-column templates (`classic`, `minimal`) it uses scarce main column space for non-professional content — only include if page budget is comfortable.
- **Ideal:** 2–4 items. Generic entries ("music", "travel", "reading") add zero signal. Specificity makes entries memorable: "Synthesizer building — custom Eurorack modules from scratch" > "Music". Push the user for specifics if their passions sound generic.
- **Available icons:** `star heart code lightning trophy target book user globe music idea`
- **When to include:** When interests are specific and genuine; when there's space; when the role or company (especially product/design-adjacent) values culture signals.
- **When to omit:** Tight page budget; interests are fully generic; work history needs all available space.

---

**`mytime`** (My Time)

- **What it is:** A donut chart showing how the person distributes their working time. Labels = activities, values = relative weights. Always renders as a fixed-size circle.
- **Display:** Fixed height (~3 lines equivalent) regardless of number of items. Labels appear around the chart with letter-coded segments.
- **Where it looks good:** Compact sidebar positions only — `sidebar-dark` lower panel; `two-col` sidebar; `sidebar-band` sidebar. Never in main column or footer.
- **Ideal:** 3–6 slices. Fewer = chart looks empty and sparse. More = labels crowd and become unreadable. Each label should be 1–3 words.
- **Good data example:** `Deep Work | 4, Code Review | 2, Meetings | 1, Learning | 1` — tells a story (IC engineer who protects deep work time and invests in learning).
- **When to include:** When the time allocation is genuinely distinctive and signals something about working style or priorities (e.g. "70% IC coding" signals staying hands-on; "40% mentoring" signals engineering leadership values).
- **When to omit:** Limited page budget; the split is too generic to be informative (50% coding, 50% meetings could describe anyone).

---

**`extra`** (Custom Section)

- **What it is:** A flexible section for coherent content that doesn't fit standard sections — AI projects, side projects, publications, open-source contributions, speaking engagements, volunteering. The heading is whatever the user chooses.
- **Format:** `Title | Description` — one per line
- **Where it looks good:** Depends on item count. 2–3 items: sidebar or footer (`two-col` sidebar, `sidebar-band` footer, `three-col` right). 4+ items: main column — long-form content benefits from width.
- **Ideal:** 2–5 items with tight, impactful descriptions. Each description should be specific — "Built a LangGraph multi-agent pipeline for trend discovery → brief generation → auto-publish" not "Built AI tools".
- **Multiple custom sections:** If there are two distinct clusters (e.g. "AI Projects" and "Open Source"), they can each be a separate extra section — but only if page budget allows and both sections have at least 2 substantive items.
- **When to include:** Side projects or AI experiments that demonstrate skills beyond the work history; publications or speaking that signal thought leadership. This section is often a hidden gem for candidates who have impressive things that don't fit neatly into any role.
- **When to omit:** If items are vague or low-impact; if page budget is already at 1.5 pages.

**Work role space estimation:**

| Component | Lines |
|---|---|
| Role title | 1 |
| Company · Period | 1 |
| Optional context line | 0–1 |
| Each 2-line bullet | 2 |
| Each 3-line bullet (max 2–3 in entire resume) | 3 |
| Gap after role | 0.5 |

- Most recent role: 4–5 bullets → 9–12 lines
- Mid role: 3 bullets → 7–8 lines
- Old role (3+ years): 2 bullets → 5–6 lines

**Page capacity:**

| Layout | Usable lines per page | Notes |
|---|---|---|
| Single column | 55 | classic, minimal |
| Two column | 55 per column; effective = max(main, sidebar) | columns run in parallel |
| Sidebar-dark | 55 main; sidebar runs alongside | left panel is taller but content is lighter |
| Three column | 55 per column; effective = max of all three | most efficient use of space |
| Sidebar-band | 40 main+sidebar; 10 footer; ~50 total effective | footer adds ~10 lines |

**Target: 55–82 effective lines total (1–1.5 pages).**

---

## Step 3 — Select the template

Score templates against the content volume and optional sections:

1. Count total estimated lines if all content were in a single column.
2. If < 55 lines: use `classic` or `minimal` — single column is clean and doesn't look sparse.
3. If 55–75 lines AND optional sections exist: use `two-col` or `sidebar-dark`.
4. If 75–100 lines AND many optional sections (3+): use `three-col` or `sidebar-band`.
5. If AI/ML work is prominent and summary is strong: `sidebar-dark` or `sidebar-band` give the summary visual weight.
6. If languages + certifications + courses are all present: `three-col` or `sidebar-band` are the only templates that handle this gracefully without overflow.

State the chosen template and a one-sentence reason.

---

## Step 4 — Assign sections to columns

Using the chosen template's column structure (from Step 2), assign every section from the Content Map to a column. Follow the template's defaults but override when content volume demands it:

- Work experience always goes in the main/widest column.
- Skills always go in a sidebar or left/right column when one exists — they compress well.
- Summary goes in the header (for classic/two-col/three-col/minimal) or in the sidebar (for sidebar-dark/sidebar-band).
- Compact sections (languages, certifications, mytime, passions) go in sidebars or footers.
- Custom sections with many items go in main; those with 2–3 items go in sidebar.

---

## Step 5 — Allocate space budgets

For each section, compute the maximum space budget that keeps the whole resume within 1–1.5 pages.

Work backwards:
1. Fixed overhead: header ~4 lines, section title lines (1 per section).
2. Sidebar sections: sum their estimated lines, ensure they fit within the column height.
3. Main sections: work + education dominate; allocate remaining lines to work bullets.
4. Derive per-role bullet counts and per-bullet character limits from remaining budget.

Character limit guidance per column width:
- Full single column: 110–120 chars per bullet
- Main column in two-col (65%): 90–100 chars per bullet
- Main column in three-col (50%): 75–85 chars per bullet
- Sidebar/left/right columns: items are not long-form bullets — keep descriptions to 50–70 chars

---

## Step 6 — Produce the Layout Plan

Output the following document. This is the input to `/resume-writer`.

---

### LAYOUT PLAN

**Person:** [Name]  
**Template:** `[template-id]`  
**Reason:** [one sentence]  
**Estimated pages:** [X.X]

---

#### Section Placement

| Section | Column | Order in column |
|---|---|---|
| work | main | 1 |
| education | main | 2 |
| skills | sidebar | 1 |
| achievements | sidebar | 2 |
| … | … | … |

(List every section from the Content Map. Omit sections with no content.)

---

#### Per-Section Formatting Budget

| Section | Role/Item | Max bullets or items | Max chars per bullet/desc | Max total lines | Notes |
|---|---|---|---|---|---|
| work | [Role 1 title] | 5 bullets | 95 chars | 10 lines | Most recent; include context line |
| work | [Role 2 title] | 3 bullets | 95 chars | 7 lines | |
| work | [Role 3 title] | 2 bullets | 95 chars | 5 lines | Oldest; no context line |
| education | [Degree] | — | — | 2 lines | degree + institution line only |
| skills | — | — | — | 2 lines | all skills as chips |
| achievements | — | 3 items | 65 chars | 5 lines | title\|desc, one per line |
| summary | — | — | 180 chars | 2 lines | one dense sentence in header |
| languages | — | N items | — | N lines | one line per language |
| certifications | — | N items | — | N lines | |
| courses | — | N items | 65 chars desc | N×1.5 lines | |
| passions | — | N items | 55 chars desc | N×1.5 lines | |
| mytime | — | N items | — | 3 lines | donut chart, fixed height |
| extra [title] | — | N items | 65 chars | N×1.5 lines | |

---

#### 3-Line Bullet Allowance

The entire resume may have at most **2–3 bullets that run to 3 lines**. Reserve these for the most recent role only, and only for bullets that contain multiple concrete metrics that lose meaning if cut.

Recommended allocation: [e.g. "2 three-line bullets in Role 1, none elsewhere"]

---

#### Page Estimate Breakdown

| Component | Estimated lines |
|---|---|
| Header (name + title + summary + contact) | 4 |
| Skills | 2 |
| Work — Role 1 | 10 |
| Work — Role 2 | 7 |
| Work — Role 3 | 5 |
| Education | 3 |
| Achievements (sidebar) | 5 |
| … | … |
| **Total effective lines** | **XX (X.X pages)** |

---

**Next step:** Run `/resume-writer` — it will read both this Layout Plan and the Content Map from `/resume-planner` in the conversation, then write the formatted `.md` file to the correct character and bullet counts.
