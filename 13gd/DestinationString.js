import ListenableString from '../13/ListenableString.js'

export default class extends ListenableString {
    constructor(key, requestParams, batchResolve) {
        super()
        this._onceListener
        this._batchResolve
        batchResolve.addListener(arg => { this._batchResolve = arg })
        requestParams.addListener(arg => {
            if (!arg.has(key)) return

            super.assign(arg.get(key))
            if (this._batchResolve) this._onceListener = () => {
                // here, this._bachResolve can be undefined if BatchStopepr is used
                if (this._batchResolve) this._batchResolve()
            }
        })
    }
    assign(arg) {
        super.assign(arg)
        if (this._onceListener) {
            this._onceListener(arg)
            this._onceListener = undefined
        }
    }
}
