import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketServer
        variables.webSocketServer.addListener(arg => { this._webSocketServer = arg })
        this._startTime
        variables.startTime.addListener(arg => {
            this._startTime = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketServer.clients.forEach(ws => {
                ws.send(JSON.stringify({
                    key: 'startTimeInnerText',
                    value: `start time is ${new Date(this._startTime).toString()}`
                }))
            })
        }
    }
}

