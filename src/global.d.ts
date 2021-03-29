import WorkerTimer from './module/WorkerTimer';

declare global {
    interface Window { 
        workerTimer: WorkerTimer; 
    }
}

export {};