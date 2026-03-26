import Operator from '../13/Operator.js'
import sum from '../lib/sum.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._preset
        variables.preset.addListener(arg => { this._preset = arg })
        this._histogramBinCounts
        variables.histogramBinCounts.addListener(arg => {
            this._histogramBinCounts = arg
            this._operation()
        })
        this._operation = () => {
            if (sum(this._histogramBinCounts) < this._preset) return

            variables.randomNumberGeneratorIsBusy.assign(false)
        }
    }
}

