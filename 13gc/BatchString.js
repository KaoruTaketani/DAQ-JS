import ListenableString from '../13/ListenableString.js'

export default class extends ListenableString {
    constructor(key, requestParams, batchResolve) {
        super()
        this._onceListeners = []
        this._batchResolve
        batchResolve.addListener(arg => { this._batchResolve = arg })
        requestParams.addListener(arg => {
            if (!arg.has(key)) return

            super.assign(arg.get(key))
            if (this._batchResolve) this._onceListeners.push(() => {
                this._batchResolve()
            })
        })
    }
    assign(arg) {
        super.assign(arg)
        this._onceListeners.forEach(onceListener => { onceListener(arg) })
        this._onceListeners.splice(0)
    }
}



