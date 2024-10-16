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
    addOnceListener(listener) {
        this._onceListeners.push(listener)
    }
    assign(arg) {
        super.assign(arg)
        this._onceListeners.forEach(listener => { listener(arg) })
        this._onceListeners.splice(0)
    }
}
