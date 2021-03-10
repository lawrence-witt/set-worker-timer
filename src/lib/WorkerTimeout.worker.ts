import { TimeoutMap, SetMessage, ClearMessage } from './WorkerTimeout.types';

const ctx: Worker = self as any;

const store: TimeoutMap = new Map();

const set = (id: number, delay: number) => {
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
    if (ev.data.type === "set") set(ev.data.payload.id, ev.data.payload.delay);
    if (ev.data.type === "clear") clear(ev.data.payload.id);
});

export default null as any;