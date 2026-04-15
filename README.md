# Alejandro Sierra Portfolio

Modern personal portfolio built with Vite and React.

## Tech Stack

- React 18
- Vite
- CSS Modules + global CSS
- GitHub REST API (profile, repositories, language stats)

## Project Structure

- src/App.jsx: app shell, section routing, GitHub data fetch
- src/components/: UI components (navbar, footer, animated background)
- src/sections/: page sections (About, Experience, Technologies, Projects)
- src/data/portfolio.js: profile content and constants
- src/styles/global.css: global theme and shared styles

## Requirements

- Node.js 18+
- npm

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create a local env file from template:

```bash
cp .env.example .env
```

If you are on Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

3. Start development server:

```bash
npm run dev
```

4. Open the local URL shown in terminal.

## Environment Variables

This is a Vite project, so client-exposed variables must start with VITE_.

- VITE_GITHUB_USER: GitHub username used for profile and repos
- VITE_GITHUB_TOKEN: optional token to reduce GitHub API rate-limit issues
- VITE_GITHUB_API_BASE: optional API base (default: https://api.github.com)

See .env.example for defaults.

## Available Scripts

- npm run dev: start dev server
- npm run build: production build
- npm run preview: preview production build locally

## Deploy on Vercel

1. Import this repository into Vercel.
2. In Project Settings > Environment Variables, add:
   - VITE_GITHUB_USER
   - VITE_GITHUB_TOKEN (optional but recommended)
   - VITE_GITHUB_API_BASE (optional)
3. Trigger a deploy.

Vercel build settings are standard for Vite:

- Build Command: npm run build
- Output Directory: dist

## Notes

- Keep .env out of version control.
- If GitHub API returns 403, add or rotate VITE_GITHUB_TOKEN.
- Live project thumbnails in Projects section depend on external screenshot availability.
