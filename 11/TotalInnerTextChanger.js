import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketServer
        variables.webSocketServer.addListener(arg => { this._webSocketServer = arg })
        this._total
        variables.total.addListener(arg => {
            this._total = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketServer.clients.forEach(ws => {
                ws.send(JSON.stringify({
                    key: 'totalInnerText',
                    value: `total is ${this._total}`
                }))
            })
        }
    }
}

