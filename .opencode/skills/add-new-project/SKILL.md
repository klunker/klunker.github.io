---
name: add-new-project
description: >-
  Use when the user asks to add a new project to the portfolio CV site.
  Invoke via /add-new-project. Covers creating the project HTML page from a
  template, adding a card to index.html, and adding translation keys to all
  three language files (en.json, pl.json, uk.json).
---

# Add New Project to Portfolio

This skill describes the step-by-step process of adding a new project to the
portfolio CV site. All paths are relative to the project root (`./`).

## Project prefix

Choose a short, lowercase, dash-free project prefix (e.g., `myapp`). Every
i18n key for this project will use `projects.{prefix}.{key}`.

## Steps

### 1. Create the project page

Create `projects/{prefix}.html` by copying an existing project page as a
template (e.g., `projects/believe.html` is minimal and clean).

Replace every translatable element:

| Section | Data Attribute | Key Pattern |
|---------|---------------|-------------|
| `<title>` | `data-i18n` | `projects.{prefix}.title_tag` |
| Hero badge | `data-i18n` | `projects.{prefix}.badge` |
| Hero h1 | `data-i18n-html` | `projects.{prefix}.title` — includes `<br>` and a gradient `<span>` |
| Hero description | `data-i18n` | `projects.{prefix}.desc` |
| Section 01 heading | `data-i18n` | `projects.{prefix}.section1` (or shared `projects.role_section`) |
| Section 01 intro `<p>` | `data-i18n` | `projects.{prefix}.intro` |
| Section 01 `<li>` items | `data-i18n` | `projects.{prefix}.li1`, `li2`, ... up to `li{N}` |
| Section 02 heading | `data-i18n` | `projects.{prefix}.section2` (or shared `projects.key_features`) |
| Section 02 feature titles | `data-i18n` | `projects.{prefix}.feature{N}_title` |
| Section 02 feature descs | `data-i18n` | `projects.{prefix}.feature{N}_desc` |
| Sidebar tech stack title | `data-i18n` | Shared `projects.tech_stack` (or `projects.{prefix}.tech_stack` for custom) |
| Live link button text | `data-i18n` | `projects.{prefix}.visit` |
| Footer copyright | `data-i18n` | `projects.{prefix}.footer` |

Ensure the page has:
- Language switcher buttons in the header with `data-lang-btn="en|pl|uk"`
- `<span data-i18n="projects.back">Back to Projects</span>` in the nav
- `<script src="../js/i18n.js"></script>` before `</body>`

### 2. Add the project card in `index.html`

In `index.html`, inside `<section id="projects">`, append a new `<article>`
project card matching the grid position (there are 3 card sizes).

Assign the next available `project{N}` number based on existing cards.

Add `data-i18n` attributes:
- `data-i18n="projects.project{N}.title"` on the card `<h3>`
- `data-i18n="projects.project{N}.desc"` on the card `<p>`

Set the link `href="projects/{prefix}.html"`.

Set the category badge to one of the shared keys: `projects.enterprise`,
`projects.corporate`, or `projects.productivity`.

### 3. Add translation keys to `lang/en.json`

Inside the project-specific block (after existing project entries), add
every `projects.{prefix}.*` key with English text.

Include **all** keys from step 1 plus the index card keys:
```json
"projects.project{N}.title": "...",
"projects.project{N}.desc": "..."
```

### 4. Add translation keys to `lang/pl.json`

Same keys as en.json, translated to Polish.

### 5. Add translation keys to `lang/uk.json`

Same keys as en.json, translated to Ukrainian.

### 6. Validate JSON

Run for all three files:
```bash
node -e "JSON.parse(require('fs').readFileSync('lang/en.json','utf8')); console.log('OK')"
node -e "JSON.parse(require('fs').readFileSync('lang/pl.json','utf8')); console.log('OK')"
node -e "JSON.parse(require('fs').readFileSync('lang/uk.json','utf8')); console.log('OK')"
```

### 7. Verify locally

Start a local server and check the page works:
```bash
python3 -m http.server 8080
```

## Template reference: gradient span format

In hero titles with a gradient, use this HTML pattern:
```html
<h1 data-i18n-html="projects.{prefix}.title" class="text-5xl md:text-7xl font-black mb-8 tracking-tight leading-tight">
  Project Name <br> <span class="bg-gradient-to-r from-COLOR1 to-COLOR2 bg-clip-text text-transparent">Gradient Text</span>
</h1>
```

In `en.json`, the corresponding value uses escaped HTML:
```json
"projects.{prefix}.title": "Project Name <br> <span class=\"bg-gradient-to-r from-COLOR1 to-COLOR2 bg-clip-text text-transparent\">Gradient Text</span>"
```

## Template reference: feature card grid

Each feature card has a title `<h4>` and description `<p>`:
```html
<div class="bg-white/5 p-6 rounded-2xl border border-white/5">
  <h4 data-i18n="projects.{prefix}.feature1_title" class="font-black text-white mb-2">Feature Title</h4>
  <p data-i18n="projects.{prefix}.feature1_desc" class="text-sm text-aws-muted">Feature description.</p>
</div>
```

## Files to modify

- `projects/{prefix}.html` — CREATE
- `index.html` — EDIT (add project card)
- `lang/en.json` — EDIT (add keys)
- `lang/pl.json` — EDIT (add keys)
- `lang/uk.json` — EDIT (add keys)
