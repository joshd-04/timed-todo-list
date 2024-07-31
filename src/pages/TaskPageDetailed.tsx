import { useNavigate, useOutletContext } from 'react-router-dom';
import {
  formatDate,
  formatTime,
  formatTimeRemaining,
  updateTask,
} from '../util/helper';
import ITask from '../util/taskInterface';
import { OutletContextType } from './Root';
import { useEffect, useState } from 'react';

export default function TaskPageDetailed({ task }: { task: ITask }) {
  // Use state variable to store opened task, when updated, component will rerender
  const [activeTask, setActiveTask] = useState(task);

  // context used to teleport data from higher in the tree to here, navigator used to redirect user
  const context = useOutletContext<OutletContextType>();
  const navigator = useNavigate();

  // Runs on mount + every time the task prop changes
  useEffect(() => {
    // when the task prop changes, the opened task has changed, we need to change the state variable accordingly
    setActiveTask(task);
  }, [task]);

  useEffect(() => {
    // every second, reduce msRemaining by 1000ms
    const countDown = setInterval(() => {
      if (
        activeTask.msRemaining === undefined ||
        activeTask.status === 'not started'
      )
        return;

      // might not be the most optimal solution, but add 1s to the expectedtimecompletion every second when paused
      if (activeTask.status === 'paused') return;

      // const newArray = updateTask(activeTask.id, context.tasksArray, {
      //   msRemaining: activeTask.msRemaining - 1000,
      // });
      // context.setTasksArray(newArray);

      if (activeTask.msRemaining <= 0) {
        const newArray = updateTask(activeTask.id, context.tasksArray, {
          status: 'finished',
        });
        context.setTasksArray(newArray);
      }
    }, 1000);

    // clear the interval (performance and memory reasons)
    return () => {
      clearInterval(countDown);
    };
  }, [activeTask.msRemaining, activeTask.id, context, activeTask.status]);

  function handleStart() {
    // calculate milliseconds to add to current time in order to calculate finish time
    const timeMsToAdd =
      (activeTask.hours * 3600 + activeTask.minutes * 60 + activeTask.seconds) *
      1000;

    // use the helper function to update the tasksarray state (triggers rerender)
    const newArray = updateTask(activeTask.id, context.tasksArray, {
      msRemaining: timeMsToAdd,
      status: 'in progress',
    });
    context.setTasksArray(newArray);
  }

  function handlePause() {
    const newArray = updateTask(activeTask.id, context.tasksArray, {
      status: 'paused',
    });
    context.setTasksArray(newArray);
  }

  function handleResume() {
    const newArray = updateTask(activeTask.id, context.tasksArray, {
      status: 'in progress',
    });
    context.setTasksArray(newArray);
  }

  function handleReset() {
    const timeMsToAdd =
      (activeTask.hours * 3600 + activeTask.minutes * 60 + activeTask.seconds) *
      1000;
    const newArray = updateTask(activeTask.id, context.tasksArray, {
      msRemaining: timeMsToAdd,
      status: 'not started',
    });
    context.setTasksArray(newArray);
  }

  function handleDelete() {
    const newTasksArray = context.tasksArray.filter((t) => t !== activeTask);
    context.setTasksArray(newTasksArray);
    navigator('/');
  }

  let statusClass = 'not-started';
  if (activeTask.status === 'in progress') statusClass = 'in-progress';
  else if (activeTask.status === 'finished') statusClass = 'finished';
  else if (activeTask.status === 'paused') statusClass = 'paused';

  let resetBtn: JSX.Element;
  if (activeTask.status === 'not started')
    resetBtn = (
      <button disabled onClick={handleReset}>
        Reset
      </button>
    );
  else {
    resetBtn = <button onClick={handleReset}>Reset</button>;
  }

  return (
    <div className="task-page">
      <div className="top">
        <p className={`status ${statusClass}`}>Status: {activeTask.status}</p>
        <p className="status">
          {/* Time left: {formatTime(activeTask.hours, activeTask.minutes, activeTask.seconds)} */}
          Time left:{' '}
          {formatTimeRemaining(activeTask) ||
            formatTime(
              activeTask.hours,
              activeTask.minutes,
              activeTask.seconds
            )}
        </p>
      </div>
      <hr />
      <div className="task-body">
        <div className="task-title-bar">
          <h1>{activeTask.title}</h1>
          {activeTask.status === 'not started' && (
            <button onClick={handleStart} className="start-btn">
              Start
            </button>
          )}
          {activeTask.status === 'in progress' && (
            <button className="pause-btn" onClick={handlePause}>
              Pause
            </button>
          )}
          {activeTask.status === 'paused' && (
            <button className="resume-btn" onClick={handleResume}>
              Resume
            </button>
          )}
        </div>
        <div className="task-details">
          <p>Description</p>
          <p>{activeTask.description}</p>
        </div>
        <div className="task-stats">
          <p>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#5f6368"
              >
                <path d="M200-80q-33 0-56.5-23.5T120-160v-560q0-33 23.5-56.5T200-800h40v-80h80v80h320v-80h80v80h40q33 0 56.5 23.5T840-720v560q0 33-23.5 56.5T760-80H200Zm0-80h560v-400H200v400Zm0-480h560v-80H200v80Zm0 0v-80 80Zm280 240q-17 0-28.5-11.5T440-440q0-17 11.5-28.5T480-480q17 0 28.5 11.5T520-440q0 17-11.5 28.5T480-400Zm-160 0q-17 0-28.5-11.5T280-440q0-17 11.5-28.5T320-480q17 0 28.5 11.5T360-440q0 17-11.5 28.5T320-400Zm320 0q-17 0-28.5-11.5T600-440q0-17 11.5-28.5T640-480q17 0 28.5 11.5T680-440q0 17-11.5 28.5T640-400ZM480-240q-17 0-28.5-11.5T440-280q0-17 11.5-28.5T480-320q17 0 28.5 11.5T520-280q0 17-11.5 28.5T480-240Zm-160 0q-17 0-28.5-11.5T280-280q0-17 11.5-28.5T320-320q17 0 28.5 11.5T360-280q0 17-11.5 28.5T320-240Zm320 0q-17 0-28.5-11.5T600-280q0-17 11.5-28.5T640-320q17 0 28.5 11.5T680-280q0 17-11.5 28.5T640-240Z" />
              </svg>
            </span>{' '}
            Date added: {formatDate(activeTask.dateAdded)}
          </p>
          <p>
            <span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="30px"
                viewBox="0 -960 960 960"
                width="30px"
                fill="#5f6368"
              >
                <path d="M360-840v-80h240v80H360Zm80 440h80v-240h-80v240Zm40 320q-74 0-139.5-28.5T226-186q-49-49-77.5-114.5T120-440q0-74 28.5-139.5T226-694q49-49 114.5-77.5T480-800q62 0 119 20t107 58l56-56 56 56-56 56q38 50 58 107t20 119q0 74-28.5 139.5T734-186q-49 49-114.5 77.5T480-80Zm0-80q116 0 198-82t82-198q0-116-82-198t-198-82q-116 0-198 82t-82 198q0 116 82 198t198 82Zm0-280Z" />
              </svg>
            </span>
            Time to complete:{' '}
            {formatTime(
              activeTask.hours,
              activeTask.minutes,
              activeTask.seconds
            )}
          </p>
        </div>
        <div className="task-extra-buttons">
          {resetBtn}
          <button className="delete-btn" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
