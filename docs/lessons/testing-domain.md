# Test domain invariants without a framework

The shared test runner compiles TypeScript once and executes Node assertion suites. Tests freeze fixtures, check rejected-command identity, cover calendar and parser boundaries, and exercise export/import after realistic command sequences.

## Source map

- [`tests/helpers.cjs`](../../tests/helpers.cjs)
- [`tests/contracts.test.cjs`](../../tests/contracts.test.cjs)
- [`scripts/test-shared.cjs`](../../scripts/test-shared.cjs)

## Walk through the behavior

Run `npm test` from the root. Read the bulk completion regression and the strict snapshot type regression. Each describes an externally meaningful invariant instead of copying a function’s implementation.

## Paired exercise

Add a new command, write a rejection case and a valid sequence case, then verify the exported workspace can reload. Use a second fixture to prove the first did not mutate shared nested arrays.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

The tests use a deterministic timestamp, so failures do not depend on the wall clock. Directly running an individual test file requires a recent shared compile; run `npm test` after changing TypeScript.

## Verify

`npm test`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
