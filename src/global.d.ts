import WorkerTimer from './lib/WorkerTimer';

declare global {
    interface Window { 
        workerTimer: WorkerTimer; 
    }
}

export {};