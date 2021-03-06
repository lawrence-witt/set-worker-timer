import { 
    setWorkerTimeout,
    setWorkerInterval,
    clearWorkerTimer
} from '../src';

const timeoutElapsed = document.getElementById('timeout-elapsed') as HTMLDivElement;
const intervalElapsed = document.getElementById('interval-elapsed') as HTMLDivElement;
const setTimeoutBtn = document.getElementById('set-timeout') as HTMLButtonElement;
const clearTimeoutBtn = document.getElementById('clear-timeout') as HTMLButtonElement;
const setIntervalBtn = document.getElementById('set-interval') as HTMLButtonElement;
const clearIntervalBtn = document.getElementById('clear-interval') as HTMLButtonElement;

let timeoutLoop: ReturnType<typeof setWorkerTimeout>;
let timeoutInitial: number | undefined;

let intervalLoop: ReturnType<typeof setWorkerInterval>;
let intervalInitial: number | undefined;

const appendLog = (element: HTMLDivElement, msg: string, colour?: string) => {
    const p = document.createElement('p');
    if (colour) p.style.color = colour;
    p.textContent = msg;
    element.appendChild(p);
}

setTimeoutBtn.onclick = () => {
    if (timeoutInitial) return;

    timeoutInitial = performance.now();

    const loop = () => {
        const elapsed = performance.now() - (timeoutInitial as number);
        appendLog(timeoutElapsed, ""+elapsed, 'darkgreen');
        timeoutLoop = setWorkerTimeout(loop, 100);
    };

    timeoutLoop = setWorkerTimeout(loop, 100);
}

clearTimeoutBtn.onclick = () => {
    if (!timeoutInitial) return;

    clearWorkerTimer(timeoutLoop);

    timeoutInitial = undefined;
}

setIntervalBtn.onclick = () => {
    if (intervalInitial) return;

    intervalInitial = performance.now();

    intervalLoop = setWorkerInterval(() => {
        const elapsed = performance.now() - (intervalInitial as number);
        appendLog(intervalElapsed, ""+elapsed, 'slateblue');
    }, 100);
}

clearIntervalBtn.onclick = () => {
    if (!intervalInitial) return;

    clearWorkerTimer(intervalLoop);

    intervalInitial = undefined;
}

window.addEventListener('visibilitychange', () => {
    if (timeoutInitial) appendLog(timeoutElapsed, document.visibilityState.toUpperCase(), 'red');
    if (intervalInitial) appendLog(intervalElapsed, document.visibilityState.toUpperCase(), 'red');
})