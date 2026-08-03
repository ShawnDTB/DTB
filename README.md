# Designed To Breakthrough

The official website repository for **Designed To Breakthrough LLC (DTB Solutions)**.

DTB builds practical digital systems for small businesses, creators, and growing organizations—bringing websites, automation, infrastructure, support, and growth strategy together under one connected service model.

> **Design. Transform. Breakthrough.**  
> From foundation to flow.

## Project status

This repository contains the current production website and is the primary source of truth for ongoing DTB website development.

- **Repository:** `ShawnDTB/DTB`
- **Primary branch:** `main`
- **Production site:** [dtbsolutions.tech](https://www.dtbsolutions.tech)
- **Deployment target:** Cloudflare Workers with static assets
- **Current release:** Post-redesign production architecture

The earlier DTB website remains preserved separately in the historical repository maintained by Sage Nwanne.

## Brand and product direction

The site is designed to communicate DTB as a connected digital-systems partner rather than a collection of disconnected technical services.

### Core positioning

- Web design and development
- Business automation and workflow improvement
- Computer, network, and infrastructure support
- Hosting, maintenance, and technical operations
- Content, visibility, and digital growth support

### Visual language

- Black and charcoal foundations
- Signature DTB orange
- Metallic-gold depth
- Restrained purple system accents
- Smoked-glass surfaces
- Circuit, grid, and motion-inspired details

### Content standard

The site prioritizes transparency and attributable proof. Testimonials, project examples, metrics, and claims should only be published when they can be verified and appropriately credited.

## Site routes

| Route | Purpose |
| --- | --- |
| `/` | Homepage and primary conversion path |
| `/services/` | Connected service pillars, pricing context, and engagement options |
| `/works/` | Public work, system concepts, and labeled capability examples |
| `/about/` | Company mission, operating principles, and team |
| `/reviews/` | Client feedback, proof, and delivery standards |
| `/blog/` | DTB insights and newsletter signup |
| `/contact/` | Project intake, contact form, and FAQ |
| `/privacy/` | Privacy policy |
| `/terms/` | Terms and conditions |

## Technology

The project uses a lightweight custom static-site build rather than a large frontend framework.

- Semantic HTML
- Shared CSS and JavaScript assets
- Node.js build and validation scripts
- Cloudflare Workers
- Wrangler
- Resend for transactional email and optional audience management

## Repository structure

```text
.
├── public/
│   ├── assets/
│   │   ├── icons.svg
│   │   └── site.js
│   ├── static/
│   │   └── css/
│   │       └── site.css
│   └── */index.html
├── scripts/
│   ├── build.js
│   ├── templates.js
│   └── validate.js
├── src/
│   └── worker.js
├── package.json
└── README.md
```

Source pages live in `public/`. During the build, they are copied into `dist/` and receive the shared site shell from `scripts/templates.js`.

Individual source pages use these placeholders:

```html
<!-- DTB_HEADER -->
<!-- DTB_FOOTER -->
```

The shared navigation and footer should be changed in the template system rather than copied manually into each page.

## Local development

### Requirements

- Node.js 20 or newer recommended
- npm
- A Cloudflare account for Worker preview and deployment

### Install

```bash
 git clone https://github.com/ShawnDTB/DTB.git
 cd DTB
 npm install
```

### Start the local development server

```bash
npm run dev
```

The development command builds the static site and starts a local Wrangler server.

## Available commands

| Command | Description |
| --- | --- |
| `npm run dev` | Build and run the site locally with Wrangler |
| `npm run build` | Generate the production-ready `dist/` output |
| `npm run check` | Build and run repository validation checks |
| `npm run preview` | Build and preview the Worker locally |
| `npm run deploy` | Build and deploy to Cloudflare Workers |

Before committing or deploying substantial changes, run:

```bash
npm run check
```

The validation process checks for:

- Expected routes and shared assets
- Shared header, footer, and stylesheet usage
- Broken local links and missing assets
- Invalid fragment targets
- Known legacy placeholders
- Dead-link patterns

## Forms and Worker routes

The Cloudflare Worker processes contact and newsletter submissions through the following routes:

```text
POST /api/contact
POST /contact
POST /api/newsletter
POST /newsletter
POST /blog
```

Form protection includes:

- Honeypot fields
- Minimum submission timing checks
- Email-format validation
- Field-length validation

## Environment variables

Configure these values in the Cloudflare Worker environment:

```text
RESEND_API_KEY
CONTACT_TO_EMAIL
CONTACT_FROM_EMAIL
RESEND_AUDIENCE_ID
```

`RESEND_AUDIENCE_ID` is optional. When present, Insights subscribers are added to the configured Resend audience. Without it, DTB receives an internal signup notification instead.

Do not commit production keys, secrets, or private customer information to the repository.

## Deployment

Run the complete validation process first:

```bash
npm run check
```

Then deploy:

```bash
npm run deploy
```

The build excludes oversized source assets when they exceed Cloudflare Workers' asset limits.

## Development workflow

The recommended workflow is:

1. Create a focused branch from `main`.
2. Make and test the change locally.
3. Run `npm run check`.
4. Review responsive behavior and forms.
5. Open a pull request or merge only after validation.
6. Deploy from the approved production state.

Suggested branch naming:

```text
feature/short-description
fix/short-description
content/short-description
chore/short-description
```

## Content and trust safeguards

- Publish testimonials only with client approval and clear attribution.
- Clearly distinguish completed client work from concepts or capability demonstrations.
- Do not publish unsupported performance percentages, customer totals, or savings claims.
- Keep incomplete team profiles unpublished or no-indexed.
- Review legal content whenever services, pricing, data handling, or business terms change.
- Never expose customer credentials, private correspondence, or infrastructure secrets.

## Ownership

Designed To Breakthrough LLC is founded and led by **Shawn Dullen**.

This repository is maintained under the `ShawnDTB` GitHub account as the active DTB website codebase.

## License and reuse

Unless a separate license is added, the code, written content, visual identity, brand assets, and business materials in this repository remain proprietary to Designed To Breakthrough LLC. Public repository visibility does not grant permission to reuse DTB branding or client materials.