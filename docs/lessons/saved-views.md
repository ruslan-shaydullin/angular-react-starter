# Save query intent instead of task copies

A saved view stores a normalized filter object, not the tasks that happened to match when it was created. Opening it reruns the query against the current workspace, so new matching work appears naturally.

## Source map

- [`shared/saved-views.ts`](../../shared/saved-views.ts)
- [`shared/query.ts`](../../shared/query.ts)
- [`react/src/workshop/SavedViews.js`](../../react/src/workshop/SavedViews.js)
- [`angular/src/app/workshop/SavedViews.component.html`](../../angular/src/app/workshop/SavedViews.component.html)

## Walk through the behavior

Filter to Platform reliability and In progress, save a name, then clear the filters. Apply the saved view and open its link. Edit a matching task and observe the query result change.

## Paired exercise

Try saving a duplicate name with different capitalization. Confirm the existing view is preserved. Remove one view and use Undo to restore it.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Saved names are bounded and unique ignoring case. Query links contain only filter intent; they do not carry workspace data. Opening a link on another origin uses that origin’s current or fixture workspace.

## Verify

`node tests/history.test.cjs && node tests/routes.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
