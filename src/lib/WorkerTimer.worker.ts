import {
    TimerMethod,
    TimeoutMap, 
    SetMessage, 
    ClearMessage 
} from './WorkerTimer.types';

const ctx: Worker = self as any;

const store: TimeoutMap = new Map();

const set = (
    method: TimerMethod, 
    id: number, 
    delay: number
) => {
    const call = () => ctx.postMessage({type: 'call', payload: { id }});

    const timerId = method === 'timeout' ? (
        setTimeout(() => { call(); store.delete(id); }, delay)
    ) : (
        setInterval(call, delay)
    );

    store.set(id, { method, timerId });
};

const clear = (id: number) => {
    const record = store.get(id);
    if (!record) return;

    record.method === 'timeout' ? (
        clearTimeout(record.timerId)
    ) : (
        clearInterval(record.timerId)
    );

    store.delete(id);
};

ctx.addEventListener('message', (ev: MessageEvent<SetMessage | ClearMessage>) => {
    if (ev.data.type === "set") set(
        ev.data.payload.method,
        ev.data.payload.id, 
        ev.data.payload.delay
    );
    if (ev.data.type === "clear") clear(ev.data.payload.id);
});

export default null as any;