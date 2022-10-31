import { DEFAULT_FILTERS } from './shared/types';
import { useWorkshop } from './store';
import { projectRollups } from './shared/project-rollups';
export default function Projects({ onEdit }) {
  const { state, navigate } = useWorkshop();
  return (
    <section className="panel">
      <h2>Projects</h2>
      <div className="project-grid">
        {projectRollups(state).map((project) => (
          <article
            key={project.id}
            className="project-card"
            style={{ borderTopColor: project.color }}
          >
            <h3>{project.name}</h3>
            <p>{project.description}</p>
            <label>
              {project.completed} of {project.total} tasks complete
              <progress value={project.progress} max="100">
                {project.progress}%
              </progress>
            </label>
            <p>
              {project.effort.remaining} points remaining • {project.members.length} owners
            </p>
            <div className="row">
              <button
                onClick={() => {
                  navigate('tasks', '', { ...DEFAULT_FILTERS, projectId: project.id });
                }}
              >
                View project tasks
              </button>
              <button onClick={() => onEdit(project)}>Edit project</button>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
