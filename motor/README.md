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
        socket.once('data', data => {
            const x = parseInt(data.split(' ')[1])
            variables.xPulse.assign(x)
            done()
        }).write(`pulse?:0`)
    })
    taskQueue.push((done => {
        socket.once('data', data => {
            const theta = parseInt(data.split(' ')[1])
            variables.thetaPulse.assign(theta)

            socket.end()
            done()
        }).write('pulse?:1')
    })
})
```

SocketQueue.js
```js
import { Socket } from 'net'

export default class {
    constructor() {
        /** @type {boolean} */
        this._isRunning = false
        /** @type {function[]} */
        this._queue = []
        this._socket = new Socket()
        this._socket.setEncoding('utf8')
    }
    flush() {
        this._queue.splice(0)
    }
    /**
     * @param {function} task 
     */
    push(task) {
        this._queue.push(task)
        this._next()
    }
    _next() {
        while (!this._isRunning && this._queue.length) {
            const task = this._queue.shift()
            if (!task) return

            console.log(`pending: ${this._socket.pending}, closed: ${this._socket.closed}, writable: ${this._socket.writable}`)
            if (!this._socket.pending) {
                task(this._socket, () => {
                    this._isRunning = false
                    this._next()
                })
            } else {
                this._socket.connect(23, 'localhost', () => {
                    task(this._socket, () => {
                        this._isRunning = false
                        this._next()
                    })
                })
            }

            this._isRunning = true
        }
    }
}
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