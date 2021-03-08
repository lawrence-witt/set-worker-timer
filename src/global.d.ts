import WorkerTimeout from './WorkerTimeout';

declare global {
    interface Window { 
        workerTimeout: WorkerTimeout; 
    }
}

export {};