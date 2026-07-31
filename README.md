# jamesburchill.com

Static source for [jamesburchill.com](https://jamesburchill.com), hosted with GitHub Pages.

The site presents the work of James Burchill across technology leadership, intelligent systems, and selected strategic engagements.

Its public centre of gravity is:

- [Driftinel](https://driftinel.com) — operational awareness for fewer surprises;
- [Because Drift Happens](https://becausedrifthappens.com) — the doctrine behind the work; and
- [The Vault](https://vault.jamesburchill.com) — field notes, working ideas, and evidence from the journey.

The site also reflects James's current role as CTO at Tooljar, his leadership background, and the criteria for limited strategic engagements.

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
