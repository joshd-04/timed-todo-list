export default interface ITask {
  id: number;
  title: string;
  description: string;
  hours: number;
  minutes: number;
  seconds: number;
  dateAdded: Date;
  isActive: boolean;
  status: 'not started' | 'in progress' | 'paused' | 'finished';
  msRemaining: number | undefined;
}
