# Keep comparison surfaces locally scrollable

The workspace uses one canonical stylesheet so both adapters share layout, contrast and interaction affordances. A two-column table/detail view becomes one column below 1000 pixels, while board columns keep local horizontal scrolling.

## Source map

- [`shared/workshop.css`](../../shared/workshop.css)
- [`react/src/workshop/Workspace.js`](../../react/src/workshop/Workspace.js)
- [`angular/src/app/workshop/Workspace.component.html`](../../angular/src/app/workshop/Workspace.component.html)

## Walk through the behavior

Open a task at desktop width, then reduce the viewport to 375 pixels. The details move above the table. Inspect field wrapping, button reachability and the distinction between page overflow and intentional table overflow.

## Paired exercise

Enable compact density and compare row spacing. Print the overview or release view; navigation and controls disappear while content remains. Check both long task titles and long plain-text comments.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Breakpoints describe available space rather than particular device names. Avoid hiding essential fields to make a screenshot fit. The narrow-screen alternative must still support every command available on desktop.

## Verify

`See the mobile, zoom and reduced-motion rows in docs/BROWSER_CHECKS.md`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
