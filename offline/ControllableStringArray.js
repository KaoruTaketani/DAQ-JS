import ListenableObject from './ListenableObject.js'

/** 
 * @extends ListenableObject<string[]>
 */
export default class extends ListenableObject {
    /**
     * @param {string} key
     * @param {import('./ListenableObject.js').default<object>} message
     */
    constructor(key, message) {
        super()
        /** @type {string} */
        this._key = key
        message.addListener(arg => {
            for (const [key, value] of Object.entries(arg)) {
                if (key !== this._key) return

                super.assign(value)
            }
        })
    }
}
