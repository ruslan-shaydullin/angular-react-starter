# Model acceptance criteria as identified items

Checklist items need stable identities because their text can repeat and their position can change. New ids are allocated against existing items. Toggling copies only the changed item and the enclosing task.

## Source map

- [`shared/checklist.ts`](../../shared/checklist.ts)
- [`react/src/workshop/Checklist.js`](../../react/src/workshop/Checklist.js)
- [`angular/src/app/workshop/Checklist.component.html`](../../angular/src/app/workshop/Checklist.component.html)

## Walk through the behavior

Open T-103 and add a concrete acceptance criterion. Toggle it, then inspect the completion count. A done task disables checklist editing; reopen it before adding work so its completion state remains honest.

## Paired exercise

Add two items with similar text, toggle only the second, and confirm the first is unchanged. Attempt blank text and inspect the retained input and announced error.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

The domain caps checklist size and text length, preventing accidental unbounded growth in a local snapshot. Deletion and reordering are extension exercises; they should preserve remaining item identities.

## Verify

`node tests/checklist.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
