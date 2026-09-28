export default class {
    constructor(requestMessage, parser, tcpResponseHandlers, tcpQueue) {
        this._listeners = []
        this._requestMessage = requestMessage
        this._tcpQueue
        tcpQueue.addListener(arg => { this._tcpQueue = arg })
        tcpResponseHandlers.addListener(arg => {
            arg.set(requestMessage, data => {
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
        this._tcpQueue.push(this._requestMessage)
    }
}
