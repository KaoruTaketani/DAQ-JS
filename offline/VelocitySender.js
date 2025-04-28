import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./ServerVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._clientUrl
        variables.clientUrl.prependListener(arg => { this._clientUrl = arg })
        /** @type {string} */
        this._message
        variables.message.prependListener(arg => { this._message = arg })
        /** @type {import('ws').WebSocket} */
        this._clientWebSocket
        variables.clientWebSocket.addListener(arg => {
            this._clientWebSocket = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._clientUrl.endsWith('/VelocityClient.js')) return

            const args = JSON.parse(this._message)

            this._clientWebSocket.send(`velocity is ${args.length / (args.tof * 1e-3)}`)
        }
    }
}

