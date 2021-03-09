import { TimeoutMap, SetMessage, ClearMessage } from './WorkerTimeout.types';

const ctx: Worker = self as any;

const store: TimeoutMap = new Map();

const set = (id: number, delay: number) => {
    const record = store.get(id);
    if (record) clearTimeout(record);

    store.set(id, setTimeout(() => {
        ctx.postMessage({type: 'call', payload: { id }});
        store.delete(id);
    }, delay));
};

const clear = (id: number) => {
    const record = store.get(id);
    if (!record) return;

    clearTimeout(record);
    store.delete(id);
};

ctx.addEventListener('message', (ev: MessageEvent<SetMessage | ClearMessage>) => {
    switch (ev.data.type) {
        case "set":
            set(ev.data.payload.id, ev.data.payload.delay);
        case "clear":
            clear(ev.data.payload.id);
        default:
            return;
    }
});

export default null as any;