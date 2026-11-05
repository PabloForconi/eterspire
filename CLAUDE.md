# Press Over proposal site

Astro 7 static site that presents Press Over commercial proposals as a web page. The layout is a reusable
template; each proposal is only data. This repo currently holds the Eterspire proposal (Spanish).

Talk to the user in Spanish.

## Commands
Node is installed at `C:\Program Files\nodejs` (add it to PATH in new shells).
- `npm run dev`: dev server on http://localhost:4322 (or the `astro-dev` entry in `.claude/launch.json`)
- `npm run build`: builds to `dist/` and validates every proposal against the schema

## Adding or editing a proposal
1. Copy `src/content/proposals/_template.yaml` to `src/content/proposals/<slug>.yaml`. The slug is the URL (`/<slug>/`).
   Files starting with `_` are not built; `draft: true` keeps a proposal out of the build.
2. `lang` (`en` | `es`) sets the UI labels; write the content in that language.
3. Sections render in file order. Block types: `text`, `cards`, `stats`, `timeline`, `table`, `pricing`, `cases`,
   `team`, `contact`. `sub: true` makes a block continue the previous section (no divider, smaller heading, no menu entry).
4. Images go in `src/assets/proposals/<slug>/`, referenced relative to the YAML file.
5. Run `npm run build`. A schema error names the file and field.

Rules:
- Copy the client-approved text as written (the source document lives in `_material/`, git-ignored). Don't
  rewrite, add claims, or mark a "recommended" package unless the source says so.
- Quote one-line YAML strings that contain `: `, or use a `|` block.
- With one proposal, `/` redirects to it; with several, `/` lists them. Every page is `noindex`.

## Structure
- `src/content.config.ts`: proposal schema (all block types and their fields)
- `src/pages/[slug].astro`: proposal page; maps each block `type` to its component (add new types here and in the schema)
- `src/components/`: `Cover`, `Nav` (sticky menu + "Save as PDF"), `Section` wrapper, `sections/*` blocks
- `src/lib/md.ts`: the light Markdown used in text fields; `src/lib/i18n.ts`: UI labels in en/es
- `src/styles/global.css`: color tokens (Press Over defaults; `theme.accent` overrides per proposal) and print styles

## Pending
- Press Over branding (logo, colors, fonts) and Eterspire assets (logo, key art) haven't been received yet; the
  cover shows "Press Over" as text and the accent is a placeholder orange.
- No deploy target or Git remote yet. Git push uses SSH with the repo-local `core.sshCommand` (key `~/.ssh/DesktopPablo`).
