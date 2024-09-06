import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./ServerVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Set<import('ws').WebSocket>} */
        this._webSockets
        variables.webSockets.prependListener(arg => { this._webSockets = arg })
        /** @type {import('ws').WebSocket} */
        this._connectedWebSocket
        variables.connectedWebSocket.addListener(arg => {
            this._connectedWebSocket = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._webSockets) {
                variables.webSockets.assign(new Set())
            }
            this._webSockets.add(this._connectedWebSocket)

            // indicators/controls send stored values to connetedWebScoket
            // controls add message handlers to call their listeners
            this._connectedWebSocket.on('message', data => {
                this._webSockets.forEach(webSocket => {
                    if (webSocket === this._connectedWebSocket) return
                    webSocket.send(data)
                })
            })
        }
    }
}
