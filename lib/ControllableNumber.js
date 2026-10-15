import ListenableNumber from './ListenableNumber.js'

export default class extends ListenableNumber {
    /**
     * @param {string} key 
     * @param {import('./ListenableObject.js').default<URLSearchParams>} requestParams
     * @param {import('./ListenableObject.js').default<Map<string,function|null|undefined>>} batchResolve 
     */
    constructor(key, requestParams, batchResolve) {
        super()
        requestParams.addListener(arg => {
            const value = arg.get(key)

            if (value !== null) {
                const num = parseFloat(value)
                if (Number.isFinite(num)) {
                    super.assign(num)
                }
            }
        })
        batchResolve.addListener(arg => {
            arg.set(key, null)
        })
    }
}
