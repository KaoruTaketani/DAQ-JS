import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._randomNumberGeneratorIsBusy) return

            variables.histogram.assign({
                xBinLimits: [0, 64],
                yBinLimits: [0, 64],
                numBins: [64, 64],
                binCounts: new Array(64 * 64).fill(0)
            })
        }
    }
}
