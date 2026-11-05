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
   `tone: dark` turns a section into a dark band (sub-sections inherit it); `logo` shows an image above the title.
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
- `src/styles/global.css`: color tokens, light/dark tones (`.tone-dark`), shared bits (`.panel`, `.tag`, `.card`, `.list`) and print styles
- `src/assets/brand/`: Press Over and IDA logos (white versions, for dark backgrounds), downloaded from pressover.news

## Look
Based on https://pressover.news: dark `#151515` frame and cover, white content panel with rounded top corners,
magenta `#ff005b` (`--accent`; `--accent-strong` is a darker mix for small text and buttons on white), Inter 800
for headings and labels, Source Sans 3 for text, slanted magenta tags for eyebrows, short magenta rule above
sub-section headings.

## Eterspire assets
`src/assets/proposals/eterspire/` holds `logo.png` and `key-art-tavern.webp` (the tavern illustration),
downloaded from https://eterspire.com (`images/page_logo.png`, `images/tavern_background.webp`). Official links found there, in case the proposal needs them:
Steam https://store.steampowered.com/app/2144600/Eterspire/, App Store https://apps.apple.com/us/app/eterspire/id1658183817/,
Google Play https://play.google.com/store/apps/details?id=com.StonehollowWorkshop.Eterspire,
Discord https://discord.com/servers/eterspire-814967791840264232, Reddit https://reddit.com/r/eterspire,
X https://x.com/eterspire, Instagram https://www.instagram.com/eterspiremmo/.
- No deploy target or Git remote yet. Git push uses SSH with the repo-local `core.sshCommand` (key `~/.ssh/DesktopPablo`).
