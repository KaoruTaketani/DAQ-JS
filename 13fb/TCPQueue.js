import { Socket } from 'net'

export default class {
    constructor(port, host) {
        this._port = port
        this._host = host
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
     * @param {string} message
     * @param {function} callback 
     */
    push(message, callback) {
        this._queue.push({
            message: message,
            callback: callback
        })
        this._next()
    }
    _next() {
        if (this._isRunning) return

        const task = this._queue.shift()
        if (!task) {
            this._socket.end()
            return
        }

        console.log(`pending: ${this._socket.pending}, closed: ${this._socket.closed}, writable: ${this._socket.writable}`)
        if (!this._socket.pending) {
            this._socket.once('data', data => {
                task.callback(data, () => {
                    this._isRunning = false
                    this._next()
                })
            }).write(task.message)
        } else {
            this._socket.connect(this._port, this._host, () => {
                this._socket.once('data', data => {
                    task.callback(data, () => {
                        this._isRunning = false
                        this._next()
                    })
                }).write(task.message)
            })
        }

        this._isRunning = true
    }
}