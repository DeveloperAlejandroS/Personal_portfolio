# Alejandro Sierra Portfolio

Modern personal portfolio built with Vite and React. Live at https://alejandro-sierra-dev.vercel.app/

## Tech Stack

- React 18
- Vite
- lucide-react and a devicon font subset for icons
- CSS Modules + global CSS
- Vercel Function (`api/github.js`) that aggregates GitHub profile, repositories and language stats
- Vercel Web Analytics
- Vitest + Testing Library

## Project Structure

- api/github.js: serverless function behind `/api/github` (edge-cached for 1 hour)
- src/App.jsx: app shell, section routing, GitHub data loading
- src/lib/github.js: GitHub fetch + aggregation shared by the function and the browser fallback
- src/components/: UI components (navbar, footer, animated background, project modal)
- src/sections/: page sections (About, Experience, Technologies, Projects)
- src/data/portfolio.js: profile content and constants
- src/styles/global.css: global theme and shared styles
- src/styles/devicon/: generated devicon font subset (only the icons the site uses)
- scripts/subset-devicon.mjs: regenerates that subset
- public/: CV, icons, Open Graph image, manifest, robots.txt and sitemap.xml
- vercel.json: security headers and long-lived caching for hashed assets
- .github/workflows/ci.yml: runs tests and the production build on every push and pull request

Each section has its own URL (`/#about`, `/#experience`, `/#technologies`, `/#projects`), so you can link to it directly and the browser back button moves between sections.

## Editing Content

Everything shown on the site lives in `src/data/portfolio.js`:

- `PROFILE`, `EDUCATION`, `EXPERIENCE`, `CERTIFICATIONS`, `SKILLS`
- `FEATURED_REPOS`: repositories pinned to the top of the Projects section, in order
- `HIDDEN_REPOS`: repositories never shown
- `EXCLUDED_LANGUAGES`: languages left out of the Tech Stack totals (Jupyter Notebook by default)

The downloadable CV is `public/cv-alejandro-sierra.pdf`; keep it in sync with this file.

Repository descriptions, topics and live URLs come from GitHub, so edit them on each repo's page.
Run `pnpm test` after editing: it checks that dates, icons and repo lists are consistent.

Icons use a subset of the devicon font (~10 KB instead of ~1.5 MB). After adding or changing a
`devicon-*` class anywhere in `src/`, run `pnpm icons` to regenerate it; `pnpm test` fails if you forget.

## Requirements

- Node.js 22+
- pnpm

## Local Setup

1. Install dependencies:

```bash
pnpm install
```

2. Optionally create a local env file with a GitHub token (avoids the 60 requests/hour anonymous limit):

```bash
cp .env.example .env
```

If you are on Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Start the development server (it also serves `/api/github` locally):

```bash
pnpm dev
```

4. Open the local URL shown in terminal.

## Environment Variables

- GITHUB_TOKEN: server-only token read by `api/github.js`. Use a fine-grained token with read-only access to public repositories.

Never put secrets in `VITE_*` variables: Vite embeds them in the public JavaScript bundle.

## Available Scripts

- pnpm dev: start dev server
- pnpm build: production build
- pnpm preview: preview production build locally
- pnpm test: run the test suite
- pnpm icons: regenerate the devicon font subset

## Deploy on Vercel

1. Import this repository into Vercel.
2. In Project Settings > Environment Variables, add `GITHUB_TOKEN`.
3. In the project's Analytics tab, enable Web Analytics.
4. Trigger a deploy.

Vercel build settings are standard for Vite:

- Build Command: pnpm build
- Output Directory: dist

The canonical URL, Open Graph tags, sitemap and robots.txt point to https://alejandro-sierra-dev.vercel.app/. Update `index.html`, `public/robots.txt` and `public/sitemap.xml` if the domain changes.

## Notes

- Keep .env out of version control.
- If `/api/github` fails, the site falls back to anonymous GitHub API calls from the browser.
- Live project thumbnails in Projects section depend on external screenshot availability.
