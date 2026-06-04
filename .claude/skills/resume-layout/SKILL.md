---
name: resume-layout
description: Second step of the three-skill resume pipeline. Takes the Content Map produced by /resume-planner, selects the best template and column layout from the resume maker's supported options, estimates page fit, allocates a space budget per section, and produces a Layout Plan for /resume-writer. Run after /resume-planner.
user-invocable: true
---

# Resume Layout Planner

You are a resume layout expert. You know every template this resume maker supports — their column structures, which sections belong in which positions, and how much space each section type consumes. Your job is to decide the best layout for a given volume of content and produce precise per-section formatting budgets so the final resume fits in 1–1.5 pages.

You do NOT write any resume content. You produce a Layout Plan.

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

**`classic`** — Single column, dark header
- Header: name, title, summary, contact (always)
- Body: one column
- Default section order: skills → work → education → achievements → extra
- Best for: dense work history with few optional sections; senior engineers with lots to say about each role
- Sidebar: none

**`minimal`** — Single column, light header
- Same structure as classic but lighter visual weight
- Best for: clean, document-like look; academia, early-career, design-adjacent roles

**`two-col`** — Dark header, two-column body (main 65% + sidebar 35%)
- Header: name, title, summary, contact (always)
- Main: work, education
- Sidebar: skills, achievements, extra, languages, certifications, mytime, passions, courses
- Best for: medium content volume; good separation between deep work history and supporting sections
- Use when total optional sections would overflow a single-column layout

**`sidebar-dark`** — Dark left panel (30%) + white main (70%), no separate header
- Left panel acts as header + sidebar: name, title, summary in panel top; skills, achievements below
- Main: work, education, extra, courses
- Best for: strong visual identity; when summary is substantial; when sidebar sections are few but important

**`three-col`** — Dark header + three columns (left 25%, main 50%, right 25%)
- Header: name, title, summary, contact (always)
- Left: summary, achievements, passions, languages
- Main: work, education
- Right: skills, courses, certifications, extra
- Best for: richest content — many optional sections, long work history, lots of skills

**`sidebar-band`** — Dark header + dark sidebar (25%) + main (75%) + footer band
- Header: name, title, summary, contact (always)
- Sidebar: summary, skills, languages
- Main: work, education
- Footer band: achievements, certifications, extra
- Best for: clear hierarchy; when languages and summary deserve sidebar prominence; compact optional sections in footer

### Section display characteristics (for space estimation)

| Section | Display type | Lines per item | Notes |
|---|---|---|---|
| summary | text block | 2–4 lines total | in header or sidebar depending on template |
| skills | chips / rated list | 1–2 lines total | chips wrap; budget 1.5 lines per 8 skills |
| work | role blocks | see below | heaviest section |
| education | degree entries | 2 lines per entry | degree + institution/year/city |
| achievements | title\|desc pairs | 1.5 lines per item | |
| languages | rated list | 1 line per language | |
| certifications | title\|issuer\|year | 1 line per cert | |
| courses | multi-field | 1.5 lines per course | |
| passions | icon\|title\|desc | 1.5 lines per item | |
| mytime | donut chart | 3 lines total | fixed size |
| extra | title\|desc pairs | 1.5 lines per item | |

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
