# jamesburchill.com

Personal website for James Burchill: founder of Driftinel, Systems Architect,
CTO, and bestselling author. GitHub Pages publishes this repository at
[https://jamesburchill.com/](https://jamesburchill.com/).

## Contents

- `index.html`: professional introduction, biography, work/writing links, and contact.
- `styles.css`, icons, manifest, and `img/`: shared site presentation and assets.
- `games/spaceshooter/`: browser game with its own README.
- `parkedproject/`: existing project page and assets.
- `driftinel/`: redirect to the standalone product site and retained legacy stylesheet.

The homepage gives The Vault, Driftinel, and Because Drift Happens equal emphasis.
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
existing feature-card IDs. The old product stylesheet remains for
compatibility; no game or other personal-site content moves to the product repo.

## Local preview

From the repository root:

```sh
python3 -m http.server 8767 --bind 127.0.0.1
```

Open [the personal site](http://127.0.0.1:8767/) or
[the former product page](http://127.0.0.1:8767/driftinel/).
The site uses static HTML, CSS, and JavaScript without dependency installation.

## Publishing

GitHub Pages publishes `main` from the repository root. `.nojekyll` serves the
files directly. `CNAME` contains `jamesburchill.com`; the Driftinel custom domain
belongs to its separate repository and does not replace this value.

Before pushing, review the diff, check changed links/assets, and inspect affected
pages at desktop/mobile widths. After pushing, confirm the Pages build succeeds
for the expected commit and verify the public result. Preserve other site sections
and their independent documentation.
