import { useWorkshop } from './store';
import { filterTasks } from './shared/filters';
import { paginate } from './shared/pagination';
export default function Pagination() {
  const { state, filters, page, setPage } = useWorkshop();
  const result = paginate(
    filterTasks(state, filters).filter(
      (task) => state.preferences.showCompleted || task.status !== 'done'
    ),
    page,
    6
  );
  return (
    <div className="pagination" aria-label="Task pages">
      <p aria-live="polite">
        Showing {result.start}–{result.end} of {result.total} tasks
      </p>
      <div className="row">
        <button disabled={!result.hasPrevious} onClick={() => setPage(result.page - 1)}>
          Previous page
        </button>
        <span>
          Page {result.page} of {result.pageCount}
        </span>
        <button disabled={!result.hasNext} onClick={() => setPage(result.page + 1)}>
          Next page
        </button>
      </div>
    </div>
  );
}
