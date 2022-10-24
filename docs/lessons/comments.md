# Render discussion text safely

Discussion entries carry an author id, timestamp and plain text. The UI uses normal framework text interpolation, so markup-looking comments are displayed literally instead of being injected as HTML.

## Source map

- [`shared/comments.ts`](../../shared/comments.ts)
- [`react/src/workshop/Comments.js`](../../react/src/workshop/Comments.js)
- [`angular/src/app/workshop/Comments.component.html`](../../angular/src/app/workshop/Comments.component.html)

## Walk through the behavior

Add a review decision, switch the comment author, and add another. Submit empty text to see validation. A successful submission clears its input; a rejected submission retains the text for correction.

## Paired exercise

Enter `<b>Review evidence</b>` and verify the literal angle brackets remain visible. Inspect the DOM to confirm that no new bold element is created by the comment.

Run the scenario in Angular and React with separate clean browser workspaces. Compare the visible result and the shared command outcome. A mismatch belongs in the adapter unless the common domain rule itself is wrong.

## Design boundary

The selected author is fictional workshop context, not authentication. A server-backed product must derive author identity from an authenticated session and enforce permissions on the server rather than trusting this form field.

## Verify

`node tests/comments.test.cjs && npm --prefix react test -- --runInBand CommentFlow`

Return to the [lesson index](INDEX.md) or the [workshop overview](../WORKSHOP.md).
