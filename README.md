# HalfCut Website

The public site for HalfCut Limited (ABN 24 642 788 814), a First Nations-led conservation charity working in partnership with the Eastern Kuku Yalanji Bama people via Jabalbina Yalanji Aboriginal Corporation.

## Stack

| Layer | Choice | Why |
|---|---|---|
| Frontend | **Astro 5** | Static-HTML output, zero JS by default, lightest carbon profile |
| CMS | **Sanity** | Schema-driven content modelling, required-field validation, image pipeline |
| Hosting | **Vercel** | Existing account, edge-cached static |
| Fonts | **Self-hosted (@fontsource)** | No Google Fonts CDN, no third-party DNS at runtime |
| Analytics | **Vercel Analytics (cookieless)** | Built-in, no third-party tracker |
| Carbon proof | **Performance API → footer disclosure** | Honest per-visit bytes + CO₂ estimate |

## Local development

```bash
bun install
bun run dev            # Astro public site on http://localhost:4322
bun run studio         # Sanity Studio on http://localhost:3333 (after first init)
```

You'll need a `.env` file. Copy `.env.example`:

```bash
cp .env.example .env
# fill in SANITY_PROJECT_ID after creating the project below
```

## First-time Sanity setup

```bash
cd studio
bun install
bunx sanity init --bare              # creates a new Sanity project, prompts for name
# copy the projectId it prints into the root .env (SANITY_PROJECT_ID=...)
bunx sanity deploy                    # publishes the studio to halfcut.sanity.studio
```

Studio URL after deploy: `https://halfcut.sanity.studio`

## Content integrity guardrails

Built into the schemas so content drift can't ship silently:

- **Board members** only render on the public site when `quoteApproved == true`. Set this manually after each director signs off on their bio, quote, and portrait.
- **Partners** only render when `verified == true`. Default off so unverified logos never accidentally appear.
- **Impact metrics** require `source`, `sourceUrl`, and `asOf` (date verified). Claims without public sources cannot be saved.
- **Field Note authors** must be a reference to a real `author` or `boardMember` document — string attribution is not allowed.
- **Acknowledgment of Country** is required on `siteSettings` with min length, blocking publish until populated and Jabalbina-reviewed.

Anywhere a Sanity field would otherwise produce nothing on the public site, a `Placeholder` component renders an explicit "awaiting content" panel so missing content is visible rather than silently absent.

## Deploy

On Vercel:

1. Connect this GitHub repo (`rennielab/halfcut-website`).
2. Framework auto-detected as Astro.
3. Set environment variables:
   - `SANITY_PROJECT_ID` (from Sanity)
   - `SANITY_DATASET` (default `production`)
4. Set up a Sanity webhook (Studio → API → Webhooks) pointing at your Vercel Deploy Hook so content edits trigger a rebuild.

## Brand discipline

- No em-dashes in user-facing copy
- No italics anywhere
- Acid green is exactly `#EBFC73` (never `#C6FF3D`)
- Photography must be real (no Unsplash on production — schemas require alt text on every image)

## Carbon target

Under 500KB per page on first load. Current build is well within that; the footer badge displays the live measurement on every page.
