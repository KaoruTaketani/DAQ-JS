import ControllableNumber from './ControllableNumber.js'

export default class extends ControllableNumber {
    constructor(key, requestParams, batchResolve) {
        super(key, requestParams)
        this._batchResolve
        batchResolve.addListener(arg => {
            this._batchResolve = arg
            this._batchResolve.set(key,null)
        })
    }
}
