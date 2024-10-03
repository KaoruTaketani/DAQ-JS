import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketUrls
        variables.webSocketUrls.addListener(arg => { this._webSocketUrls = arg })
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketUrls.forEach((url, ws) => {
                if (url !== '/RandomNumberGeneratorClient.js') return
                
                ws.send(JSON.stringify({ 
                    key: 'randomNumberStopDisabled', 
                    value: !this._randomNumberGeneratorIsBusy
                }))
            })
        }
    }
}

