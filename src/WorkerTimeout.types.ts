// Main

export type CallbackMap = Map<number, () => void>;

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
        ms: number;
    }
}

export interface ClearMessage {
    type: 'clear';
    payload: {
        id: number;
    }
}