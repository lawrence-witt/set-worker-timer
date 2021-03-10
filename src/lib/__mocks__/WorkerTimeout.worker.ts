import { TimeoutMap, CallMessage, SetMessage, ClearMessage } from '../WorkerTimeout.types';

class TimeoutWorker {
    private _store: TimeoutMap = new Map();
    private _listener: ((ev: { data: CallMessage }) => void) | null = null;

    private _set(id: number, delay: number) {
        this._store.set(id, setTimeout(() => {
            if (this._listener) this._listener({data: {type: 'call', payload: { id }}});
            this._store.delete(id);
        }, delay));
    }

    private _clear(id: number) {
        const record = this._store.get(id);
        if (!record) return;
    
        clearTimeout(record);
        this._store.delete(id);
    }

    public postMessage(data: SetMessage | ClearMessage) {
        switch (data.type) {
            case "set":
                this._set(data.payload.id, data.payload.delay);
                break;
            case "clear":
                this._clear(data.payload.id);
                break;
            default:
                break;
        }
    }

    public addEventListener(ev: 'message', cb: (ev: { data: CallMessage }) => void) {
        if (ev === 'message') this._listener = cb;
    }
}

export default TimeoutWorker;