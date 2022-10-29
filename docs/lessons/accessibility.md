# Verify complete keyboard paths

Accessibility begins with semantic controls: buttons for actions, labels for inputs, a main landmark, current-page navigation and an announced error area. The board supports its entire workflow without pointer dragging.

## Source map

- [`shared/workshop.css`](../../shared/workshop.css)
- [`shared/keyboard.ts`](../../shared/keyboard.ts)
- [`docs/BROWSER_CHECKS.md`](../../docs/BROWSER_CHECKS.md)

## Walk through the behavior

Start from a fresh page and use Tab to reveal the skip link. Activate it, navigate to Tasks, open a detail, edit a checklist and change status. Inspect the announced validation and success feedback.

## Paired exercise

Press `/` to focus search. Type `n` while the search box is focused and verify that no new-task editor opens. Enable reduced-motion preferences and repeat navigation at 200% zoom.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

Component tests verify labels and behavior, but real-browser checks are necessary for focus movement, zoom, scrolling and assistive-technology announcements. A complete accessibility audit also needs manual screen-reader testing with representative users.

## Verify

`node tests/routes.test.cjs`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
