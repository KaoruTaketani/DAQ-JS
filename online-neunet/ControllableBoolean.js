import ListenableBoolean from './ListenableBoolean.js'

export default class extends ListenableBoolean {
    /**
     * @param {string} key
     * @param {import('./ListenableObject.js').default<URLSearchParams>} requestParams
     */
    constructor(key, requestParams) {
        super()
        requestParams.addListener(arg => {
            if (!arg.has(key)) return
            console.log(key, arg.get(key))
            super.assign(arg.get(key) === 'true')
        })
    }
}
