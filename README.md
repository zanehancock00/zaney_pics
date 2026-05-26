# zaney-pics

A minimal photography portfolio built with Next.js 15, Tailwind CSS v4, and TypeScript. Three pages — Stills (home grid), About, Contact — and a clean lightbox. No CMS, no database; the photo list is a plain TypeScript array you curate by hand.

---

## Quick start

```bash
pnpm install
pnpm photos    # generates src/data/photos.ts from public/photos/
pnpm dev       # http://localhost:3000
```

---

## How to add photos

1. Drop JPEG/PNG/WebP/AVIF files into `public/photos/`.
2. Run `pnpm photos` to regenerate `src/data/photos.ts`.
3. Commit both the images and the updated data file.

**Staging drafts:** prefix a filename with `_` (e.g. `_draft-sunset.jpg`) and the script will skip it until you rename it.

---

## How to reorder photos

After `pnpm photos` generates the file, open `src/data/photos.ts` and move entries within the `photos` array to your liking.

> **Gotcha:** the next time you run `pnpm photos` without `--keep-order`, the array will be re-sorted alphabetically and your manual order will be lost. To avoid this:
>
> ```bash
> pnpm photos --keep-order
> ```
>
> With `--keep-order` the script keeps existing entries in their current position and appends new files at the end.

**Alt text** is always preserved on re-runs — fill in `alt` strings for accessibility and they will survive regeneration.

---

## How to change name / email / socials

Edit `src/data/site.ts`:

```ts
export const site = {
  name: "YOUR NAME",
  email: "you@example.com",
  socials: [
    { label: "IG", href: "https://instagram.com/yourhandle" },
  ],
  about: ["Bio paragraph one.", "Bio paragraph two."],
  headshot: "/headshot.jpg", // or null to hide
};
```

---

## Image guidelines

| Property | Target |
|---|---|
| Format | JPEG (sRGB), PNG, WebP, or AVIF |
| Long edge | ≤ 2400 px |
| Color profile | sRGB |
| JPEG quality | 80–85 |
| File size | < 500 KB per image |

Images larger than these targets will still work but will slow down the build and increase CDN costs.

---

## Deploy to Vercel

1. Push the repo to GitHub.
2. In [Vercel](https://vercel.com), click **Add New → Project** and import the repo.
3. Set **Framework Preset** to **Next.js** and **Node.js version** to **20.x**.
4. No environment variables are required.
5. Click **Deploy**.

**Custom domain:**
- In Vercel → Project → Settings → Domains, add your domain.
- At your DNS provider, add a `CNAME` record pointing `www` (or `@` as an A record using Vercel's IP) to `cname.vercel-dns.com`.
- Update the `BASE_URL` in `src/app/sitemap.ts` and `src/app/robots.ts` to match.

---

## Run Lighthouse locally

```bash
pnpm build && pnpm start
# In a separate terminal or browser:
# Open http://localhost:3000, then run Chrome DevTools → Lighthouse (mobile preset)
```

Targets: Performance ≥ 95 · Accessibility ≥ 95 · Best Practices 100 · SEO ≥ 95

---

## Sample images

The 20 images in `public/photos/` are placeholder photographs from [Picsum Photos](https://picsum.photos) (sourced from Unsplash). Replace them with your own work before publishing. If you redistribute this repo, remove or replace the sample images and acknowledge the Unsplash license as applicable.
