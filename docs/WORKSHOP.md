# Release workshop

This extension preserves the Angular 14.0.5 and React 18.2 starter and adds the same local release-planning experience in both frameworks. All names and work items are fictional. The reference date is July 8, 2022, so deadline exercises remain deterministic.

## Source ownership

`shared/*.ts` owns data contracts, fixtures, validation, and domain operations. `scripts/sync-shared.cjs` copies TypeScript into Angular and transpiles it to JavaScript for React. Generated copies are ignored. Edit the canonical shared files; never edit generated copies.

Each application's npm prestart, prebuild, pretest, precoverage and prelint hooks synchronize sources. Run `npm ci` from the repository root before installing either app to provide the pinned TypeScript compiler. Run `npm run shared` after changing shared code during an already-running development server.

## Teaching path

Start with immutable task commands, then compare React's context adapter with Angular's injected service. Follow a command from a labelled form through shared validation to the refreshed table. Explore sorting, pagination, bulk selection, dependencies, estimates, and release readiness. Try the same scenario in the other framework and compare behavior.

The examples are a browser-only workshop, with no account, server, or production project data. Persistence and import boundaries are explicit lessons. UI adapters must report failed commands and must not silently discard invalid user input.

## Visual direction

The workshop uses ink text (`#17324d`), a blue planning accent (`#215b9a`), pale blue feedback (`#edf4fb`), white surfaces, slate secondary text (`#526579`), and red errors (`#9b2638`). Avenir/Segoe UI system fonts keep setup independent of font services. A single release workspace with a wide table and a narrower detail panel explains the subject directly; navigation and project colors organize information rather than decorate it.
