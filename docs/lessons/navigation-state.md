# Represent views with safe hash routes

Hash routes select overview, tasks, board, projects, team, releases, activity or settings. A task route may include an encoded id. Unknown pages fall back to Overview, and malformed percent escapes cannot crash the parser.

## Source map

- [`shared/routes.ts`](../../shared/routes.ts)
- [`shared/query.ts`](../../shared/query.ts)
- [`react/src/workshop/store.js`](../../react/src/workshop/store.js)
- [`angular/src/app/workshop/store.service.ts`](../../angular/src/app/workshop/store.service.ts)

## Walk through the behavior

Open `#/tasks/T-103` directly, reload, and use browser Back and Forward. Open a saved-filter link containing spaces or ampersands and inspect the restored filter controls.

## Paired exercise

Try an unknown task id and use the recovery action. Compare route state with temporary editor state: the selected task is addressable, while an unsaved draft remains local to the current UI.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

These examples teach a minimal browser history boundary without adding a routing dependency to React. An application with nested server routes, route loaders or access control would benefit from a fuller router. Hash routes still require accessible focus handling.

## Verify

`node tests/routes.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
