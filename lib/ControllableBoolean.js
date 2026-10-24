import ListenableBoolean from './ListenableBoolean.js'

export default class extends ListenableBoolean {
    /**
     * @param {string} key
     * @param {import('./ListenableObject.js').default<URLSearchParams>} searchParams
     * @param {import('./ListenableObject.js').default<Map<string,function|null|undefined>>} [batchResolve]
     */
    constructor(key, searchParams, batchResolve) {
        super()
        searchParams.addListener(arg => {
            const value = arg.get(key)

            if (value !== null) super.assign(value === 'true')
        })
        batchResolve?.addListener(arg => {
            arg.set(key, null)
        })
    }
}
