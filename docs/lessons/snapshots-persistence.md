# Validate durable local state

A snapshot has a format name, version, export timestamp and complete workspace. Import validates shape, identifiers, task fields, nested details, dependencies, milestones and preferences before returning an independent workspace.

## Source map

- [`shared/snapshot-export.ts`](../../shared/snapshot-export.ts)
- [`shared/snapshot-import.ts`](../../shared/snapshot-import.ts)
- [`shared/persistence.ts`](../../shared/persistence.ts)

## Walk through the behavior

Export a snapshot after several changes, alter a copy to contain a duplicate task id, and preview it. The malformed copy is rejected. Import the original and reload to verify browser persistence.

## Paired exercise

Simulate unavailable storage through the storage-port tests. Confirm the adapter keeps usable in-memory state and tells the user to export a snapshot. Inspect how an invalid stored payload falls back to fixtures with an error.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Storage is synchronous and local to an origin. It is not a backup service or synchronization mechanism. Import replaces the whole workspace; preview and session undo make that operation reviewable, but a reload discards undo history.

## Verify

`node tests/snapshots.test.cjs && node tests/contracts.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
