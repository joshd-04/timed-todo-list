import ITask from './taskInterface';

export const tasksData: ITask[] = [
  {
    id: 1,
    title: 'Wash dishes',
    description: 'Wash all plates, be gentle with the glass dishes',
    hours: 0,
    minutes: 5,
    seconds: 0,
    dateAdded: new Date('2024-07-29'),
    isActive: true,
    status: 'not started',
    msRemaining: undefined,
  },
  {
    id: 2,
    title: 'Clean the car',
    description: 'Inside and out',
    hours: 1,
    minutes: 30,
    seconds: 0,
    dateAdded: new Date('2024-07-29'),
    isActive: false,
    status: 'not started',
    msRemaining: undefined,
  },
  {
    id: 3,
    title: 'Super fast task',
    description:
      'Officia do magna elit voluptate cillum elit sit sint ut incididunt. Nulla occaecat reprehenderit ullamco ullamco ea ea duis. Laboris et sint qui esse anim tempor consectetur nulla ipsum nulla magna officia sit deserunt. Mollit aliquip veniam mollit et.',
    hours: 0,
    minutes: 0,
    seconds: 20,
    dateAdded: new Date('2024-07-31'),
    isActive: false,
    status: 'not started',
    msRemaining: undefined,
  },
];
