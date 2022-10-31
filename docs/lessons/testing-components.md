# Exercise adapters through user-visible behavior

React tests use Testing Library and user-event against the real provider and application. Angular tests compile the real module, dispatch native DOM events and await fixture stability. Both start from clean browser storage.

## Source map

- [`react/src/workshop/testHelpers.js`](../../react/src/workshop/testHelpers.js)
- [`angular/src/app/workshop/test-helpers.ts`](../../angular/src/app/workshop/test-helpers.ts)
- [`docs/HEADLESS_TESTS.md`](../../docs/HEADLESS_TESTS.md)

## Walk through the behavior

Compare the status-completion tests. Each attempts an invalid transition, sees an error, corrects acceptance criteria and verifies success. Domain tests cover graph complexity; component tests prove the UI reaches those rules correctly.

## Paired exercise

Add the same interaction scenario in both frameworks. Assert the accessible label and visible result, then verify persisted state only when the storage boundary is the subject of the test.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Avoid testing framework internals or duplicating every domain branch in both UI suites. Real-browser acceptance fills gaps around focus, downloads and responsive layout that jsdom and isolated component runners do not fully model.

## Verify

`npm --prefix react test -- --runInBand`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
