# jamesburchill.com

Personal website for James Burchill: Systems Architect, Entrepreneur, and
Bestselling Author & Instructor, with a balanced introduction to his systems work,
products, writing, and frameworks. GitHub Pages publishes this repository at
[https://jamesburchill.com/](https://jamesburchill.com/).

## Contents

- `index.html`: professional introduction, biography, work/writing links, and contact.
- `redesign.css`: current shared navy/teal editorial design system.
- `styles.css`, `warm-theme.css`: retained earlier presentation assets. The four current pages use `redesign.css`, with `blind-squirrel-method/book.css` for the book layout. Icons, manifest, and `img/` hold site assets.
- `games/spaceshooter/`: browser game with its own README.
- `parkedproject/`: existing project page and assets.
- `mcp/`: public MCP connection guide, including Claude custom-connector steps.
- `mcp/privacy/`: privacy policy scoped to the public MCP service.
- `driftinel/`: redirect to the standalone product site.
- `blind-squirrel-method/`: ungated book page, titled cover and the PDF compiled from Scrivener.

The homepage gives Systems Architect, Entrepreneur, and Bestselling Author & Instructor
equal prominence. Its systems/entrepreneurship section introduces JMG, Driftinel,
Telemetry Sentinel, and BaileyBot, followed by substantial links to The Vault and
Because Drift Happens. A navy strip links to the existing public MCP guide.
Warm-white reading surfaces, midnight navy, deep teal on light backgrounds, and
bright teal on navy connect the personal identity with JMG. James's real portrait
and serif name/heading treatment retain the site's personal, editorial character.

The homepage no longer has a book/course portfolio section. The existing free
book page, artwork, PDF download, resource links, routes, redirects, and MCP
connection remain available. The book is also linked in the expanded biography.
Commercial enquiries go to JMG; direct personal correspondence goes to James.
The About section retains James's JMG and Tooljar roles and teaching background.

## Driftinel website separation

The standalone marketing source now lives in
[`jamesburchill/driftinel-website`](https://github.com/jamesburchill/driftinel-website),
with its own GitHub Pages deployment and `driftinel.com` custom-domain setting.
Both website and application source repositories are private; GitHub Pages serves
the marketing website publicly. The application source remains in
`jamesburchill/driftinel`.
Maintain product copy and navigation in the standalone website repository after
cutover. Its deployment guide records DNS, verification, and recovery.

The routing cutover points `driftinel.com` directly at the standalone Pages site.
The main domain passes HTTPS verification and enforces HTTPS. This repository's
`/driftinel/` page redirects there, with a visible fallback link; browser redirects
preserve query strings and fragment identifiers. The destination retains the
existing feature-card IDs. Product styles live in the standalone website
repository; the redirect needs no stylesheet. No game or other personal-site
content moves to the product repo.

## Local preview

From the repository root:

```sh
python3 -m http.server 8767 --bind 127.0.0.1
```

Open [the personal site](http://127.0.0.1:8767/) or
[the former product page](http://127.0.0.1:8767/driftinel/).
The site uses static HTML, CSS, and JavaScript without dependency installation.

## Publishing

The book page is at `https://jamesburchill.com/blind-squirrel-method/`. The separate
`blindsquirrelmethod.com` domain forwards to this page; it does not replace the
site's GitHub Pages custom domain. Use permanent forwarding without masking.
The PDF download requires no registration. The editable book source is
`/Users/jamesburchill/clients/000/projects/blind-squirrel-method/manuscript/The Blind Squirrel Method.scriv`.
Compile that project using PDF and the project format
`The Blind Squirrel Method — Shareable PDF`, then replacing
`blind-squirrel-method/the-blind-squirrel-method.pdf`. Check the exported links,
page count and layout before publishing; update the page's file details if needed.

GitHub Pages publishes `main` from the repository root. `.nojekyll` serves the
files directly. `CNAME` contains `jamesburchill.com`; the Driftinel custom domain
belongs to its separate repository and does not replace this value.

Before pushing, review the diff, check changed links/assets, and inspect affected
pages at desktop/mobile widths. After pushing, confirm the Pages build succeeds
for the expected commit and verify the public result. Preserve other site sections
and their independent documentation.

## Social sharing

The homepage uses `img/james-burchill-social-curiosity.jpg`, a 1200 × 630
portrait-and-name card in the current navy/teal identity, for Open Graph and X
large-image previews. It gives the three credential phrases equal styling and
uses “A career built on curiosity.” The on-page portrait and Person structured-data
image remain `img/avatar.jpg`. The matching editable SVG source is
`img/james-burchill-social-curiosity.svg`; it references the portrait beside it.
Previous sharing assets remain available.

## Search discovery

`robots.txt` permits crawling and points to `sitemap.xml`. The sitemap lists the
homepage and the book landing page using their HTTPS canonical URLs. Add future
public landing pages deliberately; omit redirects, duplicate `/index.html` URLs,
and pages marked `noindex`. No `lastmod` dates are emitted without a verified
significant modification date. Vault maintains its own sitemap.

`parkedproject/index.html` uses `noindex, follow` to keep the placeholder out of
search results after recrawling. Keep it crawlable so search engines can read
that directive. This does not remove the page or change its appearance.

This static GitHub Pages setup has no repository-level HTTP redirect rules.
Preserve the `/driftinel/` JavaScript redirect (including query strings and
fragments), immediate meta refresh, canonical, and fallback link. `/index.html`
already canonicalizes to `/`. HTTP 301/308 consolidation would require a separate
hosting/routing change; do not add ineffective `.htaccess` or `_redirects` files.

The `/about/` alias uses an immediate HTML redirect to the homepage. GitHub Pages
forwards legacy `/vault/` paths to the Vault project domain before serving local
files; their remaining aliases are handled in the Vault repository. Keep aliases
out of the sitemap and keep HTTPS enforcement enabled on both Pages sites.

After an authorized publication, verify both sitemap URLs and the parked-page
robots directive on the live site. Then, with Search Console authorization:

1. Submit `https://jamesburchill.com/sitemap.xml` and request indexing for
   `https://jamesburchill.com/blind-squirrel-method/`.
2. Remove these obsolete or inappropriate sitemap submissions (not site pages):
   - `https://jamesburchill.com/vault/sitemap_index.xml`
   - `https://jamesburchill.com/vault/llms.txt`
   - `https://jamesburchill.com/vault/wp-json/ai-qna-generator/v1/feed`
   - `https://www.jamesburchill.com/sitemap.xml`
   - `http://www.jamesburchill.com/sitemap-1.xml`
   - `http://www.jamesburchill.com/sitemap.xml`
3. Retain `https://vault.jamesburchill.com/sitemap.xml` and
   `https://vault.jamesburchill.com/feeds/rss.xml`.

On 31 October 2026, the SEO files were published and verified live. Search
Console accepted the new sitemap with two discovered pages. The six obsolete
submissions above were removed; both Vault feeds were retained. The book page
is discovered through the sitemap but is not yet confirmed indexed.

## Cross-site Naming and Links

Use **James Burchill** for the author and **The Vault** for the writing destination.
**Writing** names the Vault’s `/content/` index, not a separate publication.
The author site introduces James and his work; the Vault holds essays, field notes,
practical guides and resources. Because Drift Happens is the drift/governance
framework, Governing Intelligent Systems is a reading guide within the Vault,
and Driftinel is an independent managed service with access by invitation.

Use lowercase HTTPS URLs with trailing slashes for cross-site page links:
`https://jamesburchill.com/`, `https://vault.jamesburchill.com/`,
`https://becausedrifthappens.com/` and `https://driftinel.com/`.
Use local paths within each site, and preserve existing article URLs and anchors.
The public MCP connection guide lives at `https://jamesburchill.com/mcp/`;
the separate MCP service address remains `https://mcp.jamesburchill.com`.
Current JCB visual cues are midnight navy `#061525`, warm white `#F7F5EF`,
deep teal `#006B64` on light surfaces, and bright teal `#00D7BC` on navy.
Georgia headings and sans-serif body text retain the personal editorial treatment.

## Sharing verification — November 4, 2026

The portrait-and-name sharing card was published in `780d55b`; the GitHub Pages
deployment passed. The live homepage supplies the new 1200 × 630 JPEG through
Open Graph and X metadata, with matching dimensions, MIME type, and image alt
text. The on-page portrait and Person structured-data image remain unchanged.
LinkedIn Post Inspector was refreshed and visually verified with the complete
portrait and clear name/role text. Native Facebook and X previews were not
inspected. No Search Console settings were changed for this site in this work,
and no further sharing-image changes are pending.

## MCP directory preparation — November 11, 2026

The MCP guide now links to a service-specific privacy policy at
`https://jamesburchill.com/mcp/privacy/` and includes Claude custom-connector
steps. These pages are published through the site’s established GitHub Pages
workflow; deployment evidence is recorded in the MCP service repository’s STATUS.md.
The service repository owns the protocol implementation, release status,
regression checks, and Claude directory preparation checklist. Publishing the
website does not deploy the separately hosted MCP service. No directory listing
is claimed by these pages.

## JMG positioning alignment — November 13, 2026

The personal homepage retains James's founder, Systems Architect, CTO and author
roles, products and writing. Its business introduction, Work with me navigation
and contact copy link to JMG's Technology & AI, Automation and Monitoring offer.
Custom software and integration remain supporting implementation detail.
Homepage descriptions and Person structured data reflect the same hierarchy.
The new sharing card retains the portrait, name and professional roles and adds
“Sharp thinking. Useful solutions.” and the three areas at a new image URL.

## Problem-first consistency — November 13, 2026

The homepage introduces business outcomes before implementation capabilities,
while retaining the founder, JMG Principal & Systems Architect, Tooljar CTO and
author roles. Work cards and business contact copy follow the same problem-first
approach as JMG. The public MCP guide introduces useful questions and source
material, with commercial enquiries routed to JMG; connection instructions and
privacy terms remain separate. Homepage and MCP sharing descriptions follow
the revised copy. The portrait-and-roles sharing card remains current.

## Drift alignment — November 16, 2026

The homepage introduces drift through James’s writing, products, and practical systems work while retaining his name, Systems Architect/CTO/author roles, portrait, biography, featured book, personal contact, and writing destinations. Six existing-style cards connect writing, the drift framework, JMG, Driftinel (by invitation), Telemetry Sentinel, and BaileyBot (waitlist). Commercial work remains broad enough for consulting, custom software, automation, integration, and defined implementation projects. The MCP guide’s business paragraph aligns with changing source information and direct integration scoping; connection instructions and privacy terms are unchanged.

Homepage descriptions, Person description, and sharing metadata follow the new positioning. The new 1200×630 card retains the original portrait and name/roles with “Understanding change. Keeping intent in view.” Editable source is `img/james-burchill-social-drift.svg`; earlier sharing assets remain intact. Titles, canonical URLs, structured-data identity, sitemap, robots, redirects, book content/download, and the personal-site palette are preserved.

Validation: homepage and MCP HTML, local/anchor links, JSON-LD, stable titles/canonicals, and preserved indexing/book/alias/privacy files passed checks. The portrait sharing card was visually reviewed at 1200×630. Desktop homepage/work cards and mobile homepage were inspected; homepage and MCP had no horizontal overflow at 390 pixels, with homepage images loaded. New product destinations returned HTTPS 200. Platform preview caches and search rankings were not verified.

## Introduction balance — November 16, 2026

Reduced the homepage introduction paragraph from the previous 21–29-pixel range to 18–22 pixels, with more comfortable line spacing, to balance the text against the existing portrait. Name, headings, portrait dimensions, and copy remain unchanged. This rule is scoped to the hero introduction; the shared stylesheet cache hash is refreshed on the homepage and book page.

Validation: desktop and 390-pixel mobile layouts were inspected; the introduction renders at 22 and 18 pixels respectively, with no mobile overflow. HTML/links/JSON-LD, stable SEO fields, and unchanged homepage/book copy apart from cache hashes passed checks.

## Broader product introduction — November 16, 2026

The homepage role paragraph retains JMG Principal & Systems Architect and Tooljar CTO, then introduces the shared purpose of the product work: commitments, conditions, and follow-through, with enough notice to act on drift. The individual product cards retain Driftinel, Telemetry Sentinel, and BaileyBot links and availability labels.

## Redesign implementation -- November 17, 2026

Implemented the approved JCB redesign locally for review, without publication.
The homepage, book page, MCP guide, and MCP privacy page share navigation, footer,
colours, typography, focus treatments, and responsive spacing. Existing book and
MCP main content and content links are preserved; technical connection settings
and privacy terms are unchanged. The biography expands with native accessible
details/summary controls. Legacy homepage anchor IDs remain available.

Use the existing local-preview command above. No framework, dependency, remote
font, tracking, signup flow, or MCP endpoint change was introduced.
`redesign.css` is loaded with its first 12 SHA-256 characters as the cache version;
refresh those references in all four pages when changing that stylesheet.

Validation: local HTML/assets/anchors and JSON-LD checks pass. All four redesigned
pages were checked at 390, 768, and 1440 pixels for image loading and horizontal
overflow. Desktop/mobile screenshots were reviewed. Both credential rows have
the same computed font size, weight, and colour at each checked viewport.
MCP guide/privacy and book main text and content links match the previous source.
Live deployment, MCP protocol execution, platform preview caches, and search
rankings were not tested in this visual redesign.


## Graphic alignment correction -- November 17, 2026

Removed the decorative period after James Burchill from the shared header, footer, homepage name and social artwork. The JMG graphic now connects only between icon frames, with centred stacked layers. The Vault illustration rotates each sheet and its text together; the foreground sheet masks the sheets behind it. The framework illustration shares exact curve coordinates between its lines and shaded region, with labels clear of the paths.

The shared header now uses an accessible home link with a serif JB monogram tile (`img/jb-monogram.svg`), leaving the full name prominent in the homepage hero and footer.


## Product brand assets and order -- November 17, 2026

Product listings use Telemetry Sentinel, Driftinel, then BaileyBot. Product marks are copied unchanged from their owning website sources: Telemetry Sentinel's `telemetrysentinel-logo.png`, Driftinel's `icon.svg` (local name `driftinel-mark.svg`), and BaileyBot's `bailey.svg`. The radio-tower brand mark replaces the generic signal icon in product branding; conceptual signal and workflow illustrations remain decorative examples.


## Publication preparation -- November 17, 2026

James authorized publication of the reviewed redesign on November 17, 2026. Final checks covered the four redesigned pages at 320, 390, 768 and 1440 pixels, with no overflow or missing images. The JB header tile, original portrait and product artwork, product order, corrected illustrations, punctuation and four-decade biography are included. Both credential rows retain equal styling. The existing MCP instructions/privacy text, book content/download, redirects and indexing files remain preserved. GitHub Pages continues to publish the root of `main`; publishing this site does not deploy the MCP service.
