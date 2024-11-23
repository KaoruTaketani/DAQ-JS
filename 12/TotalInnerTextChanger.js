import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketPathnames
        variables.webSocketPathnames.addListener(arg => { this._webSocketPathnames = arg })
        this._total
        variables.total.addListener(arg => {
            this._total = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketPathnames.forEach((pathname, ws) => {
                if (pathname !== '/totalInnerText') return

                ws.send(`total is ${this._total}`)
            })
        }
    }
}

