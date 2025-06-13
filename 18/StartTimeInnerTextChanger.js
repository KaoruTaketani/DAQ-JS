import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
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
            variables.startTimeInnerText.assign(`start time is ${new Date(this._startTime).toString()}`)
        }
    }
}

