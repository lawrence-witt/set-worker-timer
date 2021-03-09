import Worker from './WorkerTimeout.worker.ts';
import { CallbackMap, CallMessage } from './WorkerTimeout.types';

class TimeoutWorker {
    private _worker = new Worker();
    private _cbMap: CallbackMap = new Map();

    constructor() {
        this._worker.addEventListener(
            'message', 
            (ev: MessageEvent<CallMessage>) => {
            this._callId(ev);
        });
    }

    /* 
    *   Private Methods
    */

    private _genId() {
        let id = Math.random();
        while (this._cbMap.has(id)) {
            id = Math.random();
        }
        return id;
    }

    private _callId(ev: MessageEvent<CallMessage>) {
        const id = ev.data.payload.id;
        const cb = this._cbMap.get(id);

        if (cb) { cb(); this._cbMap.delete(id); }
    }

    /* 
    *   Public Methods
    */

    public setWorkerTimeout(cb: () => void, delay?: number): number {
        const id = this._genId();
        this._cbMap.set(id, cb);
        this._worker.postMessage({type: 'set', payload: { id, delay: delay || 0 }});
        return id;
    }

    public clearWorkerTimeout(id: number): void {
        this._cbMap.delete(id);
        this._worker.postMessage({type: 'clear', payload: { id }});
    }
}

export default TimeoutWorker;