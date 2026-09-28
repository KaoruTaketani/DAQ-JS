import { Socket } from 'net'

export default class {
    constructor(port, host, handlers) {
        this._port = port
        this._host = host
        this._handlers = handlers
        /** @type {boolean} */
        this._isBusy = false
        /** @type {string[]} */
        this._queue = []
        /** @type {string} */
        this._message
        this._socket = new Socket()
        this._socket.setEncoding('utf8')
        this._socket.on('data', data => {
            const handler = this._handlers.get(this._message)

            if (handler) {
                handler(data)
            }

            this._isBusy = false
            this._next()
        })
    }
    flush() {
        this._queue.splice(0)
    }
    /**
     * @param {string} message
     * @param {function} callback 
     */
    push(message) {
        this._queue.push(message)
        this._next()
    }
    _next() {
        if (this._isBusy) return

        this._message = this._queue.shift()
        if (!this._message) {
            this._socket.end()
            return
        }

        console.log(`isBusy: ${this._isBusy}, pending: ${this._socket.pending}, closed: ${this._socket.closed}, writable: ${this._socket.writable}`)
        if (!this._socket.pending) {
            this._socket.write(this._message)
        } else {
            this._socket.connect(this._port, this._host, () => {
                this._socket.write(this._message)
            })
        }

        this._isBusy = true
    }
}