import WorkerTimeout from './lib/WorkerTimeout';

declare global {
    interface Window { 
        workerTimeout: WorkerTimeout; 
    }
}

export {};