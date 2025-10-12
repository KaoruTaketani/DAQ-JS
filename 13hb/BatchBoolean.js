import ControllableBoolean from '../13/ControllableBoolean.js'

export default class extends ControllableBoolean {
    constructor(key, requestParams) {
        super(key, requestParams)
        this._onceListeners = []
    }
    addOnceListener(onceListener) {
        this._onceListeners.push(onceListener)
    }
    assign(arg) {
        super.assign(arg)
        this._onceListeners.forEach(onceListener => { onceListener(arg) })
        this._onceListeners.splice(0)
    }
}
