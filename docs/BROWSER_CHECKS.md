# Browser acceptance scenarios

Run each scenario against Angular and React production previews. Use a clean browser context or export existing work before clearing storage. These checks complement component tests with actual focus, hash navigation, layout, and download behavior.

| Scenario | Action | Expected result |
| --- | --- | --- |
| Landmarks | Press Tab immediately after loading | Skip link is visible; activating it focuses the main workspace |
| Search | Open Tasks, type `queue`, then clear | One matching row, then twelve tasks and two pages |
| Completion guard | Open T-101, choose Done | Checklist error is announced and status remains In review |
| Recovery | Check acceptance criteria and choose Done | Status becomes Done; Undo restores In review |
| Project link | Open Projects, choose platform tasks | Project filter remains Platform reliability after navigation settles |
| Route reload | Reload `#/tasks/T-103` | Task detail reopens with the persisted workspace |
| Keyboard | Press `/`, then type `n` | Search receives focus; the typed letter does not open a form |
| Board | Move a task with Back/Next buttons | Keyboard-operable workflow updates with the same guards |
| Import | Preview malformed JSON snapshot | Errors appear; replacement remains disabled |
| Download | Export CSV and snapshot | Files download with the expected extension and inspectable contents |
| Mobile | Repeat at 375 × 812 | Main page has no horizontal overflow; table and board scroll locally |
| Zoom | Use 200% browser zoom | Labels and actions remain reachable without clipping |
| Motion | Enable reduced-motion preference | No automatic animation or smooth scrolling is required |

The deterministic reference date is 8 July 2022. Time stamps of user edits use the current clock. Browser storage is local to each origin, so applications on different ports intentionally retain separate workspaces.
