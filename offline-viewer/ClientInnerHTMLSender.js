import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._clientInnerHTML
        variables.clientInnerHTML.prependListener(arg => { this._clientInnerHTML = arg })
        /** @type {import('ws').WebSocket} */
        this._webSocket
        variables.clientWebSocket.addListener(arg => {
            this._webSocket = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocket.send(this._clientInnerHTML)
        }
    }
}

