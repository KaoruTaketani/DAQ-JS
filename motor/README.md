[home](../README.md)

TaskQueue.js
```js
export default class {
    constructor() {
        this._isRunning = false
        this._queue = []
    }
    push(task) {
        this._queue.push(task)
        this._next()
    }
    _next() {
        while (!this._isRunning && this._queue.length) {
            const task = this._queue.shift()
            if (!task) return
            task(() => {
                this._isRunning = false
                this._next()
            })
            this._isRunning = true
        }
    }
}
```

Initializer.js

```js
socket.connect(23, 'localhost', () => {
    taskQueue.push(done => {
        socket.once('data', (/** @type {string} */data) => {
            const x = parseInt(data.split(' ')[1])
            variables.xPulse.assign(x)
            done()
        }).write(`pulse?:0`)
    })
    taskQueue.push((done => {
        socket.once('data', (/** @type {string} */data) => {
            const theta = parseInt(data.split(' ')[1])
            variables.thetaPulse.assign(theta)

            socket.end()
            done()
        }).write('pulse?:1')
    })
})
```



## How to run the sample code in this folder
1. open a terminal
1. change directory to this folder
1. type `node server.js` in the terminal
1. open another terminal
1. change directory to this folder
1. type `npm i` in the terminal
1. type `node .` in the terminal
1. open http://localhost in your browser