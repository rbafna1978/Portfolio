# Rishit Bafna — Portfolio

Personal portfolio built with Next.js 15 (App Router), React 19, Tailwind CSS 4 and Motion.
Live at [rishitbafna.vercel.app](https://rishitbafna.vercel.app).

## Sections

A single page with a sticky sidebar (top bar on mobile) that tracks your scroll position:

- **Signal** — oversized name, one-line intro, resume link
- **Work** — projects as case cards that stack as you scroll, each led by its headline metric
- **Proof** — animated before/after for two internship results
- **Education** — degrees with progress rings and GPA
- **Stack** — scroll-reactive skill marquees
- **Contact** — email, GitHub, LinkedIn, resume

Light and dark themes (toggle top-right, shared with `next-themes`), keyboard focus styles, a skip link,
and `prefers-reduced-motion` support are built in.

## Editing content

All content lives in [`data/constants.js`](data/constants.js): `Bio`, `skills`, `experiences`,
`education` and `projects`. Project order is controlled by each project's `order` field.

Two things live in [`app/portfolio.tsx`](app/portfolio.tsx) instead of the data file:

- `META` — the headline metric and accent color shown on each project card (keyed by project `id`)
- `COURSES` and the Master's start/end dates in `Education`

To update the resume, replace [`public/resume.pdf`](public/resume.pdf).

## Development

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build
npm run lint
```

## Structure

```
app/
  layout.tsx      fonts, metadata, ThemeProvider
  page.tsx        renders <Portfolio />
  portfolio.tsx   all sections and interactions
  globals.css     light/dark palette tokens and base styles
data/constants.js all site content
public/           resume.pdf, og-image.png
```

## Deployment

Pushing to `main` deploys to Vercel automatically.
