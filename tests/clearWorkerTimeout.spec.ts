import { setWorkerTimeout, clearWorkerTimeout } from '../src';

jest.mock('../src/lib/WorkerTimeout.worker.ts');

test("it should return undefined", () => {
    const id = setWorkerTimeout(() => {});
    const clear = clearWorkerTimeout(id);

    expect(clear).toBeUndefined();
});

test("it should stop the function from executing", done => {
    const stub = jest.fn();

    const id = setWorkerTimeout(stub, 10);
    clearWorkerTimeout(id);

    setTimeout(() => {
        expect(stub).not.toHaveBeenCalled();
        done();
    }, 20);
});

test("it should only stop the cleared function from executing", done => {
    const callStub = jest.fn();
    const clearStub = jest.fn();

    const callId = setWorkerTimeout(callStub, 10);
    const clearId = setWorkerTimeout(clearStub, 10);
    clearWorkerTimeout(clearId);

    setTimeout(() => {
        expect(callStub).toHaveBeenCalled();
        expect(clearStub).not.toHaveBeenCalled();
        clearWorkerTimeout(callId);
        done();
    }, 20);
})