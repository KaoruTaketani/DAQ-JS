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