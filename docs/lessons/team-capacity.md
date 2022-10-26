# Explain workload before changing ownership

A member’s workload is the sum of estimates on active unfinished tasks. Available capacity is clamped at zero; overload is shown separately, and unestimated tasks remain visible as uncertainty.

## Source map

- [`shared/workload.ts`](../../shared/workload.ts)
- [`shared/capacity.ts`](../../shared/capacity.ts)
- [`react/src/workshop/CapacityEditor.js`](../../react/src/workshop/CapacityEditor.js)
- [`angular/src/app/workshop/Workload.component.html`](../../angular/src/app/workshop/Workload.component.html)

## Walk through the behavior

Lower Liam’s capacity to five points. The report shows eleven points over capacity while keeping task owners unchanged. Set capacity to zero to represent an unavailable person.

## Paired exercise

Use bulk assignment to redistribute selected work, then inspect both members’ totals. Add a new team member and verify that their initial workload is zero.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Capacity is an explicit planning input, not a performance score. Automatically moving assignments would hide a decision that needs human context. The workshop reports pressure and leaves reassignment as a separate command.

## Verify

`node tests/workload.test.cjs && node tests/capacity.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
