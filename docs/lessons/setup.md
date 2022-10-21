# Run both applications

The shared compiler is installed at the repository root. Application lifecycle hooks use it before starting, testing, linting or building either adapter. A fresh checkout has no generated shared files; successful synchronization is part of the normal build, not a manual copy operation.

## Source map

- [`scripts/sync-shared.cjs`](../../scripts/sync-shared.cjs)
- [`package.json`](../../package.json)
- [`angular/package.json`](../../angular/package.json)
- [`react/package.json`](../../react/package.json)

## Walk through the behavior

Use Node 16.20 with npm 8 for this preserved Angular 14 / CRA 5 stack. Run `npm ci`, `npm ci --prefix angular`, then `npm ci --prefix react` from the root. Start `npm --prefix angular start` and `npm --prefix react start` in separate terminals. Open ports 4200 and 3000.

## Paired exercise

Create the same task in each application. Confirm that each origin retains its own changes after reload. Edit a fixture in `shared/fixtures.ts`, run `npm run shared`, and restart with a clean local workspace to see the change.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

A previously saved workspace takes precedence over new fixtures. Export a snapshot before clearing site storage. Current Node releases may not be compatible with the preserved build dependencies; changing framework versions is a separate migration.

## Verify

`npm run shared && npm run parity`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
