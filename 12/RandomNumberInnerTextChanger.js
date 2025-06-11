import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketPathnames
        variables.webSocketPathnames.addListener(arg => { this._webSocketPathnames = arg })
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketPathnames.forEach((pathname, ws) => {
                if (pathname !== '/randomNumberInnerText') return
                
                ws.send(`random number is ${this._randomNumber}`)
            })
        }
    }
}

