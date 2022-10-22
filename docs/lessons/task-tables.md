# Build a semantic interactive table

Task comparison benefits from a real table with a caption, column headers and row headers. The title button opens details; sorting remains a button inside the header, and `aria-sort` describes the active ordering.

## Source map

- [`react/src/workshop/TaskTable.js`](../../react/src/workshop/TaskTable.js)
- [`angular/src/app/workshop/TaskTable.component.html`](../../angular/src/app/workshop/TaskTable.component.html)
- [`shared/workshop.css`](../../shared/workshop.css)

## Walk through the behavior

Inspect the DOM in each framework. Read the caption and current sorting state with accessibility tools. Activate a title by keyboard, then close details. The table scrolls inside its container on narrow screens.

## Paired exercise

Sort by priority and estimate, then open the same task in each application. At 375 pixels wide, confirm that the table scrolls without forcing the entire page beyond the viewport.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Converting table rows into arbitrary block elements can remove useful relationships. A responsive table may keep local horizontal scrolling when comparison across columns matters; the detail panel provides a vertical alternative for an individual task.

## Verify

`npm --prefix react test -- --runInBand Search`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
