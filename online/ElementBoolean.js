export default class {
    /**
     * @param {string} pathname
     * @param {import('./ListenableObject.js').default<Map<string,boolean|string>>} elementValues
     * @param {import('./ListenableObject.js').default<Map<import('ws').WebSocket,string>>} webSocketPathnames
     */
    constructor(pathname, elementValues, webSocketPathnames) {
        /** @type {string} */
        this._pathname = pathname
        /** @type {Map<string,boolean|string>} */
        this._elementValues
        elementValues.addListener(arg => { this._elementValues = arg })
        /** @type {Map<import('ws').WebSocket,string>} */
        this._webSocketPathnames
        webSocketPathnames.addListener(arg => { this._webSocketPathnames = arg })
    }
    /** @param {boolean} arg */
    assign(arg) {
        this._elementValues.set(this._pathname, arg)
        this._webSocketPathnames.forEach((pathname, ws) => {
            if (this._pathname !== pathname) return

            ws.send(arg.toString())
        })
    }
}
