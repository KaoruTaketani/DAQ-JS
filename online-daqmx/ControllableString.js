import ListenableString from './ListenableString.js'

export default class extends ListenableString {
    /**
     * @param {string} key
     * @param {import('./ListenableObject.js').default<URLSearchParams>} requestParams
     */
    constructor(key, requestParams) {
        super()
        requestParams.addListener(arg => {
            const value = arg.get(key)

            if (value !== null)
                super.assign(value)
        })
    }
}
