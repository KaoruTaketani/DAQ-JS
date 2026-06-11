import ControllableString from '../13/ControllableString.js'

export default class extends ControllableString {
    constructor(key, requestParams, batchResolve) {
        super(key, requestParams)
        this._batchResolve
        batchResolve.addListener(arg => {
            this._batchResolve = arg
            this._batchResolve.set(key, null)
        })
    }
}
