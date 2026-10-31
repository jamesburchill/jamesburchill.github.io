# jamesburchill.com

Personal website for James Burchill: founder of Driftinel, Systems Architect,
CTO, and bestselling author. GitHub Pages publishes this repository at
[https://jamesburchill.com/](https://jamesburchill.com/).

## Contents

- `index.html`: professional introduction, biography, work/writing links, and contact.
- `styles.css`, `warm-theme.css`, icons, manifest, and `img/`: shared site presentation and assets.
- `games/spaceshooter/`: browser game with its own README.
- `parkedproject/`: existing project page and assets.
- `driftinel/`: redirect to the standalone product site.
- `blind-squirrel-method/`: ungated book page, titled cover and the PDF compiled from Scrivener.

The homepage features the free book and its cover, followed by The Vault,
Driftinel, and Because Drift Happens with equal emphasis. Its cream, forest green
and muted gold palette is shared with the book page.
It does not advertise consulting services or an engagement process.

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
The PDF download requires no registration. Update it by compiling the Desktop
`The Blind Squirrel Method.scriv` project using PDF and the project format
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

These Search Console steps are pending; preparing the local files does not
submit a sitemap, request indexing, or remove existing submissions.
