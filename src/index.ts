import WorkerTimer from './lib/WorkerTimer';
import { TimerCallback } from './lib/WorkerTimer.types';

window.workerTimer = 
    window.workerTimer instanceof WorkerTimer ? 
    window.workerTimer : new WorkerTimer();

const setWorkerTimer = window.workerTimer.setWorkerTimer.bind(window.workerTimer);
const clearWorkerTimer = window.workerTimer.clearWorkerTimer.bind(window.workerTimer);

const setWorkerTimeout = (
    cb: TimerCallback, 
    delay?: number, 
    ...args: any[]
) => setWorkerTimer('timeout', cb, delay, ...args);
const clearWorkerTimeout = (id: number) => clearWorkerTimer(id);

const setWorkerInterval = (
    cb: TimerCallback, 
    delay?: number, 
    ...args: any[]
) => setWorkerTimer('interval', cb, delay, ...args);
const clearWorkerInterval = (id: number) => clearWorkerTimer(id);

export {
    setWorkerTimeout,
    clearWorkerTimeout,
    setWorkerInterval,
    clearWorkerInterval
}