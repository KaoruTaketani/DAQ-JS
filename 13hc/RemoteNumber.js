export default class {
    constructor(key, parser, visaParsers, visaQueue) {
        this._listeners = []
        this._key = key
        this._visaQueue
        visaQueue.addListener(arg => { this._visaQueue = arg })
        visaParsers.addListener(arg => {
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
        this._visaQueue.push(this._key)
    }
}
