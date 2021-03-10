// Main

export type TimerMethod = 'timeout' | 'interval';
export type TimerCallback = ((...args: any[]) => void) | string;

export type CallbackMap = Map<number, {
    method: TimerMethod;
    cb: TimerCallback;
    args: any[];
}>;

export interface CallMessage {
    type: 'call';
    payload: {
        id: number;
    }
}

// Worker

export type TimeoutMap = Map<number, {
    method: TimerMethod;
    timerId: ReturnType<typeof setTimeout | typeof setInterval>;
}>;

export interface SetMessage {
    type: 'set';
    payload: {
        method: TimerMethod;
        id: number;
        delay: number;
    }
}

export interface ClearMessage {
    type: 'clear';
    payload: {
        id: number;
    }
}