import ListenableBoolean from './ListenableBoolean.js'

export default class extends ListenableBoolean {
    constructor(key, message) {
        super()
        this._onceListeners = []
        message.addListener(arg => {
            if (arg[key] === undefined) return

            this.assign(arg[key])
        })
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
