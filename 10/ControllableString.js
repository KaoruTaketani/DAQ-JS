import ListenableString from './ListenableString.js'

export default class extends ListenableString {
    /**
     * @param {string} channel
     * @param {import('./ListenableObject.js').default<import('./index.js').WebSocketMessage>} message
     */
    constructor(channel, message) {
        super()
        /** @type {string} */
        this._channel = channel
        message.addListener(arg => {
            if (arg.channel !== this._channel) return

            super.assign(arg.value)
        })
    }
}
