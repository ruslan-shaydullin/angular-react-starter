# Define release readiness from explicit scope

A milestone names a project, date and set of task ids. Readiness requires nonempty scope and every included task to be complete. Late open tasks add a separate explanation when their due date exceeds the milestone date.

## Source map

- [`shared/milestones.ts`](../../shared/milestones.ts)
- [`shared/readiness.ts`](../../shared/readiness.ts)
- [`shared/release-notes.ts`](../../shared/release-notes.ts)

## Walk through the behavior

Open the release view and inspect why each fixture milestone is not ready. Create a portal milestone containing the already completed image-placeholder task and observe its ready state.

## Paired exercise

Create an empty milestone, then compare its explanation with a milestone containing unfinished work. Draft release notes for each project and verify they include only active completed tasks.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

A ready local milestone is a planning result, not an authorization to deploy. Release notes are downloadable drafts for review. The workshop has no deployment, publishing or notification side effects.

## Verify

`node tests/milestones.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
