# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Deploy to Vercel
npm run deploy
```

## Architecture Overview

This is a modern portfolio website built as a single-page application with Next.js 15 App Router. The architecture emphasizes smooth animations, 3D interactive elements, and a data-driven approach.

### Key Structural Patterns

**Single-Page Architecture**: The site uses Next.js App Router but renders as a single page with section-based navigation. All major sections (Hero, Skills, Projects, Education, Experience, Contact) are rendered in `app/page.tsx`.

**Data Centralization**: Nearly all content is defined in `/data/constants.js` (404 lines). This includes:
- Personal information and social links
- Skills categorized by domain
- Project metadata and descriptions
- Education and experience timelines
- Navigation structure

**Component Hierarchy**:
```
app/
├── page.tsx                    # Main entry - assembles all sections
├── components/
    ├── heropage.tsx           # Hero section container
    ├── skillspage.tsx         # Skills showcase with carousel
    ├── projectspage.tsx       # Projects grid
    ├── educationpage.tsx      # Education timeline
    ├── experiencepage.tsx     # Experience timeline
    ├── contactpage.tsx        # Contact form
    └── hero/                  # Hero subcomponents
        ├── profile-3d.tsx     # 3D profile visualization
        ├── globe-component.tsx # Cobe globe
        └── *-content.tsx      # Content sections
    └── skills/
        ├── infinite-scroll-column.tsx
        └── skills-carousel.tsx

components/ui/                  # Reusable primitives (shadcn/ui)
```

## Tech Stack

- **Framework**: Next.js 15.5.3 with App Router
- **React**: v19 with concurrent features
- **TypeScript**: Strict mode enabled
- **Styling**: Tailwind CSS v4 with custom design system
- **Animations**: Motion (Framer Motion v12) - heavy usage throughout
- **Carousels**: Embla Carousel for skills showcase
- **3D Graphics**: Cobe for interactive globe
- **Forms**: EmailJS for contact form submissions
- **Icons**: React Icons + Lucide React

## Important Conventions

### Animation Patterns

All animations use Motion (Framer Motion) with consistent patterns:

**Custom Easing**: Standard easing curve is `[0.22, 1, 0.36, 1]`

**Viewport Triggers**: Most animations use `whileInView` with:
```tsx
whileInView={{ opacity: 1, y: 0 }}
viewport={{ once: true, amount: 0.3 }}
transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
```

**Stagger Children**: Parent-child animation sequences use `staggerChildren` with delays of 0.1-0.2s.

### Design System

**Glass Morphism**: Consistent use of backdrop-blur with semi-transparent backgrounds:
```css
bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10
```

**Gradient Text**: Headings often use gradient text with webkit clip:
```tsx
className="bg-gradient-to-r from-white via-white to-white/60 bg-clip-text text-transparent"
```

**CSS Variables**: Theme colors defined in `app/globals.css` using HSL values:
- `--background`, `--foreground`
- `--card`, `--card-foreground`
- `--primary`, `--primary-foreground`
- etc.

### Path Aliases

The `@/` alias maps to the project root, used for all imports:
```tsx
import { cn } from "@/lib/utils"
import { NAME } from "@/data/constants"
```

### Client Components

Most interactive components require `"use client"` directive due to:
- Motion animations
- React hooks (useState, useEffect)
- Browser APIs (intersection observer, etc.)
- Event handlers

## Configuration Notes

**Image Domains**: External images are configured in `next.config.mjs`. When adding new image sources, add domains to `remotePatterns`.

**Tailwind**: Uses Tailwind v4 with PostCSS plugin. Custom theme extensions in `tailwind.config.ts` define additional colors and keyframes.

**TypeScript**: Strict mode with path mapping. The `@/*` alias resolves to `./*`.

## Data Updates

To modify portfolio content, edit `/data/constants.js`:
- `NAME`, `DESIGNATION`, `BIO` - Personal info
- `SKILLS` - Categorized skills array
- `PROJECTS` - Project cards with title, description, tech stack
- `EDUCATION` - Education timeline
- `EXPERIENCE` - Work experience timeline
- `SOCIAL_LINKS` - Social media URLs

After updating constants, components will automatically reflect changes due to data-driven rendering.
