# CLAUDE.md

Guidance for Claude Code when working in this repository.

## Commands

```bash
npm run dev     # dev server on :3000
npm run build   # production build
npm run lint    # eslint
```

## Architecture

Single-page portfolio on Next.js 15 (App Router), React 19, Tailwind CSS v4, Motion (`motion/react`).

- `app/layout.tsx` — fonts (Bebas Neue, IBM Plex Sans/Mono via `next/font`), metadata, `ThemeProvider` (`next-themes`, class-based, default dark)
- `app/page.tsx` — renders `<Portfolio />`
- `app/portfolio.tsx` — client component containing every section (Hero, Cards, Proof, Education, Stack, Contact), the sidebar / mobile nav, cursor and theme toggle
- `app/globals.css` — palette tokens: light on `:root`, dark on `.dark`; exposed to Tailwind as `bg-ink`, `text-fg`, `bg-card`
- `data/constants.js` — all content (`Bio`, `skills`, `experiences`, `education`, `projects`)

`@/` maps to the project root.

## Conventions

- **Colors**: never hardcode hex/white in components. Use the tokens (`text-fg`, `bg-ink`, `bg-card`) or CSS variables (`var(--red)`, `var(--lime)`, `var(--amber)`, `var(--blue)`, `var(--cyan)`, `var(--mint)`). For alpha on a variable use `color-mix`, not hex suffixes. Both themes must stay readable.
- **Motion**: the page is wrapped in `<MotionConfig reducedMotion="user">`; continuous animations (marquees, scramble) also check `useReducedMotion()`. New animation must degrade gracefully.
- **Easing**: `[0.22, 1, 0.36, 1]` (`EASE`).
- **Accessibility**: keep one `h1` (screen-reader only, the visible name is decorative), tap targets >= 44px, text >= 12px and >= 60% opacity, hide decorative/duplicated content with `aria-hidden`.
- **Performance**: Budget: ~160 kB first-load JS at time of writing (measured on the production build); avoid adding heavy dependencies. Pause off-screen animation loops.

## Content updates

- Projects: edit `projects` in `data/constants.js` (`order` controls sequence). Give new projects an entry in `META` in `app/portfolio.tsx` (headline metric, subtitle, accent color) or they fall back to a generic card.
- Resume: replace `public/resume.pdf`; keep `Bio`, `experiences`, `education` and skills consistent with it.
- Education card details (GPA, coursework, MS start/end month) are in `Education()` in `app/portfolio.tsx`.

## History

The previous tactical/"Doom 64" design (split-flap hero, mission cards, skills carousel) was retired when this
design became the main site. It is recoverable from git history before the "Make redesign the main site" commit.
