// Main

export type CallbackMap = Map<number, {
    cb: ((...args: any[]) => void) | string;
    args: any[];
}>;

export interface CallMessage {
    type: 'call';
    payload: {
        id: number;
    }
}

// Worker

export type TimeoutMap = Map<number, ReturnType<typeof setTimeout>>;

export interface SetMessage {
    type: 'set';
    payload: {
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