import Operator from '../14/Operator.js'

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
            const binWidth = (this._histogram.binLimits[1] - this._histogram.binLimits[0]) / this._histogram.binCounts.length,
                i = Math.floor(this._randomNumber - this._histogram.binLimits[0] / binWidth)

            if (i >= this._histogram.binCounts.length) return
            if (i < 0) return
            this._histogram.binCounts[i]++
            variables.histogram.assign(this._histogram)
        }
    }
}

