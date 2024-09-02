import StringIndicator from './StringIndicator.js'

export default class extends StringIndicator {
    constructor(channel, webSockets, connectedWebSocket) {
        super(channel, webSockets, connectedWebSocket)
        connectedWebSocket.addListener(arg => {
            arg.on('message', data => {
                const arg = JSON.parse(data.toString())
                if (arg.channel !== this._channel) return

                // super.assign(arg.value) sends arg.value to all html
                this._listeners.forEach(listener => { listener(arg.value) })
            })
        })
    }
    assign(arg) {
        // if (this._value === arg) return
        super.assign(arg)
    }
}
