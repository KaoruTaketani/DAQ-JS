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
        this._startTime
        this._operation = () => {
            if (this._startTime) return

            this._startTime = Date.now()
            this._webSocketPathnames.forEach((pathname, ws) => {
                if (pathname === '/startTimeInnerText')
                    ws.send(`start time is ${new Date(this._startTime).toString()}`)
            })
        }
    }
}


