//https://vuedose.tips/how-to-test-web-workers-with-jest/

import { setWorkerTimeout, clearWorkerTimeout } from '../src';

jest.mock('../src/lib/WorkerTimeout.worker.ts');

test("it should return a number", () => {
    const id = setWorkerTimeout(() => {}, 0);

    expect(typeof id).toEqual("number");

    clearWorkerTimeout(id);
});

test("it should return a float", () => {
    const id = setWorkerTimeout(() => {}, 0);

    const split = id.toString().split('.');

    expect(split).toHaveLength(2);

    clearWorkerTimeout(id);
});

test("it should return a unique number", () => {
    const id1 = setWorkerTimeout(() => {}, 0);
    const id2 = setWorkerTimeout(() => {}, 0);

    expect(id1).not.toEqual(id2);

    clearWorkerTimeout(id1);
    clearWorkerTimeout(id2);
});

test("it should call the function after the specified delay", done => {
    const first = performance.now();

    setWorkerTimeout(() => {
        const last = performance.now();

        expect(last - first).toBeGreaterThanOrEqual(200);

        done();
    }, 200);
});

test("it should call the function when no delay is specified", done => {
    setWorkerTimeout(() => {
        done();
    })
});