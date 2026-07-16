# LUMEN — Photography Portfolio

A timeless, image-first photography portfolio. Built so the photos are the star:
minimal UI, full-bleed imagery, smooth transitions, and a deep gallery-dark
theme (with an optional light/white gallery mode).

Sample content uses a fictional photographer, **Elena Voss**, with imagery from
Unsplash. Swap the data in `src/data/` and you're ready to go.

## Stack

- **Vite** + **React 18** + **TypeScript**
- **React Router** for pages
- Zero UI framework — hand-built CSS design system (`src/styles/global.css`)

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build -> dist/
npm run preview    # preview the build
```

## What's inside

### Design principles
- Images are the hero, minimal chrome
- Full-bleed heroes and edge-to-edge grids
- Dark gallery background by default, toggle to a white gallery
- Serif display type (Cormorant) + clean sans body (Inter)
- Smooth, restrained transitions everywhere (respecting `prefers-reduced-motion`)

### Pages & features
- **Home** — full-screen auto-advancing slideshow (name overlay, nav dots,
  scroll cue) **and** a masonry "selected work" grid + category strip.
- **Gallery / Category** (`/gallery/:slug` — portrait · landscape · commercial ·
  personal) — category hero, sticky subcategory filters, masonry grid, and
  **Load more** paging.
- **Lightbox** — full-screen, arrow + keyboard (←/→, Esc, `i`) + swipe
  navigation, EXIF info on toggle, **Share** (Web Share API / copy link), and
  **Download** or **Purchase** for images marked for sale.
- **About** — large portrait, bio *story*, client logos, awards/publications,
  equipment list, and a philosophy pull-quote.
- **Services** — shoot types with starting prices, sample packages, and a
  booking/inquiry form.
- **Contact** — inquiry form (name, email, shoot type, preferred date, message),
  contact info, studio map embed, and response time.

### Technical
- **Progressive images** — blurred low-res placeholder → full image
  (`ProgressiveImage.tsx`).
- **Lazy loading** via `IntersectionObserver`; heroes load eagerly.
- **Responsive `srcset`/`sizes`** generated in `src/utils/image.ts`.
- **No layout shift** — every image reserves space via `aspect-ratio`.
- **Touch-friendly** gallery + swipeable lightbox.
- **Social sharing** meta tags in `index.html` + per-photo share links.
- **Light/Dark** theme toggle, persisted to `localStorage`.
- SPA rewrites for Netlify (`public/_redirects`) and Vercel (`vercel.json`).

## Customising

| What | Where |
|------|-------|
| Name, contact, socials, studio/map | `src/data/site.ts` |
| Categories & subcategories | `src/data/photos.ts` (`categories`) |
| Photos + EXIF + pricing | `src/data/photos.ts` (`photos`) |
| Colors, type, spacing, motion | `src/styles/global.css` (`:root`) |
| Form submission endpoint | `src/components/InquiryForm.tsx` (`submit`) |

### Using your own images
Replace the Unsplash URLs with your CDN. The helpers in `src/utils/image.ts`
assume a `?w=` width param (Unsplash/Imgix-style). Adjust `withWidth`/`blurSrc`
to match your provider, or point them at pre-generated responsive files.

## Admin panel (edit content without touching code)

The site ships with a built-in admin so you can add/edit content in the browser.

- **Login:** go to `/login` (or click *Admin* in the footer).
  Default credentials — username `admin`, password `portfolio`.
  **Change these** immediately under **Admin → Settings**.
- **What you can edit:**
  - **Photos** — add / edit / delete images, with title, category,
    subcategory, location, year, EXIF, aspect ratio, and for-sale price.
  - **Site & Profile** — name, role, tagline, email, phone, location, studio
    address, Google Maps embed, social links.
  - **About Page** — portrait, headline, bio paragraphs, pull-quote, clients,
    awards, and equipment list.
  - **Services** — hero, service types & prices, and packages.
- **Images:** paste an image URL, an Unsplash photo id (e.g.
  `photo-1544005313-...`), or upload a small file (< 1.5 MB, stored as a data URL).

### How content is stored
All edits are saved to the browser's **localStorage** (key `lumen-content`),
so the site works with no backend. Because of that:

- Content lives **per-browser / per-device**. Use **Settings → Export backup**
  to download a JSON file, and **Import backup** to move it elsewhere or restore.
- Login only hides the editing UI on the client — it is **not real server-side
  security**. Perfect for a personal/demo site. For multi-device access or true
  security, wire a backend or a service like Supabase/Firebase (the content and
  auth are isolated in `src/context/` to make that swap easy).
- Uploaded images as data URLs count against the ~5 MB storage limit; for many
  large photos, host them and paste URLs instead.

### Reset
**Settings → Danger zone → Reset all content** restores the original demo data.

## License
Sample photography via Unsplash (Unsplash License). Code is yours to use.# website-portofolio-photografi
