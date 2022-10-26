# Separate derived attention from recorded changes

Attention notices are derived from current tasks and capacity at the reference date. Activity is recorded only after successful changes and ordered newest first. These two views have different lifecycles and should not be conflated.

## Source map

- [`shared/notifications.ts`](../../shared/notifications.ts)
- [`shared/activity.ts`](../../shared/activity.ts)
- [`react/src/workshop/Activity.js`](../../react/src/workshop/Activity.js)
- [`angular/src/app/workshop/Notifications.component.html`](../../angular/src/app/workshop/Notifications.component.html)

## Walk through the behavior

Review the overdue task and unassigned work on Overview. Assign the missing owner and watch that notice disappear. Make an invalid status change and confirm it adds no activity.

## Paired exercise

Make several valid changes, open Activity, and follow a task link. Undo the latest change and observe that its associated activity disappears with the restored workspace.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Activity here is a bounded local history, not a tamper-resistant audit log. It intentionally participates in undo and snapshots. A compliance audit stream would need an independent append-only server-side design.

## Verify

`node tests/notifications.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
