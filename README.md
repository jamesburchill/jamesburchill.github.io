# jamesburchill.github.io

Static source for [jamesburchill.com](https://jamesburchill.com/), hosted with GitHub Pages.

The site is a one-page professional profile for James Burchill centred on Governing Intelligent Systems and Because Drift Happens™. It presents:

- the systems and intellectual property James builds;
- his current CTO role at Tooljar;
- selected public projects and writing;
- the criteria for limited strategic engagements; and
- his leadership background and areas of focus.

The implementation is intentionally dependency-free: semantic HTML, a single stylesheet, and static image assets.

## Standalone project routes

These special projects remain available independently and are intentionally not linked from the main professional site:

- `/parkedproject/`: a full-screen illustrated page for parked projects
- `/games/`: the browser-game catalogue
- `/games/spaceshooter/`: a browser-based, side-scrolling pixel-art game

## Local preview

From the repository root:

```sh
python3 -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Deployment

- GitHub Pages publishes from the `main` branch.
- `CNAME` sets the custom domain to `jamesburchill.com`.
- The production domain is served by GitHub Pages.
