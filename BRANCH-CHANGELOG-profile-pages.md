# DTB Profile Pages Branch Package

This package is meant to be applied to a separate branch before merging into `main`.

## Included updates

- Adds/updates `/shawn` and `/sage` profile pages with DTB-aligned styling.
- Keeps profile pages business-first with resume-inspired sections and placeholder-safe personal/social areas.
- Adds Shawn and Sage profile cards to the `/works` portfolio grid.
- Updates Worker email fallbacks to use the verified `dtbsolutions.tech` sender domain.
- Keeps Cloudflare Worker static asset routing set to run Worker first only for `/api/*`.
- Adds basic visible contact form success/error messaging for `?sent=1` and `?error=...` redirects.
- Adds `/shawn` and `/sage` entries to the sitemap.

## Suggested branch workflow

```cmd
git checkout main
git pull origin main
git checkout -b profile-pages-polish
```

Copy these files into the repo, then run:

```cmd
npm run build
npx wrangler dev
```

Preview:

```txt
http://localhost:8787/shawn
http://localhost:8787/sage
http://localhost:8787/works
http://localhost:8787/contact
```

Commit:

```cmd
git add .
git commit -m "Polish DTB profile pages and contact flow"
git push -u origin profile-pages-polish
```
