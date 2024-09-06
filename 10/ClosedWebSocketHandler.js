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
        this._closedWebSocket
        variables.closedWebSocket.addListener(arg => {
            this._closedWebSocket = arg
            this._operation()
        })
        this._operation = () => {
            this._webSockets.delete(this._closedWebSocket)

            this._closedWebSocket.removeAllListeners('message')
        }
    }
}
