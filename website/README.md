# KeyDrop Website

This website is built with Next.js App Router, Tailwind CSS v4, and reusable shadcn-style UI blocks.

## Sections included

- **Navigation bar**
  - Sticky top navigation with section links: Overview, Steps, Docs
  - Theme toggle control in the navbar
- **Main content**
  - Hero overview
  - Feature summary card
  - Setup steps card grid
  - Documentation guidance blocks
- **Footer**
  - Top/docs shortcuts
  - External GitHub link
  - Copyright line

## Where to edit

- `app/page.tsx` — page structure (navbar, sections, footer)
- `app/layout.tsx` — metadata and theme-init script
- `components/ui` — reusable card/button UI blocks
- `components/theme-toggle.tsx` — theme toggle behavior

## Run locally

```bash
npm ci
npm run dev
```

## Validate

```bash
npm run lint
npm run build
```
