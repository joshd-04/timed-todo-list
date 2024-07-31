import { Link, useNavigate } from 'react-router-dom';
import TaskList from './TaskList';
import ITask from '../util/taskInterface';

interface SidePanelProps {
  tasksArray: ITask[];
}

export default function SidePanel({ tasksArray }: SidePanelProps) {
  return (
    <div className="side-panel">
      <Top />
      <hr />
      <TaskList tasksArray={tasksArray} />
    </div>
  );
}

function Top() {
  const navigator = useNavigate();
  function handleClick() {
    navigator('/new-task');
  }

  return (
    <div className="top">
      <h1>
        <Link to="/" className="link">
          Your Tasks
        </Link>
      </h1>
      <button onClick={handleClick}>+ New</button>
    </div>
  );
}
