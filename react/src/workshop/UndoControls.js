import { useWorkshop } from './store';
export default function UndoControls() {
  const { history, undo, redo } = useWorkshop();
  return (
    <div className="row undo-controls" aria-label="Workspace history">
      <button disabled={!history.past.length} onClick={undo}>
        Undo change
      </button>
      <button disabled={!history.future.length} onClick={redo}>
        Redo change
      </button>
      <small>
        {history.past.length} changes available to undo. History resets when the page reloads.
      </small>
    </div>
  );
}
