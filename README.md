# WORK IN PROGRESS - Develop with ArcGIS Methodology Guide

An interactive, single-page explainer that tells the story of how **domain
expertise**, the **ArcGIS Maps SDK for JavaScript**, and **AI prompt
engineering** (GitHub Copilot + AI agents) combine to build custom mapping
applications — 2D or 3D — from any data type or system.

## Tech stack

| Concern    | Choice                                   |
| ---------- | ---------------------------------------- |
| Framework  | React 19 (functional components + hooks) |
| Build tool | Vite 8                                   |
| Styling    | Tailwind CSS v4 (`@tailwindcss/vite`)    |
| Animation  | Framer Motion                            |
| Icons      | lucide-react (+ a custom GitHub mark)    |
| Deploy     | GitHub Pages via `gh-pages`              |

## Getting started

```bash
npm install      # install dependencies
npm run dev      # start the dev server → http://localhost:5173
npm run build    # production build to dist/
npm run preview  # preview the production build locally
npm run lint     # oxlint
```

### How this project was scaffolded

```bash
# 1. Vite + React
npm create vite@latest . -- --no-interactive --template react

# 2. Runtime + styling dependencies
npm install framer-motion lucide-react
npm install -D tailwindcss @tailwindcss/vite gh-pages
```

Tailwind v4 is wired in through the Vite plugin in
[`vite.config.js`](vite.config.js) and imported at the top of
[`src/index.css`](src/index.css) with `@import "tailwindcss";` — all theme
tokens, utilities, and keyframes live in that one file.

## Project structure

```text
TheProcessApp/
├── index.html                 # fonts, meta, favicon
├── vite.config.js             # React + Tailwind plugins, base: './'
├── package.json               # scripts incl. predeploy/deploy
├── public/
│   └── logo.svg               # brand mark / favicon
└── src/
    ├── main.jsx               # React entry
    ├── App.jsx                # composes every section
    ├── index.css              # Tailwind v4 theme, utilities, keyframes
    ├── lib/
    │   └── motion.js          # shared Framer Motion variants
    ├── hooks/
    │   └── useTypewriter.js   # terminal typing effect
    └── components/
        ├── Navbar.jsx         # sticky nav + scroll-progress bar
        ├── Hero.jsx           # animated title + mouse-parallax visual
        ├── HumanRole.jsx      # Step 1 · interactive data/system integrator
        ├── PromptBridge.jsx   # Step 2 · live typing terminal
        ├── AIEngine.jsx       # Step 3 · Executive/Geek toggle
        ├── TechStack.jsx      # Step 4 · what React/Vite/Copilot/ArcGIS do
        ├── WhatYouCanBuild.jsx # Step 5 · application archetypes showcase
        ├── Footer.jsx         # CTA + pipeline recap
        └── ui/
            ├── AnimatedBackground.jsx
            ├── GlassCard.jsx
            ├── SectionHeading.jsx
            └── GithubIcon.jsx
```

## Deploying to GitHub Pages

`base: './'` in [`vite.config.js`](vite.config.js) emits relative asset URLs, so
the build works on a project site (`https://<user>.github.io/<repo>/`), a user
site, or a custom domain with no extra configuration.

```bash
npm run deploy   # builds and publishes dist/ to the gh-pages branch
```

Then in the repository settings, set **Pages → Build and deployment → Branch**
to `gh-pages`.

## Explore the repositories

There's no single showcase — the breadth is the point. Every repository is the
same process in action: a real problem, real data from any system, and AI-built
ArcGIS code. Browse them at
[github.com/dchantlos](https://github.com/dchantlos?tab=repositories).
