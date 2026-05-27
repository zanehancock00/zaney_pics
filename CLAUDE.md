# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # development server at http://localhost:3000
pnpm build        # production build (runs pnpm photos as prebuild automatically)
pnpm start        # serve the production build
pnpm photos       # regenerate src/data/photos.ts from public/photos/
pnpm photos --keep-order  # regenerate but preserve existing array order
pnpm typecheck    # tsc --noEmit
pnpm lint         # next lint
```

There are no tests. `pnpm typecheck` and `pnpm lint` are the verification gate before committing.

## Architecture

### Content model

All content is plain TypeScript — no CMS, no database.

- **`src/data/site.ts`** — single export `site` with name, email, socials, about paragraphs, and optional headshot path. Edit this to change anything that appears in the header, footer, about, or contact pages.
- **`src/data/photos.ts`** — generated file; do not edit by hand except to reorder array entries or fill in `alt` strings. Run `pnpm photos` to regenerate from `public/photos/`. Alt text is preserved across regenerations.

### Photo pipeline

`scripts/build-photos.ts` (runs via `tsx`) scans `public/photos/`, filters to `.jpg/.jpeg/.png/.webp/.avif`, skips files prefixed with `_` (draft convention), sorts numerically, and writes static imports + a `photos: Photo[]` array to `src/data/photos.ts`. Next.js static imports give each photo intrinsic dimensions and a blur placeholder at build time — this is why the file must be regenerated rather than built at runtime.

When adding photos: resize to ≤2400px long edge, JPEG quality 80–85, sRGB, target <500 KB, drop into `public/photos/`, run `pnpm photos`.

### Styling

Tailwind v4 with CSS-based config — there is no `tailwind.config.ts`. All design tokens live in the `@theme {}` block in `src/app/globals.css`:

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#fafaf8` | page background |
| `--color-fg` | `#1a1a1a` | primary text |
| `--color-muted` | `#6b6b6b` | secondary text, footer |
| `--color-line` | `#e5e5e2` | borders |
| `--font-sans` | `var(--font-inter), …` | body font (Inter injected by next/font at runtime) |
| `--tracking-caps` | `0.15em` | letter-spacing for all-caps labels |

The `.caps` utility class (`text-transform: uppercase; letter-spacing: var(--tracking-caps)`) is used everywhere for nav, footer, and section labels. Prefer `style={{ color: "var(--color-*)" }}` inline when Tailwind's generated class would be awkward; both patterns exist in the codebase.

### Lightbox architecture

The lightbox has a deliberate two-layer split to avoid a CSS timing bug:

- **YARL CSS** (`yet-another-react-lightbox/styles.css` + `plugins/counter.css`) is imported in `Grid.tsx` so it lands in `page.css` and is loaded synchronously with the page. If it were only in `LightboxPanel.tsx` it would be lazy-loaded and images would render at their 2400px natural size on first open before styles apply.
- **YARL JS** (`LightboxPanel.tsx`) is loaded via `next/dynamic` with `ssr: false`. It is always mounted (not inside `{open && ...}`) so the lazy JS preloads as soon as Grid renders.
- **Backdrop** is a `framer-motion` `motion.div` at `z-index: 9998` in `Grid.tsx`. YARL's own backdrop is set to `transparent` via `--yarl__color_backdrop` so framer-motion controls the fade.

### Image optimization

`next/image` serves WebP/AVIF via `/_next/image?url=...` at the correct viewport size. The `sizes` prop on every `<Image>` is `"(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"` matching the 4/3/2/1 column grid breakpoints. Quality is locked to 85 via `next.config.ts` (`qualities: [85]`).

The lightbox passes the static asset URL (`photo.src.src` = `/_next/static/media/…`) directly to YARL, which loads the full-size original. YARL displays it with `object-fit: contain` fitted to the viewport.

### Deployment

Target is Vercel. `pnpm build` must succeed with zero warnings. No environment variables required. The `BASE_URL` (`https://zanehancock.com`) is hardcoded in `src/app/sitemap.ts`, `src/app/robots.ts`, and `src/app/layout.tsx` (`metadataBase`) — update all three when the domain changes.
