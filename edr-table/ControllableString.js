import ListenableString from './ListenableString.js'

export default class extends ListenableString {
    /**
     * @param {string} key
     * @param {import('./ListenableObject.js').default<object>} message
     */
    constructor(key, message) {
        super()
        this._key = key
        message.addListener(arg => {
            for (const [key, value] of Object.entries(arg)) {
                if (key !== this._key) return

                super.assign(value)
            }
        })
    }
}
