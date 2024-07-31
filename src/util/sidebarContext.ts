import { createContext } from 'react';

import ITask from './taskInterface';

interface ISidebarContext {
  tasksArray: ITask[];
  setTasksArray: React.Dispatch<React.SetStateAction<ITask[]>>;
}

export const SidebarContext = createContext<ISidebarContext | undefined>(
  undefined
);
