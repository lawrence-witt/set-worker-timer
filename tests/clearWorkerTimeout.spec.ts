import { setWorkerTimeout, clearWorkerTimeout } from '../src';

jest.mock('../src/lib/WorkerTimeout.worker.ts');

test("it should return undefined", () => {
    const id = setWorkerTimeout(() => {});
    const clear = clearWorkerTimeout(id);

    expect(clear).not.toBeDefined();
});

test("it should stop the callback from executing", done => {
    const stub = jest.fn();

    const id = setWorkerTimeout(stub, 10);
    clearWorkerTimeout(id);

    setTimeout(() => {
        expect(stub).not.toHaveBeenCalled();
        done();
    }, 20);
});

test("id should only stop the cleared callback from executing", done => {
    const callStub = jest.fn();
    const clearStub = jest.fn();

    setWorkerTimeout(callStub, 10);
    const clearId = setWorkerTimeout(clearStub, 10);
    clearWorkerTimeout(clearId);

    setTimeout(() => {
        expect(callStub).toHaveBeenCalled();
        expect(clearStub).not.toHaveBeenCalled();
        done();
    }, 20);
})