import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._timeSeries
        variables.timeSeries.addListener(arg => { this._timeSeries = arg })
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            this._timeSeries.copyWithin(0, 1)
            this._timeSeries[this._timeSeries.length - 1] = this._randomNumber
            variables.timeSeries.assign(this._timeSeries)
        }
    }
}

