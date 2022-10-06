import {screen,fireEvent,within} from '@testing-library/react';
import {renderWorkshop,storedWorkspace,changeRoute,openTask} from './testHelpers';

test('hash routes expose distinct workspace views and current links',()=>{renderWorkshop();changeRoute('#/team');expect(screen.getByRole('heading',{name:'People and responsibilities'})).toBeInTheDocument();expect(screen.getByRole('link',{name:'Team'})).toHaveAttribute('aria-current','page');changeRoute('#/releases');expect(screen.getByRole('heading',{name:'Release readiness'})).toBeInTheDocument();});
test('task query links restore filters and unknown task ids have a recovery action',()=>{renderWorkshop('#/tasks?projectId=portal&status=doing');expect(screen.getByRole('combobox',{name:'Project'})).toHaveValue('portal');expect(screen.getByText('Showing 1–1 of 1 tasks')).toBeInTheDocument();changeRoute('#/tasks/missing');expect(screen.getByRole('heading',{name:'Task not found'})).toBeInTheDocument();});
