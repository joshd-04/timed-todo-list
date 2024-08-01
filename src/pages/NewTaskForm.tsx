import { useEffect, useState } from 'react';
import { validate } from '../util/helper';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { OutletContextType } from './Root';
import ITask from '../util/taskInterface';

export default function NewTaskForm() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [hours, setHours] = useState('');
  const [minutes, setMinutes] = useState('');
  const [seconds, setSeconds] = useState('');

  const [error, setError] = useState('');

  const { addTask, tasksArray } = useOutletContext<OutletContextType>();
  const navigator = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => setError(''), 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [error]);

  function resetInputs() {
    setTitle('');
    setDescription('');
    setHours('');
    setMinutes('');
    setSeconds('');
  }

  function handleCancel() {
    resetInputs();
    navigator('/');
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nextId = tasksArray[tasksArray.length - 1]?.id + 1 || 1;
    const data: ITask = {
      id: nextId,
      title,
      description,
      hours: Number(hours),
      minutes: Number(minutes),
      seconds: Number(seconds),
      dateAdded: new Date(),
      isActive: false,
      status: 'not started',
      msRemaining: undefined,
    };

    const result = validate(data, tasksArray);
    if (result.valid) {
      addTask(data);
      navigator(`/tasks/${data.id}`);
    } else {
      setError(result.reason);
    }

    // TODO: error messages for validation
  }

  return (
    <>
      <form onSubmit={(e) => handleSubmit(e)}>
        <h1>Create new task</h1>
        <span className="inline">
          <p>Enter task title:</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="title-input"
          />
        </span>
        <span>
          <p>Enter task description:</p>
          <textarea
            rows={6}
            cols={30}
            maxLength={1000}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </span>
        <span>
          <p>Enter time to complete task:</p>
          <div className="time-input">
            <input
              type="number"
              placeholder="HH"
              max={99}
              min={0}
              value={hours}
              onChange={(e) =>
                setHours(e.target.value !== '0' ? e.target.value : '')
              }
            />
            <p>:</p>
            <input
              type="number"
              placeholder="MM"
              max={59}
              min={0}
              value={minutes}
              onChange={(e) =>
                setMinutes(e.target.value !== '0' ? e.target.value : '')
              }
            />
            <p>:</p>
            <input
              type="number"
              placeholder="SS"
              max={59}
              min={0}
              value={seconds}
              onChange={(e) =>
                setSeconds(e.target.value !== '0' ? e.target.value : '')
              }
            />
          </div>
        </span>
        <button type="submit">Submit</button>
        <button
          type="button"
          className="secondary-button"
          onClick={handleCancel}
        >
          Cancel
        </button>
      </form>
      {error.length > 0 && (
        <div className="formError">
          {/* {error.length > 0 && <h1>{error}</h1>} */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="60px"
            viewBox="0 -960 960 960"
            width="60px"
            fill="#fff"
          >
            <path
              d="m40-120 440-760 440 760H40Zm104-60h672L480-760 144-180Zm340.18-57q12.82 0 21.32-8.68 8.5-8.67 8.5-21.5 0-12.82-8.68-21.32-8.67-8.5-21.5-8.5-12.82 0-21.32 8.68-8.5 8.67-8.5 21.5 0 12.82 8.68 21.32 8.67 8.5 21.5 8.5ZM454-348h60v-224h-60v224Zm26-122Z"
              stroke="white"
              strokeWidth="40px"
              strokeLinejoin="round"
            />
          </svg>

          <div>
            <h1>Error!</h1>
            <p>{error}</p>
          </div>
        </div>
      )}
    </>
  );
}
