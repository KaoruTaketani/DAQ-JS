import Operator from '../13/Operator.js'
import mean from '../lib/mean.js'
import linspace from '../lib/linspace.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._means
        variables.means.addListener(arg => { this._means = arg })
        this._histogram
        variables.histogram.addListener(arg => { this._histogram = arg })
        this._batchProcessorIsBusy
        variables.batchProcessorIsBusy.addListener(arg => { this._batchProcessorIsBusy = arg })
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._batchProcessorIsBusy) return
            if (!this._histogram) return
            if (this._randomNumberGeneratorIsBusy) return

            const m = mean(linspace(0.05, 0.95, 10), this._histogram.binCounts)

            this._means.push(m)
            variables.means.assign(this._means)
        }
    }
}

