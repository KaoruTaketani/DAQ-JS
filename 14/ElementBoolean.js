export default class {
    constructor(key, elementValues, webSocketUrls) {
        this._key = key
        this._url = new URL(`ws://localhost${key}`)
        this._elementValues
        elementValues.addListener(arg => { this._elementValues = arg })
        this._webSocketUrls
        webSocketUrls.addListener(arg => { this._webSocketUrls = arg })
    }
    assign(arg) {
        this._elementValues.set(this._key, arg)
        this._webSocketUrls.forEach((url, ws) => {
            if (this._url.pathname !== url) return

            ws.send(JSON.stringify({ hash: this._url.hash, value: arg }))
        })
    }
}
