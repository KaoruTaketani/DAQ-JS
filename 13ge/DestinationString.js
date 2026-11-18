import ListenableString from '../13/ListenableString.js'

export default class extends ListenableString {
    constructor(key, requestParams, batchResolve, batchLimits, limits) {
        super()
        this._key = key
        requestParams.addListener(arg => {
            if (!arg.has(key)) return

            super.assign(arg.get(key))
        })
        this._batchResolve
        batchResolve.addListener(arg => { this._batchResolve = arg })
        this._batchLimits
        batchLimits.addListener(arg => { this._batchLimits = arg })
        limits.addListener(arg => {
            this._batchLimits.set(key, arg)
        })
    }
    assign(arg) {
        super.assign(arg)
        if (this._batchResolve) {
            this._batchResolve()
        }
    }
}
