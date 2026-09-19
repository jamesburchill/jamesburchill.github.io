# jamesburchill.com

Static source for [jamesburchill.com](https://jamesburchill.com), hosted with GitHub Pages.

The site presents the work of James Burchill as a Business Systems Architect, CTO, and bestselling author, connecting discovery, design, development, and deployment.

Its public centre of gravity is:

- [Driftinel](https://driftinel.com) — a drift detection system in development;
- [Because Drift Happens](https://becausedrifthappens.com) — the doctrine behind the work; and
- [The Vault](https://vault.jamesburchill.com) — a content library of practical knowledge, essays, field notes, and resources across business and technology.

The site also reflects James's current role as CTO at Tooljar, his background across engineering, publishing, teaching, and entrepreneurship, and selected private engagements in architecture, workflows, software products, and practical AI.

The implementation is intentionally dependency-free: semantic HTML, a single stylesheet, and static image assets.

## Local preview

From the repository root:

```sh
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Deployment

- GitHub Pages publishes from the `main` branch.
- `CNAME` sets the custom domain to `jamesburchill.com`.
- The Driftinel product page is served from `/driftinel/`, with [driftinel.com](https://driftinel.com) as its public address.
- The production domain is served by GitHub Pages.
