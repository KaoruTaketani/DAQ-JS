import ListenableString from './ListenableString.js'

export default class extends ListenableString {
    /**
     * @param {string} key
     * @param {import('./ListenableObject.js').default<URLSearchParams>} requestParams
     * @param {import('./ListenableObject.js').default<function|undefined>} [batchResolve]
     * @param {import('./ListenableObject.js').default<Map<string,number[]|string[]>>} [batchLimits]
     * @param {import('./ListenableObject.js').default<number[]>} [limits]
     */
    constructor(key, requestParams, batchResolve, batchLimits, limits) {
        super()
        requestParams.addListener(arg => {
            const value = arg.get(key)

            if (value !== null) {
                super.assign(value)
                if (this._batchResolve)
                    this._batchResolve()
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
}
