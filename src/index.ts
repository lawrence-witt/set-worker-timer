import WorkerTimeout from './lib/WorkerTimeout';

window.workerTimeout = 
    window.workerTimeout instanceof WorkerTimeout ? 
    window.workerTimeout : new WorkerTimeout();

const setWorkerTimeout = window.workerTimeout.setWorkerTimeout.bind(window.workerTimeout);
const clearWorkerTimeout = window.workerTimeout.clearWorkerTimeout.bind(window.workerTimeout);

export {
    setWorkerTimeout,
    clearWorkerTimeout
}