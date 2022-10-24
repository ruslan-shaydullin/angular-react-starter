# Keep ordering and paging stable

Sorting returns a new array and uses original positions to break ties. Missing due dates remain last in both directions. Pagination validates size and page values, then clamps a stale page when filters shrink the result set.

## Source map

- [`shared/sorting.ts`](../../shared/sorting.ts)
- [`shared/pagination.ts`](../../shared/pagination.ts)
- [`react/src/workshop/Pagination.js`](../../react/src/workshop/Pagination.js)
- [`angular/src/app/workshop/Pagination.component.ts`](../../angular/src/app/workshop/Pagination.component.ts)

## Walk through the behavior

Move to page two, filter to one task, and observe page one. Sort equal estimates and compare the source order. Remove a due date and verify that task appears last even when dates are descending.

## Paired exercise

Add a task with the same estimate as another. Toggle estimate sorting twice and confirm stable ties. Exercise an empty result and verify the range reads 0–0, with both navigation buttons disabled.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

The UI displays six rows per page, while the generic helper supports bounded page sizes. Sorting must occur before pagination; sorting only the visible slice produces misleading global order.

## Verify

`node tests/sorting.test.cjs && node tests/pagination.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
