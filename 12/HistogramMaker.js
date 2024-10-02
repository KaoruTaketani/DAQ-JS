import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        this._histogram
        variables.histogram.addListener(arg => { this._histogram = arg })
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            if (this._histogram === undefined) return

            const i = Math.floor(this._randomNumber * 10)
            this._histogram.value[i]++
            variables.histogram.assign(this._histogram)
        }
    }
}
