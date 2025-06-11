import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._webSocketPathnames
        variables.webSocketPathnames.addListener(arg => { this._webSocketPathnames = arg })
        variables.randomNumberGeneratorIsBusy.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            this._webSocketPathnames.forEach((pathname, ws) => {
                if (pathname === '/startTimeInnerText')
                    ws.send(`start time is ${new Date(Date.now()).toString()}`)
            })
        }
    }
}


