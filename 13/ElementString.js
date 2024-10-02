export default class {
    constructor(key, url, webSocketUrls) {
        this._key = key
        this._url = url
        this._webSocketUrls
        webSocketUrls.addListener(arg => { this._webSocketUrls = arg })
    }
    assign(arg) {
        this._webSocketUrls.forEach((url, ws) => {
            if (this._url !== url) return
            ws.send(JSON.stringify({ key: this._key, value: arg }))
        })
    }
}
