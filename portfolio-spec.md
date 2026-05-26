# Photography Portfolio — Build Spec

A spec for Claude Code to build a modern, minimal photography portfolio in the style of [victorperezpelayo.com/stills](https://victorperezpelayo.com/stills/). Read this top to bottom; every section is part of the deliverable.

---

## 1. Goal & Aesthetic

Build a single-page-feel photography portfolio that gets out of the way of the images. The reference site is the design north star: tiny all-caps navigation, no chrome, lots of whitespace, photos at large sizes, near-zero ornament.

Vibe checklist:

- Quiet, editorial, monochrome. Off-white background, near-black text. No drop shadows, no gradients, no rounded corners on images.
- Type-light: one sans-serif, three sizes max. All-caps for nav and section labels with generous letter-spacing.
- Images are the only color. UI is greyscale.
- The grid feels effortless — uniform gutters, mixed aspect ratios laid out cleanly, no captions or hover labels cluttering the surface.
- Fast. Pages should feel instant on a phone over LTE.

Reference: https://victorperezpelayo.com/stills/

---

## 2. Tech Stack (fixed)

- **Framework:** Next.js 15+ (App Router, TypeScript, React Server Components).
- **Styling:** Tailwind CSS v4. No CSS-in-JS, no component library.
- **Images:** `next/image` with the default loader. Source images live in `/public/photos/` and are referenced by static imports so Next can statically compute dimensions and blur placeholders at build time.
- **Content:** Plain TypeScript data files. No CMS, no markdown, no database. The photo list is an exported array.
- **Animation (minimal):** `framer-motion` only for the lightbox open/close fade. Nothing else animates.
- **Lightbox:** `yet-another-react-lightbox` (zero-dep, accessible, swipe-on-mobile). Configure with the Counter and Zoom plugins only.
- **Fonts:** `next/font` with **Inter** (variable). One typeface, that's it.
- **Linting:** ESLint with `next/core-web-vitals`, Prettier with `prettier-plugin-tailwindcss`.
- **Node:** 20 LTS.
- **Package manager:** pnpm.

Do not add: shadcn/ui, Headless UI, Radix, Framer's full feature set, a markdown renderer, Contentlayer, MDX, Sanity, or any analytics SDK. Keep dependencies minimal.

---

## 3. Pages

Three pages. That's the whole site.

### 3.1 `/` — Stills (home)

- The landing page IS the gallery. No hero, no intro copy, no "featured" carousel.
- A small fixed header (see §4) sits above the grid.
- Below the header: a single continuous grid of all photos in the order defined by `photos.ts`. No filters, no tags, no categories.
- Clicking a photo opens it in a lightbox (see §5). The lightbox supports keyboard arrows, swipe on mobile, and closes on Esc / backdrop click.
- Minimal footer (see §4).

### 3.2 `/about`

- Single column, max-width ~640px, centered, generous vertical padding.
- Optional headshot at top (square or 4:5, max 320px wide).
- 2–4 short paragraphs of bio / artist statement. Copy is a placeholder for now (see §8).
- Same header and footer as `/`.

### 3.3 `/contact`

- Single column, centered, max-width ~480px.
- One line of intro copy ("For prints, commissions, or just to say hi.").
- Big `mailto:` link with the email address.
- Three small social links below (Instagram, anything else the user adds later). Text links only, no icons.
- No form. No reCAPTCHA. No newsletter signup.

---

## 4. Layout: Header & Footer

### Header (every page)

- Fixed to top, full width, ~56px tall, background matches page (off-white) with a 1px bottom border in `--color-line` only when scrolled (use `IntersectionObserver` or a scroll listener — keep it tiny).
- Left: the photographer's name in small caps, tracking-wide, as a link to `/`. Treat the name as the logo.
- Right: nav links — `STILLS`, `ABOUT`, `CONTACT`. All caps, ~12px, letter-spacing ~0.15em.
- Active route gets a subtle underline (`text-decoration: underline; text-underline-offset: 4px`).
- On mobile (<640px): same layout but tighter; no hamburger needed — the nav fits.

### Footer (every page)

- ~80px tall, centered text, all caps, ~11px.
- Line 1: contact email as a `mailto:` link.
- Line 2: social links separated by spaces, e.g. `[IG]  [FB]  [YT]`.
- Line 3: `© {year} {name}`.

---

## 5. The Grid

This is the most important part of the build. Get this right.

### Behavior

- **Layout:** CSS columns-based masonry (`column-count` + `break-inside: avoid`). Do NOT use a JS masonry library — CSS columns handle mixed aspect ratios fine for this use case and need zero JS.
- **Column counts:**
  - `< 640px`: 1 column
  - `640–1024px`: 2 columns
  - `1024–1536px`: 3 columns
  - `≥ 1536px`: 4 columns
- **Gutter:** 12px on mobile, 16px on tablet, 24px on desktop.
- **Container:** max-width 1600px, horizontal padding 16/24/32px responsive, top padding 72px (to clear header), bottom padding 96px.
- **Image rendering:**
  - Use `next/image` with `sizes="(min-width: 1536px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"`.
  - Each photo's intrinsic width/height comes from the static import (Next computes it at build time).
  - `quality={85}`. `placeholder="blur"` (Next generates the blur data URL automatically for static imports).
  - No `priority` on any image — let Next lazy-load everything below the fold. Optionally set `priority` on the first 4 images only.
  - Tag: `<Image ... className="w-full h-auto mb-3 md:mb-4 lg:mb-6 cursor-zoom-in" />`.
- **Order:** Render in the exact order of the `photos` array. The user curates by reordering that file.

### Empty state

If `photos` is empty, render a centered line of caps text: `NO STILLS YET`. Don't break the layout.

---

## 6. Lightbox

- Trigger: click any thumbnail.
- Library: `yet-another-react-lightbox` (`yet-another-react-lightbox/styles.css`).
- Backdrop: 95% opaque off-black (`rgba(20,20,20,0.96)`).
- Show counter (`3 / 47`) bottom-center, small caps, low opacity.
- Show prev/next arrows on desktop hover; hide on mobile (rely on swipe).
- Esc closes. Arrow keys navigate. Backdrop click closes.
- No captions, no thumbnails strip, no zoom-in beyond fit (Zoom plugin with `maxZoomPixelRatio={1}` so it shows the image at its natural size, no further).
- Disable scroll on `<body>` while open.

---

## 7. Design Tokens

Put these in `tailwind.config.ts` (or `globals.css` via Tailwind v4's `@theme`):

```
--color-bg:    #FAFAF8   /* off-white page background */
--color-fg:    #1A1A1A   /* near-black text */
--color-muted: #6B6B6B   /* secondary text, footer */
--color-line:  #E5E5E2   /* hairline borders */
--color-lightbox: rgba(20,20,20,0.96)

--font-sans:  Inter, ui-sans-serif, system-ui, sans-serif

--tracking-caps: 0.15em
```

Type scale (rem):

- `text-xs` 0.6875 — nav, footer
- `text-sm` 0.875 — body
- `text-base` 1 — about copy
- `text-lg` 1.125 — about heading
- No `h1` larger than 1.5rem anywhere. This site does not shout.

Global rules:

- `body` uses `bg-[--color-bg] text-[--color-fg] font-sans antialiased`.
- All caps utility: `.caps { text-transform: uppercase; letter-spacing: var(--tracking-caps); }`.
- Selection color: subtle grey, not blue.
- No rounded corners on images. Buttons (mailto) use no background — underlined text only.

---

## 8. Content & Data

### `src/data/site.ts`

```ts
export const site = {
  name: "ZANE HANCOCK", // placeholder — easy to change
  email: "hello@example.com",
  socials: [
    { label: "IG", href: "https://instagram.com/" },
    // user can add more
  ],
  about: [
    "Placeholder bio paragraph one.",
    "Placeholder bio paragraph two.",
  ],
  headshot: null as string | null, // path under /public, or null to hide
};
```

### `src/data/photos.ts`

```ts
import type { StaticImageData } from "next/image";
import p001 from "../../public/photos/001.jpg";
// ...one import per photo

export type Photo = {
  src: StaticImageData;
  alt: string;
};

export const photos: Photo[] = [
  { src: p001, alt: "" },
  // user reorders this array to curate the grid
];
```

Generate `photos.ts` automatically with a build-time script `scripts/build-photos.ts` that scans `public/photos/`, sorts filenames, and writes the import block + array. Run it via `pnpm photos` and also as a `prebuild` hook. This means: drop a JPEG into `public/photos/`, run `pnpm photos`, done.

The script must:

- Only include `.jpg`, `.jpeg`, `.png`, `.webp`, `.avif`.
- Skip anything starting with `_` (so the user can stage drafts).
- Preserve numeric-aware sort (`002` before `010`).
- Preserve any existing manual `alt` text by reading the previous `photos.ts` and merging by filename.

---

## 9. Performance Requirements

This is a photography site — performance is part of the design.

- Lighthouse mobile: Performance ≥ 95, Accessibility ≥ 95, Best Practices = 100, SEO ≥ 95.
- LCP (4G mobile, home page): < 2.0s.
- CLS: < 0.05. Every image must have explicit dimensions (static imports give you this for free).
- No layout shift when the lightbox opens — use `overflow-hidden` + `padding-right` compensation for the scrollbar.
- Total JS shipped on `/`: < 100 KB gzipped. (Lightbox lazy-loads; about/contact ship near-zero JS.)
- Originals in `public/photos/` should be max 2400px on the long edge, sRGB, quality 80–85. Document this in the README.

---

## 10. Accessibility

- All interactive elements reachable by keyboard.
- Thumbnails are `<button>`s wrapping the `<Image>`, not anchor tags. `aria-label` = `Open image {n} of {total}`.
- Lightbox traps focus (the library handles this; verify).
- Color contrast: text on bg = 16:1 (we're already near black-on-white).
- Respect `prefers-reduced-motion`: disable framer-motion fade, use instant open.
- `<html lang="en">`. Each page has a unique `<title>` and `<meta name="description">`.
- Skip-to-content link: skip; the grid IS the content.

---

## 11. SEO & Metadata

- `metadata` export on each route (Next 15 metadata API).
- Home: title `{NAME} — Stills`, description `Photographs by {NAME}.`
- Open Graph: site name, type `website`, image = first photo in `photos.ts` rendered at 1200×630 via `opengraph-image.tsx` (use the first photo as background, name overlaid in caps bottom-left).
- `robots.txt` allowing all. `sitemap.xml` generated via `next-sitemap` or a hand-rolled route handler — the latter is fine, three URLs.
- Favicon: a black square with a single white character (the user's initial). Generate as 32×32 and 180×180 (apple-touch-icon). Use a placeholder in `/public` and document how to swap.

---

## 12. File Structure

```
.
├── public/
│   ├── photos/                 # source images (gitignored if large; see README)
│   └── favicon.ico
├── scripts/
│   └── build-photos.ts         # scans public/photos and writes data/photos.ts
├── src/
│   ├── app/
│   │   ├── layout.tsx          # header + footer + font + global metadata
│   │   ├── page.tsx            # home (grid)
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── globals.css
│   │   └── opengraph-image.tsx
│   ├── components/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── Grid.tsx            # client component, owns lightbox state
│   │   └── GridImage.tsx
│   └── data/
│       ├── site.ts
│       └── photos.ts           # generated, but committed
├── .eslintrc.json
├── .prettierrc
├── next.config.ts
├── package.json
├── pnpm-lock.yaml
├── postcss.config.mjs
├── tailwind.config.ts
├── tsconfig.json
└── README.md
```

---

## 13. README (deliverable)

The README must include:

1. One-paragraph project description.
2. Quick start: `pnpm install`, `pnpm photos`, `pnpm dev`.
3. **How to add photos** — drop files in `public/photos/`, run `pnpm photos`, commit. Mention the `_` prefix for drafts.
4. **How to reorder** — edit `src/data/photos.ts` after generation; the generator preserves manual edits to `alt` text but will re-sort on next run unless you commit the array order (call out this gotcha and offer a `--keep-order` flag on the script).
5. **How to change name/email/socials** — edit `src/data/site.ts`.
6. **Image guidelines** — JPEG, 2400px long edge, sRGB, quality 80–85, file size target < 500 KB each.
7. **Deploy to Vercel** — push to GitHub, import in Vercel, set Node 20, no env vars needed, custom domain instructions.
8. **Local Lighthouse** — `pnpm build && pnpm start` then run Lighthouse against `http://localhost:3000`.

---

## 14. Deployment

- Target: Vercel.
- `pnpm build` must succeed with zero warnings.
- No environment variables required.
- `next.config.ts`:
  - `images.formats: ['image/avif', 'image/webp']`
  - `images.minimumCacheTTL: 31536000`
  - No remote patterns (all images local).
- Custom domain: README documents adding the domain in Vercel + the CNAME record. Do not configure the domain in code.

---

## 15. Acceptance Criteria

The build is done when ALL of these are true:

1. `pnpm install && pnpm photos && pnpm dev` works on a fresh clone with the sample images included.
2. Dropping a new JPEG into `public/photos/` and running `pnpm photos` adds it to the grid without any other edits.
3. The three pages render correctly and match the aesthetic described in §1.
4. Clicking any thumbnail opens the lightbox; arrows, swipe, Esc, and backdrop click all work.
5. Lighthouse mobile on the home page hits the budgets in §9 with the sample image set (include ~20 sample images, each ≤500KB).
6. No console errors or warnings in dev or prod.
7. `pnpm lint` and `pnpm typecheck` (alias for `tsc --noEmit`) both pass.
8. The site looks correct at 320px, 640px, 1024px, 1440px, and 2560px wide.
9. Keyboard-only navigation works end to end.
10. README covers everything in §13.

---

## 16. Sample Images

Include 18–24 sample photos in `public/photos/` so the site renders meaningfully on first clone. Use placeholder photographs from a public-domain source (Unsplash with Unsplash License notes in the README, or generate solid-color rectangles of varied aspect ratios labeled `001.jpg`–`024.jpg` as a fallback). The user will replace these with their own work.

---

## 17. Out of Scope (do not build)

- CMS, admin UI, image upload form
- Tagging, categories, filtering, search
- Multiple gallery pages or series
- Blog, journal, news section
- Print store, e-commerce, Stripe
- Newsletter signup, contact form
- Analytics, cookie banner
- Dark mode toggle (the site is already light and quiet; one mode is the point)
- Internationalization
- Any animation beyond the lightbox fade

If the user later wants any of these, that's a follow-up spec.

---

## 18. Hand-off Instructions for Claude Code

Run this spec from the repo root of an empty directory. Build in this order:

1. Scaffold Next.js + Tailwind + TS with pnpm.
2. Set up Inter, design tokens, globals.
3. Build `Header` and `Footer` and `layout.tsx`.
4. Drop sample images into `public/photos/`. Write `scripts/build-photos.ts`. Run it.
5. Build the `Grid` + `GridImage` components, no lightbox yet.
6. Add the lightbox.
7. Build `/about` and `/contact`.
8. Metadata, OG image, favicon placeholder.
9. Write the README.
10. Run `pnpm lint`, `pnpm typecheck`, `pnpm build`, and a local Lighthouse pass. Fix anything that misses the §9 budgets.
11. Commit in logical chunks. Don't squash everything into one commit.
