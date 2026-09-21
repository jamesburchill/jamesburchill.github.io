# jamesburchill.com

Static source for [jamesburchill.com](https://jamesburchill.com), hosted with GitHub Pages.

The site is a short professional introduction to James Burchill as a Business Systems Architect, CTO, and bestselling author. It includes a brief biography, his current CTO role at Tooljar, and a simple contact link.

Work and writing links have equal emphasis:

- [The Vault](https://vault.jamesburchill.com) — essays, notes, and practical resources;
- [Driftinel](https://driftinel.com) — an independent software project in development; and
- [Because Drift Happens](https://becausedrifthappens.com) — thinking on how systems change and stay aligned with their purpose.

The homepage does not advertise consulting services or an engagement process.

The Driftinel page explains the project and its private development status. It does not publish pricing or accept early-access applications.

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
