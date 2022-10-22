# Separate form normalization from snapshot validation

Form controls naturally produce strings. A form validator may trim text and convert an estimate into a number. A snapshot claims to contain a complete typed workspace, so its boundary rejects wrong raw types instead of retaining coerced values.

## Source map

- [`shared/validation.ts`](../../shared/validation.ts)
- [`shared/snapshot-import.ts`](../../shared/snapshot-import.ts)
- [`tests/validation.test.cjs`](../../tests/validation.test.cjs)
- [`tests/snapshots.test.cjs`](../../tests/snapshots.test.cjs)

## Walk through the behavior

Submit a short title, an impossible calendar date and a fractional estimate. Read the aggregated errors. Then alter an exported snapshot so `estimate` becomes a string and attempt to import it; the strict snapshot validator rejects it.

## Paired exercise

Add one new title rule and one malformed-snapshot regression. Check both Angular and React forms. Verify an invalid import leaves tasks, projects, history and revision unchanged.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Do not equate TypeScript annotations with runtime validation. JSON and browser storage can contain arbitrary structures. A validator that normalizes data must either return the normalized data for storage or explicitly reject incompatible raw types.

## Verify

`node tests/validation.test.cjs && node tests/snapshots.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
