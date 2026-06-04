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
| *any other `##` heading* | `Title \| Description` (one per line) | Becomes the Custom Section; heading text is used as the section title |

### Sections only available via the UI

These cannot be loaded from a `.md` file but can be added and filled in the browser:

- **Languages** — name, proficiency level, star/dot rating
- **Courses** — title, provider, year, description
- **Passions & Interests** — icon, title, description
- **Certifications** — title, issuer, date
- **My Time** — donut chart of how you spend your time

### Typography comment (optional)

Pasting a resume exported from the app will include a `<!-- typo:{...} -->` comment on the first line that preserves font sizes, colors, bold/italic settings, and alignment. You can ignore or delete this line — the app falls back to defaults without it.
