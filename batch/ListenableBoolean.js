export default class {
    constructor() {
        this._listeners = []
        this._onceListeners = []
    }
    addListener(listener) {
        this._listeners.push(listener)
    }
    addOnceListener(onceListener) {
        this._onceListeners.push(onceListener)
    }
    assign(arg) {
        this._listeners.forEach(listener => { listener(arg) })
        // console.log(this._onceListeners.length)
        this._onceListeners.forEach(onceListener => { onceListener(arg) })
        this._onceListeners.splice(0)
    }
}
