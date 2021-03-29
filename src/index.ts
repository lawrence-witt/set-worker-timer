import WorkerTimer from './module/WorkerTimer';
import { TimerCallback } from './module/WorkerTimer.types';

window.workerTimer = 
    window.workerTimer instanceof WorkerTimer ? 
    window.workerTimer : new WorkerTimer();

const setWorkerTimer = window.workerTimer.setWorkerTimer.bind(window.workerTimer);
const clearWorkerTimer = window.workerTimer.clearWorkerTimer.bind(window.workerTimer);

export const setWorkerTimeout = (
    cb: TimerCallback, 
    delay?: number, 
    ...args: any[]
): number => setWorkerTimer('timeout', cb, delay, ...args);
export const clearWorkerTimeout = (id: number): void => clearWorkerTimer(id);

export const setWorkerInterval = (
    cb: TimerCallback, 
    delay?: number, 
    ...args: any[]
): number => setWorkerTimer('interval', cb, delay, ...args);
export const clearWorkerInterval = (id: number): void => clearWorkerTimer(id);