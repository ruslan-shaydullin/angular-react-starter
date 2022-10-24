# Distinguish effort points from elapsed time

Estimate points express relative planned effort; time entries record actual whole minutes. The model does not pretend that one point equals a fixed number of hours. Capacity reports use points, while task detail sums recorded minutes.

## Source map

- [`shared/estimates.ts`](../../shared/estimates.ts)
- [`shared/time-logs.ts`](../../shared/time-logs.ts)
- [`react/src/workshop/TimeEntry.js`](../../react/src/workshop/TimeEntry.js)
- [`angular/src/app/workshop/TimeEntry.component.html`](../../angular/src/app/workshop/TimeEntry.component.html)

## Walk through the behavior

Record 45 minutes and then 90 minutes on a task. The total becomes 2h 15m. Enter a negative or fractional value to trigger validation without losing the draft note.

## Paired exercise

Set an estimate to zero and inspect the unestimated-work warning. Record time on that task and confirm the estimate remains zero. Discuss what evidence would be needed before translating points into calendar forecasts.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Each time entry is limited to one day of minutes and requires a valid calendar date. The local model has no timer, billing rules or payroll meaning; those would require separate domain contracts.

## Verify

`node tests/estimates.test.cjs && node tests/time.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
