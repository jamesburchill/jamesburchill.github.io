# jamesburchill.com

Personal website for James Burchill: founder of Driftinel, Systems Architect,
CTO, and bestselling author. GitHub Pages publishes this repository at
[https://jamesburchill.com/](https://jamesburchill.com/).

## Contents

- `index.html`: professional introduction, biography, work/writing links, and contact.
- `styles.css`, `warm-theme.css`, icons, manifest, and `img/`: shared site presentation and assets.
- `games/spaceshooter/`: browser game with its own README.
- `parkedproject/`: existing project page and assets.
- `mcp/`: public MCP connection guide, including Claude custom-connector steps.
- `mcp/privacy/`: privacy policy scoped to the public MCP service.
- `driftinel/`: redirect to the standalone product site.
- `blind-squirrel-method/`: ungated book page, titled cover and the PDF compiled from Scrivener.

The homepage features the free book and its cover, followed by The Vault,
Driftinel, and Because Drift Happens with equal emphasis. Its cream, forest green
and muted gold palette is shared with the book page.
The navigation and contact section link to JMG’s strategic consulting offer.
Commercial consulting and discovery enquiries go to JMG; the existing free book,
MCP demonstration, and personal contact paths remain separate.
The homepage links the Driftinel, Tooljar, and James Media Group role statements,
describes the focus of each work/writing destination, and invites questions about
writing and current projects. The Blind Squirrel Method is the only featured book; do not
add earlier book titles or a catalogue without a new editorial decision.

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

The homepage uses `img/james-burchill-social.jpg`, a 1200 × 630 portrait-and-name
card, for Open Graph and X large-image previews. It preserves the complete
portrait at a smaller size with crisp text in the site’s ivory and forest-green
palette. The on-page portrait and Person structured-data image remain
`img/avatar.jpg`.

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
and Driftinel is an independent managed service operating in an invite-only
pilot. It is not generally available.

Use lowercase HTTPS URLs with trailing slashes for cross-site page links:
`https://jamesburchill.com/`, `https://vault.jamesburchill.com/`,
`https://becausedrifthappens.com/` and `https://driftinel.com/`.
Use local paths within each site, and preserve existing article URLs and anchors.
The public MCP connection guide lives at `https://jamesburchill.com/mcp/`;
the separate MCP service address remains `https://mcp.jamesburchill.com`.
Shared visual cues are forest green `#263d31`, ivory `#fbf8ef`, parchment
`#e9e2d5`, muted brass `#a17f4e` and Georgia headings, with sans-serif body text.

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
