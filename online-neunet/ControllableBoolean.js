import ListenableBoolean from './ListenableBoolean.js'

export default class extends ListenableBoolean {
    /**
     * @param {string} key
     * @param {import('./ListenableObject.js').default<URLSearchParams>} requestParams
     */
    constructor(key, requestParams) {
        super()
        requestParams.addListener(arg => {
            const value = arg.get(key)

            if (value !== null)
                super.assign(value === 'true')
        })
    }
}
