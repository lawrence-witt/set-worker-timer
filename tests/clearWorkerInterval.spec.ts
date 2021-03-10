import { setWorkerInterval, clearWorkerInterval, clearWorkerTimeout } from '../src';

jest.mock('../src/lib/WorkerTimer.worker.ts');

test("it should return undefined", () => {
    const id = setWorkerInterval(() => {});
    const clear = clearWorkerInterval(id);

    expect(clear).toBeUndefined();
});

test("it should stop the function from executing", done => {
    const stub = jest.fn();

    const id = setWorkerInterval(stub, 10);
    clearWorkerInterval(id);

    setTimeout(() => {
        expect(stub).not.toHaveBeenCalled();
        done();
    }, 20);
});

test("it should only stop the cleared function from executing", done => {
    const callStub = jest.fn();
    const clearStub = jest.fn();

    const callId = setWorkerInterval(callStub, 10);
    const clearId = setWorkerInterval(clearStub, 10);
    clearWorkerInterval(clearId);

    setTimeout(() => {
        expect(callStub).toHaveBeenCalled();
        expect(clearStub).not.toHaveBeenCalled();
        clearWorkerInterval(callId);
        done();
    }, 20);
});

test("it should still work when cleared with clearWorkerTimeout", done => {
    const stub = jest.fn();

    const id = setWorkerInterval(stub, 10);
    clearWorkerTimeout(id);

    setTimeout(() => {
        expect(stub).not.toHaveBeenCalled();
        done();
    }, 20);
});