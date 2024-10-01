export default class {
    /**
     * @param {string} channel
     * @param {import('./ListenableObject.js').default<Set<import('ws').WebSocket>>} webSockets
     * @param {import('./ListenableObject.js').default<import('ws').WebSocket>} connectedWebSocket
     */
    constructor(channel, webSockets, connectedWebSocket) {
        /** @type {string} */
        this._value
        /** @type {string} */
        this._channel = channel
        /** @type {Set<import('ws').WebSocket>} */
        this._webSockets
        webSockets.prependListener(arg => { this._webSockets = arg })
        connectedWebSocket.addListener(arg => {
            arg.send(JSON.stringify({ channel: this._channel, value: this._value }))
        })
    }
    /** @param {string} arg */
    assign(arg) {
        this._value = arg
        if (this._webSockets) {
            this._webSockets.forEach(webSocket => {
                webSocket.send(JSON.stringify({ channel: this._channel, value: this._value }))
            })
        }
    }
}
