import { Socket } from 'net'

export default class {
    constructor(port, host) {
        this._port = port
        this._host = host
        /** @type {boolean} */
        this._isBusy = false
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
        if (this._isBusy) return

        const task = this._queue.shift()
        if (!task) {
            this._socket.end()
            return
        }

        console.log(`pending: ${this._socket.pending}, closed: ${this._socket.closed}, writable: ${this._socket.writable}`)
        if (!this._socket.pending) {
            task(this._socket, () => {
                this._isBusy = false
                this._next()
            })
        } else {
            this._socket.connect(this._port, this._host, () => {
                task(this._socket, () => {
                    this._isBusy = false
                    this._next()
                })
            })
        }

        this._isBusy = true
    }
}