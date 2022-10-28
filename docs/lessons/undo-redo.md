# Bound history and discard stale branches

History stores past, present and future workspaces. A successful command appends the previous state, clears the redo branch and retains at most thirty past entries. Rejected commands never enter history.

## Source map

- [`shared/history.ts`](../../shared/history.ts)
- [`react/src/workshop/UndoControls.js`](../../react/src/workshop/UndoControls.js)
- [`angular/src/app/workshop/UndoControls.component.html`](../../angular/src/app/workshop/UndoControls.component.html)

## Walk through the behavior

Change a status, record a comment, and adjust a preference. Undo each in order and then redo. Observe task content, activity and persistence move together.

## Paired exercise

Undo once, make a different edit, and confirm Redo is disabled. Reload the page and verify the persisted present state remains while history resets.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Whole-workspace history is easy to inspect and appropriate for small teaching fixtures. Large datasets may require patches, command inversion or server-supported revisions to control memory cost and concurrent changes.

## Verify

`node tests/history.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
