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

            variables.histogramBinCounts.assign({
                shape: [16, 16],
                data: new Uint32Array(16 * 16)
            })
        }
    }
}
