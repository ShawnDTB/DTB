# DTB Cloudflare Worker Deployment

This version is set up to deploy like the VanillaBeamsTV project style: Git-connected Cloudflare Worker build plus `wrangler deploy`.

## Cloudflare Worker Git Build Settings

Use these settings on the Worker Git deploy screen:

```txt
Build command: npm run build
Deploy command: npx wrangler deploy
Non-production branch deploy command: npx wrangler versions upload
Path: /
```

## What this project does

- `public/` contains the exported DTB website pages and static assets.
- `scripts/build.js` copies `public/` into `dist/`.
- `src/worker.js` serves the static site through Cloudflare Workers Assets.
- `src/worker.js` also handles:
  - `POST /api/contact`
  - `POST /api/newsletter`

## Required Cloudflare variables/secrets

Add these to the Worker project settings:

```txt
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

Recommended values:

```txt
CONTACT_TO_EMAIL=inquire@dtbsolutions.tech
CONTACT_FROM_EMAIL=Website Contact <inquire@send.dtbsolutions.tech>
```

## Local commands

```bash
npm install
npm run build
npm run dev
```

## Deploy command

```bash
npm run deploy
```


## Large video asset note

Cloudflare Workers static assets have a 25 MiB per-file limit. The original `Empowering-our-clients.mp4` file was about 86 MiB, so it was removed from this deployable Worker package. Host that video externally through Cloudflare R2, Stream, YouTube/Vimeo, or another storage URL, then replace the project button/link in `public/works/index.html` with that URL.

The build script also skips any future files over 25 MiB so `wrangler deploy` will not fail for the same reason.
