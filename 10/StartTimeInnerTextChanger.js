import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketPathnames
        variables.webSocketPathnames.addListener(arg => { this._webSocketPathnames = arg })
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._startTime
        this._operation = () => {
            if (this._randomNumberGeneratorIsBusy) {
                this._startTime = Date.now()
            }
            this._webSocketPathnames.forEach((pathname, ws) => {
                if (pathname === '/startTimeInnerText')
                    ws.send(`start time is ${new Date(Date.now()).toString()}`)
            })
        }
    }
}


