# etsu — portfolio

Personal portfolio of **Julien "etsu" Evrard**. A single-page, fully static site
with a **retro-handheld / console** look: a cinematic scroll-driven hero (a Nintendo
3DS rendered in WebGL + a typing `whoami` terminal), launchable project "app tiles",
chunky tactile UI and subtle CRT scanlines — themed with **Catppuccin** (Mocha by
default, Latte light mode).

## Stack

- **[SvelteKit](https://svelte.dev/docs/kit) 2 + Svelte 5** (runes), TypeScript, Vite
- **[Three.js](https://threejs.org/)** — the 3DS hero model (`/static/models/3ds.glb`)
- **[GSAP ScrollTrigger](https://gsap.com/) + [Lenis](https://lenis.darkroom.engineering/)** — pinned hero timeline & smooth scrolling
- **IntersectionObserver** reveal action for section animations
- **Catppuccin** palette as CSS custom properties, switched via `[data-theme]`
- Self-hosted fonts via `@fontsource` (Inter, Fredoka, JetBrains Mono, Press Start 2P)
- Output: `@sveltejs/adapter-static` → prerendered, served by **nginx**

Respects `prefers-reduced-motion` (the hero falls back to a static layout) and
`prefers-color-scheme` for the initial theme.

## Develop

```bash
npm install
npm run dev        # http://localhost:5173
npm run check      # type-check
npm run build      # static output → ./build
npm run preview    # serve the production build
```

## Edit the content

- Projects: [`src/lib/data/projects.ts`](src/lib/data/projects.ts)
- Skills & bio: [`src/lib/data/skills.ts`](src/lib/data/skills.ts)
- Theme tokens: [`src/app.css`](src/app.css)
- 3D model: replace [`static/models/3ds.glb`](static/models/3ds.glb)

## Docker

Multi-stage build (Node build → nginx). Locally:

```bash
docker build -t portfolio .
docker run -p 8080:80 portfolio   # http://localhost:8080
```

## CI/CD & deploy

[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml) builds the image and
pushes it to **GHCR** (`ghcr.io/etsukow/portfolio`) on every push to `main` (and on
`v*` tags). On your server:

```bash
docker compose pull && docker compose up -d
```

See [`docker-compose.yml`](docker-compose.yml) for a ready-to-use service (with
optional Traefik labels and Watchtower auto-update). An optional SSH auto-deploy
job is included (commented) in the workflow.
