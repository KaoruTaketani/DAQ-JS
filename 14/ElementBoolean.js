export default class {
    constructor(key, elementValues, webSocketUrls) {
        this._key = key
        this._elementValues
        elementValues.addListener(arg => { this._elementValues = arg })
        this._webSocketUrls
        webSocketUrls.addListener(arg => { this._webSocketUrls = arg })
    }
    assign(arg) {
        this._elementValues.set(this._key, arg)
        this._webSocketUrls.forEach((url, ws) => {
            if (this._key !== url) return

            ws.send(arg.toString())
        })
    }
}
