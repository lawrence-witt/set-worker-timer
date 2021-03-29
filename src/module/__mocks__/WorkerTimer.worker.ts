import { TimerMethod, TimeoutMap, CallMessage, SetMessage, ClearMessage } from '../WorkerTimer.types';

class TimeoutWorker {
    private _store: TimeoutMap = new Map();
    private _listener: ((ev: { data: CallMessage }) => void) | null = null;

    private _set(
        method: TimerMethod, 
        id: number, 
        delay: number
    ) {
        const call = () => {
            if (!this._listener) throw new Error('worker mock has not been provided an event listener.');
            this._listener({data: {type: 'call', payload: { id }}});
        }

        const timerId = method === 'timeout' ? (
            setTimeout(() => { call(); this._store.delete(id); }, delay)
        ) : (
            setInterval(call, delay)
        );

        this._store.set(id, { method, timerId });
    }

    private _clear(id: number) {
        const record = this._store.get(id);
        if (!record) return;

        record.method === 'timeout' ? (
            clearTimeout(record.timerId)
        ) : (
            clearInterval(record.timerId)
        );

        this._store.delete(id);
    }

    public postMessage(data: SetMessage | ClearMessage): void {
        if (data.type === "set") this._set(
            data.payload.method,
            data.payload.id, 
            data.payload.delay
        );
        if (data.type === "clear") this._clear(data.payload.id);
    }

    public addEventListener(ev: 'message', cb: (ev: { data: CallMessage }) => void): void {
        if (ev === 'message') this._listener = cb;
    }
}

export default TimeoutWorker;