import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._pulseHeightHistogramNumBins
        variables.pulseHeightHistogramNumBins.addListener(arg => {
            this._pulseHeightHistogramNumBins = arg
            this._operation()
        })
        this._operation = () => {
            variables.pulseHeightHistogram.assign({
                binCounts: new Array(this._pulseHeightHistogramNumBins).fill(0),
                binWidth: 1
            })
        }
    }
}
