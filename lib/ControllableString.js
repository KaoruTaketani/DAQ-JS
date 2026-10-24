import ListenableString from './ListenableString.js'

export default class extends ListenableString {
    /**
     * @param {string} key
     * @param {import('./ListenableObject.js').default<URLSearchParams>} requestParams
     * @param {import('./ListenableObject.js').default<Map<string,function|null|undefined>>} [batchResolve]
     */
    constructor(key, requestParams, batchResolve) {
        super()
        requestParams.addListener(arg => {
            const value = arg.get(key)

            if (value !== null) super.assign(value)
        })
        batchResolve?.addListener(arg => {
            arg.set(key, null)
        })
    }
}
