![License Shield](https://img.shields.io/github/license/lawrence-witt/set-worker-timer?style=flat-square)
![Build Shield](https://img.shields.io/travis/com/lawrence-witt/set-worker-timer?style=flat-square)

# set-worker-timer

The window timer methods `setTimeout` and `setInterval`, recreated with Web Workers.

## Description

In "unfocussed" windows, the definition of which varies from browser to browser, the built-in setTimeout and setInterval methods are severely throttled as a performance optimisation. `set-worker-timer` acts as a work-around by executing window timers in the Worker thread which is not susceptible to this behaviour.

This package is an alternative to the popular [worker-timers](https://github.com/chrisguttandin/worker-timers), opting to recreate timer functionality as closely as possible to the original API. This includes overlooked features such as indefinite arguments, and downright questionable ones such as string execution using `eval()`. User discretion is advised.

## Getting Started

### Installation

````
npm install set-worker-timer
````

### Import

````
import { 
    setWorkerTimeout, 
    setWorkerInterval,
    clearWorkerTimeout,
    clearWorkerInterval
} from 'set-worker-timer':
````
`set-worker-timer` attaches to the global scope so imports from any file always link back to the same class instantation.

## Usage

### Set

````
const timeoutId = setWorkerTimeout(() => {
    // execute callback after 100ms
}, 100);

const intervalId = setWorkerInterval(() => {
    // execute callback every 100ms
}, 100);
````

### Clear

````
clearWorkerTimeout(timeoutId);
clearWorkerInterval(intervalId);
````
`set-worker-timer` uses one callback list and one Worker so clear methods can be called interchangeably.
````
clearWorkerTimeout(intervalId);
clearWorkerInterval(timeoutId);
````

## Features

### Indefinite Arguments

Supply arguments to the timer to be passed as parameters to your callback function.

````
setWorkerTimeout((foo, bar) => {
    // execute callback with parameters
}, 100, "foo", "bar")
````
### String Execution (not recommended)

Pass a string to be executed using `eval()`.

````
setWorkerTimeout('() => {
    // execute unsafe callback
}', 100);
````

## Contributors

[@lawrence-witt](https://github.com/lawrence-witt)

## Changelog

* ### 0.1.0 - 01/04/2021
  * Initial release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.