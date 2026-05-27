import ListenableString from '../13/ListenableString.js'

export default class extends ListenableString {
    constructor(key, requestParams, batchResolve) {
        super(key, requestParams)
        this._onceListeners = []
        this._batchResolve
        batchResolve.addListener(arg => { this._batchResolve = arg })
        requestParams.addListener(arg => {
            if (!arg.has(key)) return

            super.assign(arg.get(key))
            if (this._batchResolve) this.addOnceListener(() => {
                // here, this._bachResolve can be undefined if BatchStopepr is used
                if (this._batchResolve) this._batchResolve()
            })
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
