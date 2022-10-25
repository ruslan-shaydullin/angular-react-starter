# Avoid timezone drift in planning dates

Due dates are calendar strings in YYYY-MM-DD form, while activity uses timestamps. Date helpers validate a UTC calendar roundtrip and format with an explicit UTC timezone, preserving the chosen day across local environments.

## Source map

- [`shared/validation.ts`](../../shared/validation.ts)
- [`shared/dates.ts`](../../shared/dates.ts)
- [`shared/timeline.ts`](../../shared/timeline.ts)

## Walk through the behavior

Compare overdue, today, soon and later classifications around the fixed reference date of 8 July 2022. Dates within seven days are soon. Completed work uses the done classification regardless of its old due date.

## Paired exercise

Test February 29 in leap and non-leap years. Shift December 31 by one day. Change the week-start preference and inspect the reference week displayed above the timeline.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

The fixture date is deliberately fixed for repeatable lessons. Replacing it with a current date should happen through an injected clock or explicit application input, not a hidden call inside every pure query helper.

## Verify

`node tests/dates.test.cjs && node tests/recurrence.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
