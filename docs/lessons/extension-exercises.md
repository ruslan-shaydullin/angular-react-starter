# Extend the paired workshop without splitting behavior

Choose one extension with a clear shared invariant and two thin UI adapters. The exercise is complete when both frameworks behave alike, the domain remains independently testable, and snapshots remain valid after the new command.

## Source map

- [`shared/types.ts`](../../shared/types.ts)
- [`shared/commands.ts`](../../shared/commands.ts)
- [`shared/templates.ts`](../../shared/templates.ts)
- [`docs/WORKSHOP.md`](../../docs/WORKSHOP.md)

## Walk through the behavior

Candidate extensions include checklist reordering, a task comparison panel using `compareTasks`, a follow-up scheduler using `scheduleFollowup`, or a tag editor using `setTags`. Existing domain helpers provide starting points without requiring framework upgrades.

## Paired exercise

Write acceptance criteria first. Add domain cases for success, invalid input and persistence roundtrip. Implement the React control and Angular counterpart. Add one interaction test per adapter and repeat the keyboard/mobile browser checks.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Do not grow the shared model with component state such as an open menu or a focused input. If adding a backend, introduce an explicit repository boundary, authenticated identity and conflict semantics before attaching network calls to the existing synchronous reducer.

## Verify

`npm run verify && npm run check:builds`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
