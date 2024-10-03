import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketServer
        variables.webSocketServer.addListener(arg => { this._webSocketServer = arg })
        this._histogramTotal
        variables.histogramTotal.addListener(arg => {
            this._histogramTotal = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketServer.clients.forEach(ws => {
                ws.send(JSON.stringify({
                    key: 'totalInnerText',
                    value: `total is ${this._histogramTotal}`
                }))
            })
        }
    }
}

