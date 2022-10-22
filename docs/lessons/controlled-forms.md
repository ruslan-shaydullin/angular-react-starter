# Compare form adapters

The React editor keeps a controlled draft with `useState`; the Angular editor uses named `ngModel` controls and a draft object. Both submit the same domain fields and close only after successful validation.

## Source map

- [`react/src/workshop/TaskEditor.js`](../../react/src/workshop/TaskEditor.js)
- [`angular/src/app/workshop/TaskEditor.component.ts`](../../angular/src/app/workshop/TaskEditor.component.ts)
- [`angular/src/app/workshop/TaskEditor.component.html`](../../angular/src/app/workshop/TaskEditor.component.html)

## Walk through the behavior

Open New task and submit without a title. The draft remains open and the error is announced. Enter a valid title, choose an owner, and submit again. Cancel a second draft and confirm the workspace remains unchanged.

## Paired exercise

Use the accessibility-review template, edit its description, and create it. Open the saved task for editing. Verify that changing title preserves checklist entries, comments, identity and creation time.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

A draft is temporary UI state. Copying the selected task into the editor avoids mutating a live domain object while typing. In a larger app, unsaved-change handling and field-level error associations deserve an explicit design.

## Verify

`npm --prefix react test -- --runInBand CreateTask`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
