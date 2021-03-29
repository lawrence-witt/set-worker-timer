import Worker from './WorkerTimer.worker.ts';
import {
    TimerMethod,
    TimerCallback,
    CallbackMap, 
    CallMessage 
} from './WorkerTimer.types';

class WorkerTimer {
    private _worker = new Worker();
    private _cbMap: CallbackMap = new Map();

    constructor() {
        this._worker.addEventListener(
            'message', 
            (ev: MessageEvent<CallMessage>) => {
            this._callId(ev);
        });
    }

    private _genId() {
        let id = Math.random();

        while (this._cbMap.has(id)) {
            id = Math.random();
        }
        
        return id;
    }

    private _callId(
        ev: MessageEvent<CallMessage>
    ) {
        const id = ev.data.payload.id;
        const record = this._cbMap.get(id);

        if (!record) return;

        typeof record.cb === 'string' ? 
        eval(record.cb)(...record.args) : record.cb(...record.args);
        
        if (record.method === "timeout") this._cbMap.delete(id); 
    }

    public setWorkerTimer(
        method: TimerMethod,
        cb: TimerCallback, 
        delay?: number, 
        ...args: any[]
    ): number {
        const id = this._genId();

        this._cbMap.set(id, { method, cb, args });
        this._worker.postMessage({
            type: 'set', 
            payload: { method, id, delay: delay || 0 }
        });

        return id;
    }

    public clearWorkerTimer(
        id: number
    ): void {
        if (!id || typeof id !== "number") return;

        this._cbMap.delete(id);
        this._worker.postMessage({
            type: 'clear', 
            payload: { id }
        });
    }
}

export default WorkerTimer;