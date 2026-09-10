import ListenableNumber from './ListenableNumber.js'

export default class extends ListenableNumber {
    /**
     * @param {string} key
     * @param {import('./ListenableObject.js').default<URLSearchParams>} requestParams
     */
    constructor(key, requestParams) {
        super()
        requestParams.addListener(arg => {
            const value = arg.get(key)

            if (value !== null)
                super.assign(parseFloat(value))
        })
    }
}
