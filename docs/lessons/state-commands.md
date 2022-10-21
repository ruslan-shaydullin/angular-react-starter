# Design transactional commands

A command is a requested change, not an instruction to mutate a task in place. The reducer returns a result whose success flag and errors tell the adapter whether to update history, persistence and feedback.

## Source map

- [`shared/commands.ts`](../../shared/commands.ts)
- [`shared/result.ts`](../../shared/result.ts)
- [`shared/history.ts`](../../shared/history.ts)

## Walk through the behavior

Compare `task.edit`, `bulk.status`, and `csv.import`. Each validates before committing. Bulk completion retries selected prerequisites so checkbox order cannot change the result. A failed command preserves workspace identity and creates no activity.

## Paired exercise

Complete the checklists for T-101 and T-102, select them in both orders, and finish them together. Add a missing task to the selection at the domain boundary and confirm the entire transaction is rejected.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Transactions here are synchronous in-memory operations. A server-backed version would need revision checks, authorization and retry rules at the server boundary. The local revision counter alone does not provide multi-user concurrency control.

## Verify

`node tests/bulk.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
