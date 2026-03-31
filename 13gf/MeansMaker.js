import Operator from '../13/Operator.js'
import mean from '../lib/mean.js'
import sum from '../lib/sum.js'
import linspace from '../lib/linspace.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._means
        variables.means.addListener(arg => { this._means = arg })
        this._meanErrors
        variables.meanErrors.addListener(arg => { this._meanErrors = arg })
        this._histogramBinCounts
        variables.histogramBinCounts.addListener(arg => { this._histogramBinCounts = arg })
        this._batchProcessorIsBusy
        variables.batchProcessorIsBusy.addListener(arg => { this._batchProcessorIsBusy = arg })
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._batchProcessorIsBusy) return
            if (!this._histogramBinCounts) return
            if (this._randomNumberGeneratorIsBusy) return

            const m = mean(linspace(0.05, 0.95, 10), this._histogramBinCounts)

            this._meanErrors.push(1/Math.sqrt(sum(this._histogramBinCounts)))
            this._means.push(m)
            variables.means.assign(this._means)
        }
    }
}

