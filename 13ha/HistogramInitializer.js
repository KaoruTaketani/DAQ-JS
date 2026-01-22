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
                xBinLimits: [0, 16],
                yBinLimits: [0, 16],
                numBins: [16, 16],
                binCounts: new Uint32Array(16 * 16)
            })
        }
    }
}
