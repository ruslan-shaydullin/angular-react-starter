# Trace the shared domain boundary

A shared model prevents the two examples from disagreeing about what a task, dependency or release means. The domain imports no framework code. Angular consumes TypeScript copies; React consumes compiler-generated JavaScript inside CRA’s source boundary.

## Source map

- [`shared/types.ts`](../../shared/types.ts)
- [`shared/commands.ts`](../../shared/commands.ts)
- [`scripts/sync-shared.cjs`](../../scripts/sync-shared.cjs)
- [`react/src/workshop/store.js`](../../react/src/workshop/store.js)
- [`angular/src/app/workshop/store.service.ts`](../../angular/src/app/workshop/store.service.ts)

## Walk through the behavior

Start at a status select in each UI. Follow the adapter dispatch into `execute`, then `transitionTask`, then the immutable result. A successful command adds activity and enters history. A failure returns the original workspace with user-facing errors.

## Paired exercise

Draw the path from a form event to persistence. Add an invariant to the shared validator and observe it in both applications without changing either form. Verify generated parity after the change.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Generated files are disposable outputs. Importing directly from outside CRA’s `src` directory or maintaining two hand-edited model copies undermines this exercise. UI-only concerns such as open panels and selected rows remain in the adapters.

## Verify

`npm run check && npm test`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
