import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketUrls
        variables.webSocketUrls.addListener(arg => { this._webSocketUrls = arg })
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketUrls.forEach((url, ws) => {
                if (url !== '/RandomNumberGeneratorClient.js') return

                ws.send(JSON.stringify({
                    key: 'randomNumberInnerText',
                    value: `random number is ${this._randomNumber}`
                }))
            })
        }
    }
}

