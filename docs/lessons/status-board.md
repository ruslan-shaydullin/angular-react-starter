# Use accessible board movement

The board partitions active work into five workflow states. Back and Next buttons provide keyboard-operable movement and reuse the same transition validator as the detail select and bulk toolbar.

## Source map

- [`shared/grouping.ts`](../../shared/grouping.ts)
- [`shared/board.ts`](../../shared/board.ts)
- [`react/src/workshop/Board.js`](../../react/src/workshop/Board.js)
- [`angular/src/app/workshop/Board.component.html`](../../angular/src/app/workshop/Board.component.html)

## Walk through the behavior

Move a ready task into In progress. Try moving T-101 from review to done before completing its checklist. Observe the same error used by the table workflow. Add enough in-progress tasks to exceed the three-task advisory limit.

## Paired exercise

Navigate the entire board using Tab and button activation. Verify edge buttons disable in Backlog and Done. Filter by project and compare column counts with the task table.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Work-in-progress limits are advisory in this workshop, while completion prerequisites are enforced. Drag and drop is deliberately unnecessary to complete the workflow; adding it should preserve the existing button path.

## Verify

`node tests/board.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
