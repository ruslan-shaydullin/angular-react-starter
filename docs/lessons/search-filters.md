# Compose predictable task queries

Search matches all normalized words across identity, title, description, tags, project name and owner name. Structured filters compose with search using conjunction, so adding a filter narrows the result rather than replacing an earlier criterion.

## Source map

- [`shared/search.ts`](../../shared/search.ts)
- [`shared/filters.ts`](../../shared/filters.ts)
- [`react/src/workshop/Filters.js`](../../react/src/workshop/Filters.js)
- [`angular/src/app/workshop/Filters.component.html`](../../angular/src/app/workshop/Filters.component.html)

## Walk through the behavior

Search for `Maya platform`, then choose a status. Clear all filters and select Unassigned. Toggle Archived tasks to inspect the explicit archive view. Filter changes reset the requested page before pagination clamps it.

## Paired exercise

Create a title containing an accented word and search without the accent. Combine project, owner and tag filters until one task remains. Save that query for the saved-view lesson.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Search uses literal substring matching rather than interpreting user text as a regular expression. This is predictable for small local fixtures; larger datasets would require indexed server-side search and explicit result-loading states.

## Verify

`node tests/search.test.cjs && node tests/filters.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
