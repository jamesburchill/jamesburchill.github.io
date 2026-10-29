# jamesburchill.com

Static source for [jamesburchill.com](https://jamesburchill.com), hosted with GitHub Pages.

The site is a short professional introduction to James Burchill as founder of Driftinel, Systems Architect, CTO, and bestselling author. It includes a brief biography, his roles as CTO at Tooljar and Principal & Systems Architect at JMG, and a simple contact link.

Work and writing links have equal emphasis:

- [The Vault](https://vault.jamesburchill.com) — essays, notes, and practical resources;
- [Driftinel](https://driftinel.com) — a turnkey managed service in development that helps business owners keep promises and avoid costly mistakes through drift notifications; and
- [Because Drift Happens](https://becausedrifthappens.com) — thinking on how systems change and stay aligned with their purpose.

The homepage does not advertise consulting services or an engagement process.

The Driftinel page leads with helping business owners keep their promises and act before missed deadlines or overlooked details become costly mistakes. It presents the intended secure, turnkey managed service: a server provisioned for each client, their chosen channels connected, ongoing monitoring independent of the owner’s laptop, and drift notifications with supporting evidence. The copy pairs “Driftinel checks 100 times a day. So you don’t have to.” with peace of mind when owners step away. The page uses active voice and present tense throughout, including the FAQ’s 14-minute checking cycle. This copy describes the service offering; it does not verify runtime behaviour. The service remains in development; hosting location, data handling, inference, and support arrangements are not fixed public commitments. The page does not publish pricing or accept early-access applications.

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
