import { Outlet, useLocation } from 'react-router-dom';
import SidePanel from '../components/SidePanel';
import { useEffect, useState } from 'react';
import ITask from '../util/taskInterface';
import { SidebarContext } from '../util/sidebarContext';
import { themeHandler } from '../util/themeHandler';
import MobileWarning from '../components/MobileWarning';

export type OutletContextType = {
  tasksArray: ITask[];
  addTask: (task: ITask) => void;
  setTasksArray: React.Dispatch<React.SetStateAction<ITask[]>>;
};

type Theme = 'light' | 'dark';

export default function Root() {
  const [tasksArray, setTasksArray] = useState<ITask[]>([]);
  const [readyToStartSaving, setReadyToStartSaving] = useState(false);
  const [readyToStartChangingTheme, setReadyToStartChangingTheme] =
    useState(false);
  const [theme, setTheme] = useState<Theme>('dark');
  const [firstTenSeconds, setFirstTenSeconds] = useState(true);

  // on mount (loading / getting from local storage)
  useEffect(() => {
    let data: ITask[];
    const raw = localStorage.getItem('data');
    if (raw !== null) {
      data = JSON.parse(raw);
    } else data = [];

    data = data.map((el) => {
      return {
        ...el,
        dateAdded: new Date(el.dateAdded),
        status: el.status === 'in progress' ? 'paused' : el.status,
      };
    });

    setTasksArray(data);

    // get theme
    const themeFromLS = localStorage.getItem('theme');
    if (
      themeFromLS !== null &&
      (themeFromLS === 'light' || themeFromLS === 'dark')
    ) {
      setTheme(themeFromLS);
    }

    setTimeout(() => {
      setReadyToStartSaving(true);
      setReadyToStartChangingTheme(true);
    }, 100);
  }, []);

  useEffect(() => {
    if (readyToStartSaving) {
      localStorage.setItem('data', JSON.stringify(tasksArray));
    }
  }, [tasksArray, readyToStartSaving]);

  // dark mode handling
  useEffect(() => {
    themeHandler(theme, readyToStartChangingTheme);
  }, [theme, readyToStartChangingTheme]);

  // mobile warning countdown handling
  useEffect(() => {
    const timeout = setTimeout(() => {
      setFirstTenSeconds(false);
    }, 10_000);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  function addTask(task: ITask) {
    setTasksArray([...tasksArray, task]);
  }

  function toggleTheme() {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('light');
  }

  const location = useLocation();
  const firstPartLocation = location.pathname
    .split('/')
    .filter((el) => el.length > 0)[0];

  return (
    <>
      <div className="app">
        <SidebarContext.Provider value={{ tasksArray, setTasksArray }}>
          <SidePanel tasksArray={tasksArray} />
        </SidebarContext.Provider>
        <div
          className={`dynamic-panel ${
            firstPartLocation === 'tasks' && 'dp-top'
          }`}
        >
          <Outlet
            context={
              {
                addTask,
                tasksArray,
                setTasksArray,
              } satisfies OutletContextType
            }
          />
        </div>
      </div>
      <button className={`theme-toggle ${theme}-mode`} onClick={toggleTheme}>
        {theme === 'dark' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            fill="#5f6368"
          >
            <path d="M480-360q50 0 85-35t35-85q0-50-35-85t-85-35q-50 0-85 35t-35 85q0 50 35 85t85 35Zm0 80q-83 0-141.5-58.5T280-480q0-83 58.5-141.5T480-680q83 0 141.5 58.5T680-480q0 83-58.5 141.5T480-280ZM200-440H40v-80h160v80Zm720 0H760v-80h160v80ZM440-760v-160h80v160h-80Zm0 720v-160h80v160h-80ZM256-650l-101-97 57-59 96 100-52 56Zm492 496-97-101 53-55 101 97-57 59Zm-98-550 97-101 59 57-100 96-56-52ZM154-212l101-97 55 53-97 101-59-57Zm326-268Z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="36px"
            viewBox="0 -960 960 960"
            width="36px"
            fill="#5f6368"
          >
            <path d="M480-120q-150 0-255-105T120-480q0-150 105-255t255-105q14 0 27.5 1t26.5 3q-41 29-65.5 75.5T444-660q0 90 63 153t153 63q55 0 101-24.5t75-65.5q2 13 3 26.5t1 27.5q0 150-105 255T480-120Z" />
          </svg>
        )}
      </button>
      {firstTenSeconds && <MobileWarning />}
    </>
  );
}
