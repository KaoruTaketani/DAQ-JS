import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
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
            const i = Math.floor((this._randomNumber * this._histogram.binCounts.length))
            this._histogram.binCounts[i]++
            variables.histogram.assign(this._histogram)
        }
    }
}

