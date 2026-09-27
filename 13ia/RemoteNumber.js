export default class {
    constructor(key, parser, tcpParsers, tcpQueue) {
        this._listeners = []
        this._key = key
        this._tcpQueue
        tcpQueue.addListener(arg => { this._tcpQueue = arg })
        tcpParsers.addListener(arg => {
            arg.set(key, data => {
                const value = parser(data)
                // console.log(`data: ${data}, key: ${key}, value: ${value}`)
                this._listeners.forEach(listener => { listener(value) })
            })
        })
    }
    addListener(listener) {
        this._listeners.push(listener)
    }
    sync() {
        this._tcpQueue.push(this._key)
    }
}
