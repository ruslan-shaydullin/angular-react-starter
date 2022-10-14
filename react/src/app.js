import './workshop/workshop.css';
import { WorkshopProvider } from './workshop/store';
import Shell from './workshop/Shell';
import Workspace from './workshop/Workspace';
import { WorkshopBoundary } from './workshop/EmptyState';
export default function App() {
  return (
    <WorkshopBoundary>
      <WorkshopProvider>
        <Shell>
          <Workspace />
        </Shell>
      </WorkshopProvider>
    </WorkshopBoundary>
  );
}
