# jamesburchill.com

Personal website for James Burchill: founder of Driftinel, Systems Architect,
CTO, and bestselling author. GitHub Pages publishes this repository at
[https://jamesburchill.com/](https://jamesburchill.com/).

## Contents

- `index.html`: professional introduction, biography, work/writing links, and contact.
- `styles.css`, icons, manifest, and `img/`: shared site presentation and assets.
- `games/spaceshooter/`: browser game with its own README.
- `parkedproject/`: existing project page and assets.
- `driftinel/`: former product page and stylesheet, retained during domain cutover.

The homepage gives The Vault, Driftinel, and Because Drift Happens equal emphasis.
It does not advertise consulting services or an engagement process.

## Driftinel website separation

The standalone marketing source now lives in
[`jamesburchill/driftinel-website`](https://github.com/jamesburchill/driftinel-website),
with its own GitHub Pages deployment and `driftinel.com` custom-domain setting.
The private application source remains in `jamesburchill/driftinel`.
Maintain product copy and navigation in the standalone website repository after
cutover. Its deployment guide records DNS, verification, and recovery.

During cutover, `driftinel.com` still forwards to this repository's `/driftinel/`
page. Keep that page serving until the standalone domain works over HTTPS, then
replace it with a redirect and visible fallback link. Preserve its existing
fragment identifiers in the destination. The old product stylesheet remains for
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
