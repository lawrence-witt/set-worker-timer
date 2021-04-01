import { setWorkerTimeout, setWorkerInterval, clearWorkerTimer } from '../src';

jest.mock('../src/module/WorkerTimer.worker.ts');

test("it should return undefined", () => {
    const id = setWorkerTimeout(() => ({}));
    const clear = clearWorkerTimer(id);

    expect(clear).toBeUndefined();
});

test("it should stop a Timeout from executing", done => {
    const stub = jest.fn();

    const id = setWorkerTimeout(stub, 10);
    clearWorkerTimer(id);

    setTimeout(() => {
        expect(stub).not.toHaveBeenCalled();
        done();
    }, 20);
});

test("it should stop an Interval from executing", done => {
    const stub = jest.fn();

    const id = setWorkerInterval(stub, 10);
    clearWorkerTimer(id);

    setTimeout(() => {
        expect(stub).not.toHaveBeenCalled();
        done();
    }, 20);
});

test("it should only stop the cleared Timeout from executing", done => {
    const callStub = jest.fn();
    const clearStub = jest.fn();

    const callId = setWorkerTimeout(callStub, 10);
    const clearId = setWorkerTimeout(clearStub, 10);
    clearWorkerTimer(clearId);

    setTimeout(() => {
        expect(callStub).toHaveBeenCalled();
        expect(clearStub).not.toHaveBeenCalled();
        clearWorkerTimer(callId);
        done();
    }, 20);
});

test("it should only stop the cleared Interval from executing", done => {
    const callStub = jest.fn();
    const clearStub = jest.fn();

    const callId = setWorkerInterval(callStub, 10);
    const clearId = setWorkerInterval(clearStub, 10);
    clearWorkerTimer(clearId);

    setTimeout(() => {
        expect(callStub).toHaveBeenCalled();
        expect(clearStub).not.toHaveBeenCalled();
        clearWorkerTimer(callId);
        done();
    }, 20);
});