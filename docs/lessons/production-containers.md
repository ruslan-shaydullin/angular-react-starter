# Serve built assets with SPA fallbacks

Each multi-stage container installs the root compiler, installs the selected app, synchronizes shared sources and builds production assets. The runtime image serves only the build output through nginx on port 8080.

## Source map

- [`Dockerfile`](../../Dockerfile)
- [`react/Dockerfile`](../../react/Dockerfile)
- [`nginx.conf`](../../nginx.conf)
- [`docker-compose.yml`](../../docker-compose.yml)
- [`scripts/preview.cjs`](../../scripts/preview.cjs)

## Walk through the behavior

Build Angular with `docker build -t release-angular .` and React with `docker build -f react/Dockerfile -t release-react .`. Or run `docker compose up --build` to expose both on loopback ports 8080 and 8081.

## Paired exercise

Request `/healthz`, an application path, and a missing `.js` asset. Health returns plain text, application paths fall back to the document, and missing assets return 404 rather than misleading HTML.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

These preserved Node and nginx versions belong to the teaching baseline and are not a current production security recommendation. Deployment, image publication and external messages are intentionally absent from CI; shipping a real service requires an explicit maintenance and deployment plan.

## Verify

`npm run check:builds`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
