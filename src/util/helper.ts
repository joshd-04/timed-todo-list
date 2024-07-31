import ITask from './taskInterface';

export function validate(task: ITask, tasksArray: ITask[]) {
  if (task.title.length === 0)
    return { valid: false, reason: 'Task must have a title!' };
  if (task.description.length === 0)
    return { valid: false, reason: 'Task must have a description!' };
  if (!task.hours && !task.minutes && !task.seconds)
    return { valid: false, reason: 'Task must have a time length!' };

  if (isDuplicate(task, tasksArray))
    return { valid: false, reason: 'Tasks must have unique titles' };
  return { valid: true, reason: 'Passed all checks' };
}

function isDuplicate(task: ITask, taskArray: ITask[]) {
  return taskArray.filter((t) => t.title === task.title).length > 0;
}

export function formatDate(date: Date) {
  return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1)
    .toString()
    .padStart(2, '0')}/${date.getFullYear().toString().slice(2)}`;
}

export function formatTime(hours: number, minutes: number, seconds: number) {
  const h = hours.toString().padStart(2, '0');
  const m = minutes.toString().padStart(2, '0');
  const s = seconds.toString().padStart(2, '0');

  return `${h === '00' ? '' : `${h}:`}${m}:${s}`;
}

export function formatTimeRemaining(task: ITask) {
  if (task.msRemaining === undefined)
    return formatTime(task.hours, task.minutes, task.seconds);

  if (task.msRemaining <= 0) return formatTime(0, 0, 0);

  let secRemaining = task.msRemaining / 1000;
  const hours = Math.floor(secRemaining / 3600);

  secRemaining = secRemaining - hours * 3600;
  const minutes = Math.floor(secRemaining / 60);

  secRemaining = secRemaining - minutes * 60;
  const seconds = Math.floor(secRemaining);

  return formatTime(hours, minutes, seconds);
}

export function updateTask(
  taskId: number,
  tasksArray: ITask[],
  newAttributes: Partial<ITask>
) {
  const newArray = tasksArray.map((t) => {
    if (t.id !== taskId) return t;
    for (const attribute of Object.entries(newAttributes)) {
      //@ts-expect-error string not able to index object but  works fine in js not in ts.
      t[attribute[0]] = attribute[1];
    }
    return t;
  });
  return newArray;
}
