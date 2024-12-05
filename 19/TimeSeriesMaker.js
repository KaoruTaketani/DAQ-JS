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
            this._timeSeries.time.copyWithin(0, 1)
            this._timeSeries.time[this._timeSeries.time.length - 1] = Date.now()
            this._timeSeries.data.copyWithin(0, 1)
            this._timeSeries.data[this._timeSeries.data.length - 1] = this._randomNumber
            variables.timeSeries.assign(this._timeSeries)
        }
    }
}

