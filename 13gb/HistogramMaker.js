import Operator from '../13/Operator.js'
import isbetween from '../lib/isbetween.js'
import rescale from '../lib/rescale.js'

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
            if (!isbetween(this._randomNumber, this._histogram.binLimits)) return

            const r = rescale(this._randomNumber, this._histogram.binLimits),
                i = Math.floor(r * this._histogram.binCounts.length)
            this._histogram.binCounts[i]++
            variables.histogram.assign(this._histogram)
        }
    }
}

