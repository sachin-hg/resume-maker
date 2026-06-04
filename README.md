# Resume Maker

A browser-based resume builder that renders a Markdown file into a polished, print-ready resume. Edit directly in the browser or import a `.md` file.

## Run locally

```bash
npm install
npm run dev
```

Open **http://localhost:5173**.

To build a static bundle:

```bash
npm run build      # outputs to dist/
npm run preview    # serve the built bundle locally
```

## Adding sample resumes

Drop a `.md` file into `samples/`. It will appear in the sample picker inside the app automatically (picked up via `import.meta.glob`).

---

## Generating a resume with Claude Code

This project ships with Claude Code skills that turn raw, unstructured input into a polished, ATS-friendly `.md` file ready to load into the app.

### Prerequisites

[Claude Code](https://claude.ai/code) must be installed and running inside this project directory.

### The quick path — `/generate-resume`

Run this from the Claude Code prompt when you're in the project directory:

```
/generate-resume
```

Claude will run the full pipeline automatically (Plan → Layout → Write) with checkpoints between each phase where you can review and redirect. Just paste your raw content — notes, LinkedIn text, old CV, anything — and Claude structures it.

**What you can provide as input:**

- Your own notes, bio, or bullet dump — freeform, any structure
- Your old resume — Claude extracts and modernises it
- A colleague's resume — Claude cross-references it for shared project details and metrics, flagging anything you need to confirm before claiming
- Any combination of the above

**Supported input formats — mix and match freely:**

| Format | How to provide |
|---|---|
| Plain text | Paste directly into the prompt |
| Image (screenshot or photo of a resume) | Attach the image to your message |
| PDF | Provide the file path or attach the file |
| `.md` file (from this app or any markdown resume) | Provide the file path — Claude reads and parses it |

**After the file is written:**

1. Refresh the browser at `http://localhost:5173`
2. Select your resume from the sample picker
3. Select the layout template Claude recommended (shown in the report)
4. Edit inline, pick a template, print or export

---

### The three-skill pipeline (for more control)

Run each skill separately when you want to review and adjust decisions at each stage before committing to the next.

#### Step 1 — `/resume-planner`

```
/resume-planner [paste your raw content here, or just run it and Claude will ask]
```

Extracts all content from your input, classifies each piece into candidate sections, estimates page volume, and flags what's missing. Produces a **Content Map** — a structured breakdown you can review before any layout decisions are made.

#### Step 2 — `/resume-layout`

```
/resume-layout
```

Reads the Content Map from Step 1. Selects the best template from the six available layouts, assigns each section to a column, and computes per-section formatting budgets (bullet counts, character limits) to ensure the resume fits in 1–1.5 pages. Produces a **Layout Plan**.

#### Step 3 — `/resume-writer`

```
/resume-writer
```

Reads the Content Map and Layout Plan. Writes every section to exact spec — outcome-first bullets, metrics bolded, ATS checklist enforced — and outputs the final `.md` file to `samples/<name>.md`.

---

### Updating a resume

At any point, tell Claude what you want to change — in plain language, from the same Claude Code session:

```
the second bullet in the Directi role is too long, tighten it
add my AWS cert from 2023
reorder skills — TypeScript should come before React
I don't like the summary, rewrite it
```

Claude reads the existing file, applies only the requested change, re-runs the quality checklist across the full file, and writes it back.

---

### Supported layouts

Six templates are available in the app UI. Claude picks the best one for your content volume during `/resume-layout`, but you can always switch in the browser.

| Template | Best for |
|---|---|
| **Classic** | Dense work history, few optional sections, single column |
| **Minimal** | Clean look, early-career, academic, conservative fields |
| **Two Column** | Most mid-to-senior engineers — work in main, skills/achievements in sidebar |
| **Dark Sidebar** | Senior engineers with a strong skills list and substantial summary |
| **Three Column** | Rich profiles — many optional sections across languages, certs, courses, projects |
| **Sidebar + Band** | Multilingual engineers or those with many certifications; clear three-tier layout |

---

## Sample `.md` format

The parser reads a structured Markdown file. All sections are optional except the name.

```markdown
# Full Name
Job Title / Headline
One-line professional summary shown in the header.

## Contact
email: you@example.com
phone: +1 555 000 0000
location: City, Country
linkedin: /in/your-handle
github: /your-handle

## Skills
Skill A, Skill B, Skill C, Skill D

## Work Experience

### Job Title
Company Name · Month Year – Month Year
Short role description (one line, shown below the title).
- Bullet point achievement or responsibility
- Another bullet point — supports **bold** and *italic* inline

### Earlier Job Title
Company Name · Month Year – Month Year
- Single bullet is fine too

## Education

### Degree or Certification Name
Institution Name · Year · City (optional)

### Another Degree
Institution · Year

## Key Achievements
Achievement Title | One-sentence description of the achievement
Second Achievement | Another description

## Languages
English | Native | 5
French | Intermediate | 3

## Courses
AWS Solutions Architect | A Cloud Guru | 2023 | Hands-on cloud architecture course
Machine Learning | Coursera | 2022 |

## Passions & Interests
star | Photography | Capturing landscapes and street scenes
heart | Music | Playing guitar and piano
code | Open Source | Contributing to developer tooling

## Certifications
AWS Solutions Architect – Associate | Amazon Web Services | 2023
Google Cloud Professional | Google | 2022

## My Time
Deep Work | 4
Meetings | 2
Learning | 1

## Any Custom Section Title
Item Title | Item description shown alongside the title
Another Item | Another description
```

### Section reference

| Section heading | Format | Notes |
|---|---|---|
| *(top of file)* | `# Name` → title line → summary line | Name is `# H1`; next two plain lines are title and summary |
| `## Contact` | `key: value` pairs | Keys: `email`, `phone`, `location`, `linkedin`, `github` |
| `## Skills` | comma-separated values on one line | Rendered as chips or rated bars (toggle in UI) |
| `## Work Experience` | `### Title` → `Company · Period` → description → `- bullets` | Company and period separated by `·`; description is first non-bullet line |
| `## Education` | `### Degree` → `Institution · Period · Location` | Parts separated by `·`; location is optional |
| `## Key Achievements` | `Title \| Description` (one per line) | Pipe separates title from description |
| `## Languages` | `Name \| Level \| Rating` (one per line) | Rating is 0–5 |
| `## Courses` | `Title \| Provider \| Year \| Description` (one per line) | Year and description are optional |
| `## Passions & Interests` | `Icon \| Title \| Description` (one per line) | Icon: `star`, `heart`, `code`, `lightning`, `trophy`, `target`, `book`, `user`, `globe`, `music`, `idea` |
| `## Certifications` | `Title \| Issuer \| Date` (one per line) | Date is optional |
| `## My Time` | `Label \| Value` (one per line) | Value is a relative weight used in the donut chart |
| *any other `##` heading* | `Title \| Description` (one per line) | Becomes the Custom Section; heading text is used as the section title |

### Typography comment (optional)

Pasting a resume exported from the app will include a `<!-- typo:{...} -->` comment on the first line that preserves font sizes, colors, bold/italic settings, and alignment. You can ignore or delete this line — the app falls back to defaults without it.
