import { createBrowserRouter } from 'react-router-dom';
import Root from './pages/Root';
import NotFound from './pages/NotFound';
import NewTaskForm from './pages/NewTaskForm';
import NoTasksOpen from './pages/NoTasksOpen';
import TaskPage from './pages/TaskPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <NoTasksOpen />,
      },
      {
        path: '/new-task',
        element: <NewTaskForm />,
      },
      {
        path: '/tasks/:taskId',
        element: <TaskPage />,
      },
    ],
  },
]);

export default router;
