# Make selection scope explicit

Individual checkboxes select by stable task id. Select matching tasks spans every filtered page, and the toolbar states the number selected. Selection survives ordinary edits but reconciles away missing and archived tasks.

## Source map

- [`shared/selection.ts`](../../shared/selection.ts)
- [`shared/bulk.ts`](../../shared/bulk.ts)
- [`react/src/workshop/BulkActions.js`](../../react/src/workshop/BulkActions.js)
- [`angular/src/app/workshop/BulkActions.component.html`](../../angular/src/app/workshop/BulkActions.component.html)

## Walk through the behavior

Select two tasks and assign a new owner. Try a bulk completion while one task has incomplete acceptance criteria. The entire status transaction fails, so a partially applied result cannot surprise the user.

## Paired exercise

Search to one project, select all matching tasks, then change the filter. Inspect the selection count before applying an action. Clear selection explicitly and confirm the toolbar disappears.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

A hidden selection can still contain work outside the currently visible filter. The persistent count and explicit Clear selection action make this discoverable. A production workflow may choose a stricter visible-only selection policy instead.

## Verify

`node tests/bulk.test.cjs && npm --prefix react test -- --runInBand Bulk`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
