# DTB Cloudflare Pages conversion

This version removes the Django runtime and exports the public site as static HTML/CSS/assets for Cloudflare Pages. Dynamic form handling is replaced with Cloudflare Pages Functions.

## Cloudflare Pages settings

- Framework preset: None
- Build command: `npm run build`
- Build output directory: `public`
- Root directory: `/`

## Required environment variables

Set these in Cloudflare Pages > Settings > Environment variables:

- `RESEND_API_KEY` - required for contact/newsletter email sending
- `CONTACT_TO_EMAIL` - optional, defaults to `inquire@dtbsolutions.tech`
- `CONTACT_FROM_EMAIL` - optional, defaults to `Website Contact <inquire@send.dtbsolutions.tech>`

## Optional D1 newsletter storage

The newsletter function will save subscribers if you bind a D1 database named `DB`. If no D1 binding exists, it will still redirect successfully and optionally send a welcome email through Resend.

## Removed Django-only features

The public pages were kept. Django auth, admin, profile editing, Django database models, migrations, and server-side blog management were removed because Cloudflare Pages does not run a persistent Django server. Rebuild those features using Cloudflare D1/R2/Workers or a CMS if needed.
