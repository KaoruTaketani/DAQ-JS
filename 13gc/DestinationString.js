import ListenableString from '../13/ListenableString.js'

export default class extends ListenableString {
    constructor(key, requestParams, batchResolve) {
        super()
        this._key = key
        requestParams.addListener(arg => {
            if (!arg.has(key)) return

            super.assign(arg.get(key))
        })
        this._batchResolve
        batchResolve.addListener(arg => {
            this._batchResolve = arg
            this._batchResolve.set(this._key, undefined)
        })
    }
    assign(arg) {
        super.assign(arg)
        if (this._batchResolve.get(this._key) !== undefined) {
            this._batchResolve.get(this._key)()
            this._batchResolve.set(this._key, undefined)
        }
    }
}
