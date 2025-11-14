export default class {
    constructor(key, parser, tcpParams, tcpQueue, tcpSocket) {
        this._listeners = []
        this._key = key
        this._tcpQueue
        tcpQueue.addListener(arg => { this._tcpQueue = arg })
        this._tcpSocket
        tcpSocket.addListener(arg => { this._tcpSocket = arg })
        tcpParams.addListener(arg => {
            console.log(arg)
            if (arg.split('=')[0] !== this._key) return

            const value = parser(arg.split('=')[1])
            console.log(`${this._key}, ${value}`)
        })
    }
    addListener(listener) {
        this._listeners.push(listener)
    }
    sync() {
        console.log(`pending: ${this._tcpSocket.pending}, closed: ${this._tcpSocket.closed}, writable: ${this._tcpSocket.writable}`)
        if (!this._tcpSocket.pending) {
            this._tcpQueue.push(this._key)
            this._tcpSocket.write(this._key)
        } else {
            this._tcpSocket.connect(23, 'localhost', () => {
                this._tcpQueue.push(this._key)
                this._tcpSocket.write(this._key)
            })
        }
    }
}
