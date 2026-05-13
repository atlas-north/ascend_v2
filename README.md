# AtlasAscend

Marketing website and CMS for AtlasAscend — custom AI agents for businesses, live in 7 days.

**Stack:** Next.js 14 · Payload CMS v2 · Tailwind CSS 3 · PostgreSQL (Neon) · Vercel

---

## First-run setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Neon database

1. Go to [neon.tech](https://neon.tech) and create a new project
2. Copy the **connection string** from the Neon dashboard (it looks like `postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require`)

### 3. Configure environment variables

Create `.env.local` in the project root:

```bash
# Neon PostgreSQL connection string
DATABASE_URI=postgresql://user:pass@ep-xxx.neon.tech/neondb?sslmode=require

# Random 32-character secret — used by Payload to sign tokens
# Generate one with: openssl rand -base64 32
PAYLOAD_SECRET=your-32-char-secret-here

# Public site URL (no trailing slash)
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### 4. Run database migrations

Creates all Payload CMS tables in your Neon database:

```bash
npm run payload:migrate
```

### 5. Start the development server

```bash
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).
The Payload admin UI runs at [http://localhost:3000/admin](http://localhost:3000/admin).

### 6. Create the first admin user

Visit `/admin` and follow the prompts to create your admin account. This is the account used to publish articles, cases, and campaigns.

### 7. Add hero images

The site references the following images in `/public/images/`. Generate them with FLUX (prompts in the spec) and place them here before deploying:

| Filename | Used on |
|---|---|
| `hero-home.jpg` | Home page hero |
| `hero-how-it-works.jpg` | How it works page |
| `hero-capabilities.jpg` | Capabilities page |
| `hero-cases.jpg` | Cases index + case fallback |
| `hero-intelligence.jpg` | Intelligence index |
| `hero-about.jpg` | About page |
| `hero-book.jpg` | Book page |
| `portrait-jonas.jpg` | About page, article author block |

All images should be **1920×1080** (16:9) except `portrait-jonas.jpg` which is **800×1000**.

---

## Deployment (Vercel + Neon)

### 1. Push to GitHub

```bash
git remote add origin https://github.com/your-org/atlasascend.git
git push -u origin main
```

### 2. Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new) and import the repository
2. Framework preset: **Next.js** (auto-detected)
3. Add the following environment variables in the Vercel dashboard:

```
DATABASE_URI        → your Neon production connection string
PAYLOAD_SECRET      → same 32-char secret as .env.local (or generate a new one)
NEXT_PUBLIC_SITE_URL → https://atlasascend.ai
```

4. Deploy

### 3. Run migrations in production

After the first deploy, run migrations against the production database once:

```bash
DATABASE_URI=postgresql://... npm run payload:migrate
```

Or trigger it via a Vercel build command by temporarily setting:
```
Build Command: npm run payload:migrate && next build
```

Then revert to the standard `next build` build command after the first deploy.

---

## Project structure

```
atlasascend/
├── src/
│   ├── app/
│   │   ├── (site)/                 # Public site — inherits Nav + Footer
│   │   │   ├── layout.tsx          # Wraps all (site) pages with Nav / Footer
│   │   │   ├── page.tsx            # / Home
│   │   │   ├── how-it-works/
│   │   │   ├── capabilities/
│   │   │   ├── cases/
│   │   │   │   └── [slug]/
│   │   │   ├── about/
│   │   │   ├── intelligence/
│   │   │   │   └── [slug]/
│   │   │   └── book/
│   │   ├── campaigns/
│   │   │   └── [slug]/             # Conversion pages — minimal nav/footer only
│   │   └── layout.tsx              # Root layout — Inter font, globals.css
│   ├── collections/                # Payload CMS collection definitions
│   │   ├── Articles.ts
│   │   ├── Cases.ts
│   │   ├── Campaigns.ts
│   │   └── Media.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx             # Sticky site nav with mobile hamburger
│   │   │   └── Footer.tsx
│   │   ├── sections/               # Page-level section components
│   │   │   ├── Hero.tsx            # full / medium / short height variants
│   │   │   ├── StatsBar.tsx
│   │   │   ├── CardGrid.tsx
│   │   │   ├── CaseCard.tsx
│   │   │   ├── ArticleCard.tsx
│   │   │   ├── CasesGrid.tsx       # Client component — filter bar + grid
│   │   │   ├── CampaignHero.tsx    # Minimal nav + full-height hero (campaigns)
│   │   │   ├── CtaSection.tsx      # dark / light variant
│   │   │   └── FaqAccordion.tsx    # Native <details> accordion
│   │   └── ui/                     # Atomic components
│   │       ├── Button.tsx          # primary / secondary / outline × sm / md / lg
│   │       ├── EyebrowLabel.tsx
│   │       ├── AnimateIn.tsx       # IntersectionObserver fade-in
│   │       └── RichText.tsx        # Lexical JSON → React renderer
│   ├── lib/
│   │   └── getPayload.ts           # Payload local API singleton
│   ├── payload.config.ts
│   └── styles/
│       ├── globals.css
│       └── tokens.css              # All CSS custom properties
├── public/
│   └── images/                     # Hero images (add before deploying)
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
└── package.json
```

---

## CMS collections

All content is managed via the Payload admin at `/admin`.

### Articles (Intelligence / What Moves)

| Field | Notes |
|---|---|
| `title` | Required |
| `slug` | Auto-generated from title; URL-safe |
| `status` | `draft` or `published` |
| `publishedAt` | Date/time — shown on cards and article pages |
| `category` | Automation / Intelligence / Integration / Strategy / Platform |
| `teaser` | Max 160 chars — used in card previews |
| `heroImage` | Upload → Media |
| `body` | Lexical rich-text (headings, body, blockquote, images, lists) |
| `seo` | metaTitle, metaDescription, ogImage |

### Cases

| Field | Notes |
|---|---|
| `clientName` | Used in breadcrumb and metadata |
| `industry` | E-commerce / Legal / SaaS / Finance / Operations / Other |
| `headline` | e.g. "14 hours saved per week" |
| `slug` | Auto-generated from clientName |
| `status` | `draft` or `published` |
| `tags` | Array of automation / intelligence / integration |
| `resultMetric` | e.g. "14 hrs/week saved" — displayed prominently |
| `heroImage` | Upload → Media |
| `body` | Lexical rich-text |
| `testimonialQuote` | Optional — renders blockquote block on case page |
| `testimonialAuthor` | Optional attribution |
| `seo` | metaTitle, metaDescription |

### Campaigns

| Field | Notes |
|---|---|
| `title` | Internal label only |
| `slug` | Becomes `/campaigns/[slug]` |
| `status` | `draft` / `published` / `archived` |
| `vertical` | E-commerce / Legal / SaaS / Finance / Operations / General |
| `heroHeadline` | Shown in the campaign hero |
| `heroSubheading` | Shown below hero headline |
| `painPoints` | Array of `{ title, description }` — max 3 |
| `ctaLabel` | Default: "Book a free consultation" |
| `urgencyNote` | Optional — e.g. "2 spots available this month" |
| `seo` | metaTitle, metaDescription |

### Media

Accepted formats: JPEG, PNG, WebP.
Three image sizes are generated automatically:
- `thumbnail` — 400px wide
- `card` — 800px wide
- `hero` — 1920px wide

Alt text is required on every upload.

---

## Calendly integration

The `/book` page contains a Calendly placeholder. To activate it:

1. Log in to [calendly.com](https://calendly.com)
2. Go to **Event Types** → your 30-minute event → **Add to website**
3. Choose **Inline embed** and copy the widget code
4. In `src/app/(site)/book/page.tsx`, find the `{/* TODO: Replace... */}` comment block
5. Replace the placeholder `<div>` and the comment with the Calendly embed code

---

## Adding a campaign

1. Go to `/admin` → **Campaigns** → **Create new**
2. Fill in: title (internal), slug, vertical, heroHeadline, heroSubheading, pain points (up to 3), ctaLabel, urgencyNote (optional)
3. Set status to **Published**
4. The page is live at `/campaigns/[your-slug]`

Campaign pages are excluded from search indexing (`noindex`) — they are intended for paid traffic.

---

## Scripts

```bash
npm run dev              # Start development server
npm run build            # Production build
npm run start            # Start production server
npm run payload:migrate  # Run Payload database migrations
npm run lint             # ESLint
```

---

## Design system

All design tokens are defined as CSS custom properties in `src/styles/tokens.css` and extended into Tailwind via `tailwind.config.ts`.

**One accent colour only:** `#1d9e75` (`var(--color-accent)`). Used sparingly — result metrics, category tags, link hovers, bullet dots.

**No font weight above 500** anywhere on the site.

**Sentence case on all headings.** Never title case. Never all caps except eyebrow labels.

---

## Environment variables reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URI` | Yes | Neon PostgreSQL connection string |
| `PAYLOAD_SECRET` | Yes | 32-char random string for Payload token signing |
| `NEXT_PUBLIC_SITE_URL` | Yes | Full site URL, no trailing slash |
