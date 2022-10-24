# Protect the dependency graph

Dependencies form a directed graph. Before adding an edge, the domain searches for a path back to the edited task. Direct self-reference and longer cycles are rejected, and missing task ids cannot enter the graph.

## Source map

- [`shared/dependencies.ts`](../../shared/dependencies.ts)
- [`shared/relations.ts`](../../shared/relations.ts)
- [`shared/edit-task.ts`](../../shared/edit-task.ts)
- [`tests/dependencies.test.cjs`](../../tests/dependencies.test.cjs)

## Walk through the behavior

T-102 depends on T-101, and T-105 depends on T-102. Try making T-101 depend on T-105. Then remove a valid dependency and inspect the dependent-task summary in the detail panel.

## Paired exercise

Finish a prerequisite and observe which task becomes eligible for completion. Try moving a milestone task to another project; the editor requires removing its release membership first to preserve snapshot validity.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Cross-project dependencies are allowed, but milestone membership is project-specific. The workshop guards a project move that would invalidate an existing milestone. This preserves a complete export/import roundtrip after successful edits.

## Verify

`node tests/dependencies.test.cjs && node tests/editing.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
