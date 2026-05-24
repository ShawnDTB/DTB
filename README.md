# DTB Website

A custom business website for **Designed to Breakthrough LLC / DTB Solutions**. The project presents DTB's web design, AI automation, marketing systems, portfolio work, client reviews, blog content, and contact funnel in one branded digital home base.

This website is built as a practical business platform for showcasing services, capturing project inquiries, supporting growth-focused content, and giving potential clients a clear path from discovery to consultation.

## Live Project

- **Website:** https://dtbsolutions.tech
- **Contact:** https://dtbsolutions.tech/contact
- **Services:** https://dtbsolutions.tech/services
- **Portfolio:** https://dtbsolutions.tech/works
- **Blog:** https://dtbsolutions.tech/blog/
- **Reviews:** https://dtbsolutions.tech/reviews

## Current Project Status

The site has evolved from a basic company presence into a more complete service-focused website for DTB's web design, automation, and digital systems work.

Current website updates include:

- Branded homepage for DTB / Designed to Breakthrough
- Dark visual identity with orange accent styling
- Responsive desktop and mobile navigation
- Dedicated services page for web design, automation, and business systems
- Dedicated portfolio page for showcasing completed work
- Blog section for educational and growth-focused content
- About page for brand story and credibility
- Reviews page for social proof
- Contact page with project inquiry form
- Newsletter signup handling from the blog flow
- Cloudflare Workers routing for API form submissions
- Resend-powered email delivery for contact and newsletter submissions
- Static asset build pipeline for Cloudflare deployment

## Website Pages

### Home

The homepage acts as the main entry point for potential clients. It introduces DTB, communicates the company's focus on websites, automation, and growth systems, and directs visitors toward services, portfolio work, and the project inquiry flow.

### Services

The services page outlines the core ways DTB helps businesses improve their digital presence. The focus is on professional websites, automation, marketing systems, and practical technology solutions that support business growth.

### Portfolio

The portfolio page highlights selected work and gives prospective clients a way to understand the style, quality, and range of DTB's digital projects.

### Blog

The blog section supports educational content, business insights, website strategy, automation ideas, and newsletter signups.

### About

The about page explains the DTB brand, mission, and approach behind Designed to Breakthrough LLC.

### Reviews

The reviews page provides client-facing trust signals and social proof for visitors considering a project.

### Contact

The contact page is the main conversion point. Visitors can submit their name, email, phone, company, service interest, budget, timeline, and project message. Submissions are handled by the Cloudflare Worker and sent through Resend.

## Business Focus

DTB is positioned around building practical digital systems for small businesses, creators, and service-based brands.

Core goals:

- Build professional websites that feel custom and conversion-focused
- Help small businesses present themselves with stronger digital credibility
- Create systems that reduce manual work and improve follow-up
- Combine web design, automation, marketing, and infrastructure into one service approach
- Make business technology feel clear, usable, and growth-oriented
- Provide clients with a polished online presence that can evolve over time

## Contact & Newsletter System

The project includes a Cloudflare Worker that handles form submissions before serving static assets.

Current form routes include:

- `POST /api/contact`
- `POST /contact`
- `POST /api/newsletter`
- `POST /newsletter`
- `POST /blog`

The contact form validates that name, email, and message are present before sending the inquiry.

The newsletter form validates that an email address is present before sending the signup notification.

Required Cloudflare environment variables:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
```

Default email values are configured for DTB's inquiry flow if optional email variables are not provided.

## Tech Stack

- **HTML**
- **Tailwind CSS**
- **JavaScript**
- **Node.js**
- **Cloudflare Workers**
- **Cloudflare Workers Assets**
- **Wrangler**
- **Resend**

## Project Structure

```text
DTB/
├── public/
│   ├── index.html
│   ├── about/
│   ├── blog/
│   ├── contact/
│   ├── reviews/
│   ├── services/
│   ├── works/
│   ├── images/
│   └── static/
├── scripts/
│   └── build.js
├── src/
│   └── worker.js
├── package.json
├── wrangler.toml
└── README.md
```

## Local Development

Install dependencies:

```bash
npm install
```

Run the local Cloudflare development server:

```bash
npm run dev
```

Build static assets into `dist/`:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Deploy through Wrangler:

```bash
npm run deploy
```

## Build Process

The build script copies the contents of `public/` into `dist/` for Cloudflare Workers Assets.

During the build, files larger than Cloudflare Workers' 25 MiB asset limit are skipped and listed in the terminal output so oversized assets can be optimized before deployment.

## Deployment Notes

The site is configured for **Cloudflare Workers** with static assets served from the generated `dist/` directory.

The Worker entry point is:

```text
src/worker.js
```

The static asset directory is:

```text
./dist
```

The current Wrangler configuration uses single-page application style fallback behavior for static assets and runs the Worker first for `/api/*` routes.

Recommended deployment flow:

```bash
npm run build
npm run deploy
```

## Future Improvements

Planned or likely future improvements include:

- Continue refining the visual consistency across all pages
- Improve portfolio case studies with stronger project breakdowns
- Add clearer service packages and pricing guidance
- Expand blog content around websites, automation, and small business systems
- Add stronger lead qualification logic to the contact form
- Add spam protection or rate limiting for form submissions
- Add analytics/event tracking for contact and CTA conversions
- Improve image optimization for faster Cloudflare delivery
- Add documentation for DNS, email routing, Resend setup, and Cloudflare environment variables

## Built By

**Designed to Breakthrough LLC**

This project represents DTB's own digital foundation: a business website, service hub, lead capture system, and real-world example of combining web presence, automation, marketing strategy, and Cloudflare-based deployment into one practical platform.
