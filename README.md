# Julien Evrard — Portfolio (Next.js)

Implementation of the `Portfolio.dc.html` design handoff (Claude Design), built
as a **Next.js 14** app (App Router) with the real `tardis_exterior_2005.glb`
model loaded via Three.js.

## Stack
- **Next.js 14** (App Router, React 18)
- **three** `0.134.0` + `GLTFLoader` (matches the prototype's Three.js version)
- No CSS framework — the prototype's exact inline styles are preserved; global
  styles, keyframes and `:hover` states live in `app/globals.css`.

## Structure
```
app/
  layout.jsx        # root layout, metadata, fonts
  page.jsx          # the page — static sections (server component)
  globals.css       # base styles, keyframes, hover + reduced-motion rules
components/
  NavBar.jsx        # fixed nav + mobile burger / full-screen menu  (client)
  SpaceBackground.jsx # star fields, planet, scroll parallax, work gallery (client)
  Tardis.jsx        # the 3D GLB TARDIS on its scroll-driven waypoint path (client)
  Demo.jsx          # interactive 3DS → pipeline → Discord mock (client)
public/
  tardis_exterior_2005.glb
```

## What changed vs. the prototype
- Dropped the Claude Design React runtime (`support.js`) for idiomatic Next.js
  components; `sc-for` / `sc-if` / `{{ }}` became JSX + React state.
- The prototype drew the TARDIS as a **procedural cube**. Here it's the real
  **`tardis_exterior_2005.glb`**, auto-centred and scaled at load, driven along
  the same six waypoints (hero → about → work → demo → music → contact) with
  idle bob, yaw wobble and a pulsing roof lamp.

## Improvements added
- **Embedded live site demo** — the "Portfolios in production" card (`/003`) has a
  ▶ Live demo that opens a browser-chrome modal embedding **farah.etsukow.com**
  in an iframe (`components/LiveSiteDemo.jsx`, rendered through a portal so the
  cards' `backdrop-filter` doesn't trap it). ⚠️ The live site sends
  `X-Frame-Options: SAMEORIGIN`; the farah repo's `nginx.conf` has been updated to
  use `Content-Security-Policy: frame-ancestors` allowing `*.etsukow.com` +
  `localhost:3000`, so **the embed goes live once farah is redeployed**. Verified
  end-to-end against a local build of farah.
- **TARDIS favicon** — `app/icon.svg`, a blue police box (Next auto-registers it).
- **Selected work trimmed** to three coordinates (Luma3DS, sae_go, Portfolios).
- **Real 3DS in the live demo** — the demo uses the actual `3ds-open.png` render
  from the original portfolio (`public/3ds-open.png`). The two grey screens are
  live overlays (positioned from the image's measured screen rects): the **top
  screen** shows NOW PLAYING, the **bottom touch screen** is the tappable
  cartridge menu.
- **Section ("screen") scrolling** — `scroll-snap-type: y mandatory` +
  `scroll-snap-stop: always` make each section a full screen that snaps one at a
  time. The WORK section is a single screen whose project cards live on a
  horizontal snap rail; a wheel redirect (`SpaceBackground.jsx → onWheel`) turns
  a vertical wheel into horizontal panning until the rail ends, then releases to
  the next section. On phones (≤820px) snapping is disabled (content stacks
  taller than a screen) and natural scrolling returns.
- **Materialise intro** — the TARDIS flickers/fades in on load (very Doctor Who).
- **Readability scrim** — a soft dark + blur halo (`#tardisScrim`) tracks the
  TARDIS's projected on-screen position every frame (`Tardis.jsx → updateScrim`),
  sitting between the 3D canvas and the content. Wherever the ship passes under
  text, the bright box is dimmed and blurred so the copy stays legible — without
  affecting the rest of the page.
- **`prefers-reduced-motion`** — idle 3D drift and CSS animations are paused for
  visitors who request reduced motion.
- Console easter egg preserved from the original.

Verified in Chrome across hero / about / work / demo / music / contact and at
mobile width (burger menu, single-column, native horizontal card scroll); the
production build (`next build`) prerenders cleanly with no console errors.

## Run
```bash
npm install
npm run dev      # http://localhost:3000
# or
npm run build && npm start
```
