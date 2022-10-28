# Preview portable task exchange

CSV is a task interchange format with an exact ordered header. The parser supports quoted commas, doubled quotes, multiline cells and a UTF-8 BOM. It rejects malformed quoting, wrong row widths and invalid task fields before import.

## Source map

- [`shared/csv-export.ts`](../../shared/csv-export.ts)
- [`shared/csv-import.ts`](../../shared/csv-import.ts)
- [`react/src/workshop/Import.js`](../../react/src/workshop/Import.js)
- [`angular/src/app/workshop/Import.component.html`](../../angular/src/app/workshop/Import.component.html)

## Walk through the behavior

Export tasks, inspect the header, and paste the file into the import preview. Review the task count before applying. Add one invalid project id to a row and confirm no tasks are imported.

## Paired exercise

Create a title containing a comma and quotation marks. Export and preview it without losing the text. Try a formula-like title and inspect the protective apostrophe in the exported cell.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Spreadsheet formula escaping prioritizes safe opening in office tools; it can intentionally add a leading apostrophe to exported text. CSV adds new tasks with fresh identities and does not preserve comments, checklists or relationships. Use snapshots for full fidelity.

## Verify

`node tests/csv.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
