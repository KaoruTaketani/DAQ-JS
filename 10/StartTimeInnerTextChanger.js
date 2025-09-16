import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketPathnames
        variables.webSocketPathnames.addListener(arg => { this._webSocketPathnames = arg })
        this._startTime
        variables.startTime.addListener(arg => {
            this._startTime = arg
            this._operation()
        })
        this._operation = () => {
            this._webSocketPathnames.forEach((pathname, ws) => {
                if (pathname === '/startTimeInnerText')
                    ws.send(`start time is ${this._startTime.toString()}`)
            })
        }
    }
}


