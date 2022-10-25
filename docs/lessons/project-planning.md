# Aggregate project progress without duplicate state

Project cards derive task counts, completed work, remaining points and participating owners from the current workspace. No second progress counter needs to be updated when a task changes.

## Source map

- [`shared/project-rollups.ts`](../../shared/project-rollups.ts)
- [`shared/projects.ts`](../../shared/projects.ts)
- [`react/src/workshop/Projects.js`](../../react/src/workshop/Projects.js)
- [`angular/src/app/workshop/Projects.component.html`](../../angular/src/app/workshop/Projects.component.html)

## Walk through the behavior

Create a new empty project and inspect its zero progress. Edit its name and description. Open its task view, add work, then return to Projects to see the derived totals update.

## Paired exercise

Complete one task in Platform reliability and compare task-count progress with effort-weighted completion. Archive a task and explain why active project totals change.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Task counts and effort points answer different questions. A large task and a small task each count once in completion percentage, while effort summaries preserve their different estimates. Neither is a promise of calendar delivery.

## Verify

`node tests/projects.test.cjs && node tests/entities.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
