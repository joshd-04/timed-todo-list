import ITask from '../util/taskInterface';
import Task from './TaskSide';

export default function TaskList({ tasksArray }: { tasksArray: ITask[] }) {
  return (
    <div className="task-list">
      {tasksArray.map((task) => (
        <Task task={task} key={task.id} />
      ))}
    </div>
  );
}
