export default class {
    constructor(key, url, webSocketUrls) {
        this._value
        this._key = key
        this._url = url
        this._webSocketUrls
        webSocketUrls.addListener(arg => {
            this._webSocketUrls = arg
            this._send()
        })
    }
    _send() {
        if (this._value === undefined) return
        this._webSocketUrls.forEach((url, ws) => {
            if (this._url !== url) return
            ws.send(JSON.stringify({ key: this._key, value: this._value }))
        })
    }
    assign(arg) {
        this._value = arg
        this._send()
    }
}
