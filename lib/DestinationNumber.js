import ListenableNumber from './ListenableNumber.js'

export default class extends ListenableNumber {
    /**
     * @param {string} key
     * @param {import('./ListenableObject.js').default<URLSearchParams>} requestParams
     * @param {import('./ListenableObject.js').default<function|undefined>} [batchResolve]
     * @param {import('./ListenableObject.js').default<Map<string,number[]|string[]>>} [batchLimits]
     * @param {import('./ListenableObject.js').default<number[]>} [limits]
     */
    constructor(key, requestParams, batchResolve, batchLimits, limits) {
        super()
        this._key = key
        requestParams.addListener(arg => {
            const value = arg.get(key)

            if (value !== null) {
                const num = parseFloat(value)
                if (Number.isFinite(num)) {
                    super.assign(num)
                    if (this._batchResolve)
                        this._batchResolve()
                }
            }
        })
        this._batchResolve
        batchResolve?.addListener(arg => { this._batchResolve = arg })
        this._batchLimits
        batchLimits?.addListener(arg => { this._batchLimits = arg })
        limits?.addListener(arg => {
            this._batchLimits.set(key, arg)
        })
    }
    /**
     * @override
     * @param {number} arg 
     */
    assign(arg) {
        super.assign(arg)
        if (this._batchResolve)
            this._batchResolve()
    }
}
