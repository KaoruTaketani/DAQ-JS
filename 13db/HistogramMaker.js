import Operator from '../13/Operator.js'
import isbetween from '../lib/isbetween.js'
import rescale from '../lib/rescale.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._histogramBinLimits
        variables.histogramBinLimits.addListener(arg => { this._histogramBinLimits = arg })
        this._histogramBinCounts
        variables.histogramBinCounts.addListener(arg => { this._histogramBinCounts = arg })
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            if (!isbetween(this._randomNumber, this._histogramBinLimits)) return

            const r = rescale(this._randomNumber, this._histogramBinLimits),
                i = Math.floor(r * this._histogramBinCounts.length)
            this._histogramBinCounts[i]++
            variables.histogramBinCounts.assign(this._histogramBinCounts)
        }
    }
}

