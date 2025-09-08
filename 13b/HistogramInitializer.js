import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._histogramBinLimitsMin
        variables.histogramBinLimitsMin.addListener(arg => { this._histogramBinLimitsMin = arg })
        this._histogramBinLimitsMax
        variables.histogramBinLimitsMax.addListener(arg => { this._histogramBinLimitsMax = arg })
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._randomNumberGeneratorIsBusy) return

            variables.histogram.assign({
                binLimits: [this._histogramBinLimitsMin, this._histogramBinLimitsMax],
                binCounts: new Array(10).fill(0)
            })
        }
    }
}
