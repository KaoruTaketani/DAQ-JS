export default class {
    constructor(key, webSocketServer) {
        this._key = key
        this._webSocketServer
        webSocketServer.addListener(arg => { this._webSocketServer = arg })
    }
    assign(arg) {
        this._webSocketServer.clients.forEach(ws => {
            ws.send(JSON.stringify({ key: this._key, value: arg }))
        })
    }
}
