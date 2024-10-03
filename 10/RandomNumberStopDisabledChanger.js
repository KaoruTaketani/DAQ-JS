import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketServer
        variables.webSocketServer.addListener(arg => { this._webSocketServer = arg })
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketServer.clients.forEach(ws => {
                ws.send(JSON.stringify({
                    key: 'randomNumberStopDisabled',
                    value: !this._randomNumberGeneratorIsBusy
                }))
            })
        }
    }
}

