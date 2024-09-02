import ListenableString from './ListenableString.js'

export default class extends ListenableString {
    constructor(channel, webSockets, connectedWebSocket) {
        super()
        this._value
        this._channel = channel
        this._webSockets
        webSockets.prependListener(arg => { this._webSockets = arg })
        connectedWebSocket.addListener(arg => {
            arg.send(JSON.stringify({ channel: this._channel, value: this._value }))
        })
    }
    assign(arg) {
        this._value = arg
        if (this._webSockets) {
            this._webSockets.forEach(webSocket => {
                webSocket.send(JSON.stringify({ channel: this._channel, value: this._value }))
            })
        }
        super.assign(arg)
    }
}
