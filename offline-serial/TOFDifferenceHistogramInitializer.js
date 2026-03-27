import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._tofDifferenceHistogramBinLimitsInNanoseconds
        variables.tofDifferenceHistogramBinLimitsInNanoseconds.addListener(arg => {
            this._tofDifferenceHistogramBinLimitsInNanoseconds = arg
            this._operation()
        })
        this._operation = () => {
            // dt must be 25ns, which is equal to the bin width of NEUNET output
            const dt = 25,
                // when tmax=400ns & tmin=-400ns, nbin is 800/25=32
                numBins = (this._tofDifferenceHistogramBinLimitsInNanoseconds[1] - this._tofDifferenceHistogramBinLimitsInNanoseconds[0])
                    / dt

            variables.tofDifferenceHistogramBinCounts.assign({
                shape: [numBins],
                data: new Uint32Array(numBins),
            })
        }
    }
}
