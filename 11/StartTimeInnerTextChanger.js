import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._startTime
        variables.startTime.addListener(arg => {
            this._startTime = arg
            this._operation()
        })
        this._operation = () => {
            variables.startTimeInnerText.assign(`start time is ${new Date(this._startTime).toString()}`)
        }
    }
}

