# Prashant Gupta Portfolio

A personal developer portfolio covering projects, software experience, education, achievements, technical skills, and workshops.

## Tech stack

- Next.js 16 App Router
- React 19
- TypeScript
- Tailwind CSS
- Lucide React and React Icons

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Routes

- `/` - Portfolio home and interactive personal card
- `/projects` - Curated project showcase
- `/work` - Experience, education, skills, and achievements
- `/about` - Personal profile
- `/workshops` - Workshop overview and testimonials
- `/workshops/[slug]` - Workshop details
- `/workshops/testimonials` - Student feedback

## Content

Personal content is sourced from `data/prash`; workshop content comes from `data/workshop`. Update those TypeScript data files instead of rewriting page components.

The card uses `public/user/personal/card.png` and includes pointer movement, touch-friendly presentation, keyboard-accessible download, and a reduced-motion fallback.

## Quality checks

```bash
npm run lint
npm run build
```