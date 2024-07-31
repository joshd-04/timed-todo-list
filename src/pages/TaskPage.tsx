import { useOutletContext, useParams } from 'react-router-dom';
import { OutletContextType } from './Root';
import TaskPageDetailed from './TaskPageDetailed';

export default function TaskPage() {
  const context = useOutletContext<OutletContextType>();
  const { taskId } = useParams();

  const activeTaskArr = context.tasksArray.filter(
    (t) => t.id === Number(taskId)
  );
  if (activeTaskArr.length === 0) {
    return (
      <h1 className="task-error">
        <ErrorSvg />
        Invalid ID: No tasks matching that ID!
      </h1>
    );
  }
  if (activeTaskArr.length > 1) {
    return (
      <h1 className="task-error">
        <ErrorSvg />
        Error with ID: Multiple tasks with matching ID found!
      </h1>
    );
  }

  const activeTask = activeTaskArr[0];

  return <TaskPageDetailed task={activeTask} />;
}

function ErrorSvg() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="50px"
      viewBox="0 -960 960 960"
      width="50px"
      fill="#ff0000"
    >
      <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
    </svg>
  );
}
