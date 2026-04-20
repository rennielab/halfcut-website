# HalfCut

Static website for HalfCut — a bridge between Traditional Owners and the broader public, channelling conservation capital directly to Country.

## Structure

Plain static HTML, CSS and JS. No build step. Deploy as-is.

```
/
├── index.html          Homepage
├── about.html          Origins
├── impact.html         Impact report
├── projects.html       Projects on Country
├── partners.html       Partners
├── team.html           Team & Board
├── journal.html        Journal
├── donate.html         Donate
├── contact.html        Contact
├── assets/
│   ├── system.css      Shared design system (type, colour, components)
│   ├── shell.js        Shared nav, footer, slide-out menu, updates panel
│   ├── *.png / *.avif  Logos, portraits, texture
│   └── ...
└── vercel.json         Hosting config (clean URLs, cache headers)
```

## Local preview

Any static server works. For example:

```
npx serve .
```

Or:

```
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. In Vercel, **New Project → Import** the GitHub repo.
3. Framework preset: **Other** (static). Root directory: `/`. Build command: none. Output: `.`.
4. Deploy.

`vercel.json` enables clean URLs (`/about` instead of `/about.html`) and long-cache headers on `/assets/*`.

## Assets & credits

Photography on the live site is placeholder (Unsplash) pending approved photographs of Kuku Yalanji Country, rangers, and board members.
