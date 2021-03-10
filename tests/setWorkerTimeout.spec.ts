import { setWorkerTimeout, clearWorkerTimeout } from '../src';

jest.mock('../src/lib/WorkerTimeout.worker.ts');

test("it should return a number", () => {
    const id = setWorkerTimeout(() => {});

    expect(typeof id).toEqual("number");

    clearWorkerTimeout(id);
});

test("it should return a float", () => {
    const id = setWorkerTimeout(() => {});
    const split = id.toString().split('.');

    expect(split).toHaveLength(2);

    clearWorkerTimeout(id);
});

test("it should return a unique number", () => {
    const id1 = setWorkerTimeout(() => {});
    const id2 = setWorkerTimeout(() => {});

    expect(id1).not.toEqual(id2);

    clearWorkerTimeout(id1);
    clearWorkerTimeout(id2);
});

test("it should call the function after the specified delay", done => {
    const first = performance.now();

    const id = setWorkerTimeout(() => {
        const last = performance.now();

        expect(last - first).toBeGreaterThanOrEqual(100);

        clearWorkerTimeout(id);
        done();
    }, 100);
});

test("it should call the function when no delay is specified", done => {
    const id = setWorkerTimeout(() => {
        clearWorkerTimeout(id);
        done();
    })
});

test("it should call the function without argument parameters by default", done => {
    const id = setWorkerTimeout((param: undefined) => {
        expect(param).toBeUndefined();
        clearWorkerTimeout(id);
        done();
    })
});

test("it should call the function with argument parameters when supplied", done => {
    const id = setWorkerTimeout((param1: string, param2: number) => {
        expect(param1).toBe("test");
        expect(param2).toBe(42);
        clearWorkerTimeout(id);
        done();
    }, 0, "test", 42);
});

test("it should call an evaluated string with argument parameters", done => {
    const stub = jest.fn();

    const id = setWorkerTimeout("stub => stub()", 0, stub);

    setTimeout(() => {
        expect(stub).toHaveBeenCalled();
        clearWorkerTimeout(id);
        done();
    }, 10);
});