import ControllableString from '../13/ControllableString.js'

export default class extends ControllableString {
    constructor(key, requestParams, batchResolve) {
        super(key, requestParams)
        this._key = key
        this._batchResolve
        batchResolve.addListener(arg => {
            this._batchResolve = arg
            this._batchResolve.set(this._key, undefined)
        })
    }
    assign(arg) {
        super.assign(arg)
        if (this._batchResolve?.get(this._key)) {
            this._batchResolve.get(this._key)()
            this._batchResolve.set(this._key, undefined)
        }
    }
}



