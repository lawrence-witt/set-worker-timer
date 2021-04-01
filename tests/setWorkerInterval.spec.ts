import { setWorkerInterval, clearWorkerTimer } from '../src';

jest.mock('../src/module/WorkerTimer.worker.ts');

test("it should return a number", () => {
    const id = setWorkerInterval(() => ({}));

    expect(typeof id).toEqual("number");

    clearWorkerTimer(id);
});

test("it should return a float", () => {
    const id = setWorkerInterval(() => ({}));
    const split = id.toString().split('.');

    expect(split).toHaveLength(2);

    clearWorkerTimer(id);
});

test("it should return a unique number", () => {
    const id1 = setWorkerInterval(() => ({}));
    const id2 = setWorkerInterval(() => ({}));

    expect(id1).not.toEqual(id2);

    clearWorkerTimer(id1);
    clearWorkerTimer(id2);
});

test("it should call the function repeatedly", done => {
    let callCount = 0;

    const id = setWorkerInterval(() => ++callCount, 100);

    setTimeout(() => {
        expect(callCount).toBeGreaterThanOrEqual(9);
        expect(callCount).toBeLessThanOrEqual(11);
        clearWorkerTimer(id);
        done();
    }, 1100);
});

test("it should call the function when no delay is specified", done => {
    const id = setWorkerInterval(() => {
        clearWorkerTimer(id);
        done();
    })
});

test("it should call the function without argument parameters by default", done => {
    const id = setWorkerInterval((param: undefined) => {
        expect(param).toBeUndefined();
        clearWorkerTimer(id);
        done();
    })
});

test("it should call the function with argument parameters when supplied", done => {
    const id = setWorkerInterval((param1: string, param2: number) => {
        expect(param1).toBe("test");
        expect(param2).toBe(42);
        clearWorkerTimer(id);
        done();
    }, 0, "test", 42);
});

test("it should call an evaluated string with argument parameters", done => {
    const stub = jest.fn();

    const id = setWorkerInterval("stub => stub()", 0, stub);

    setTimeout(() => {
        expect(stub).toHaveBeenCalled();
        clearWorkerTimer(id);
        done();
    }, 10);
});