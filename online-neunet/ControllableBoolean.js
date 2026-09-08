import ListenableBoolean from './ListenableBoolean.js'

export default class extends ListenableBoolean {
    /**
     * @param {string} key
     * @param {import('./ListenableObject.js').default<object>} message
     */
    constructor(key, message) {
        super()
        message.addListener(arg => {
            const i = Object.keys(arg).indexOf(key)
            if (i < 0) return

            super.assign(Object.values(arg)[i])
        })
    }
}
