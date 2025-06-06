export default class {
    /**
     * @param {string} key
     * @param {import('ws').WebSocket} webSocket
     */
    constructor(key, webSocket) {
        /** @type {string} */
        this._key = key
        /** @type {import('ws').WebSocket} */
        this._webSocket = webSocket
    }
    /** @param {string} arg */
    assign(arg) {
        this._webSocket.send(JSON.stringify(Object.fromEntries([[this._key, arg]])))
    }
}
