import { Socket } from 'net'

export default class {
    constructor(port, host, response) {
        /** @type {number} */
        this._port = port
        /** @type {string} */
        this._host = host
        /** @type {boolean} */
        this._isBusy = false
        /** @type {string[]} */
        this._queue = []
        /** @type {string} */
        this._request
        this._socket = new Socket()
        this._socket.setEncoding('utf8')
        this._socket.on('data', data => {
            response.assign(new URLSearchParams([[this._request, data]]))
            this._isBusy = false
            this._next()
        })
    }
    push(request) {
        this._queue.push(request)
        this._next()
    }
    _next() {
        if (this._isBusy) return

        this._request = this._queue.shift()
        if (!this._request) {
            this._socket.end()
            return
        }

        if (!this._socket.pending) {
            this._socket.write(this._request)
        } else {
            this._socket.connect(this._port, this._host, () => {
                this._socket.write(this._request)
            })
        }
        this._isBusy = true
    }
}