import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._tofDifferenceHistogramMinInNanoseconds
        variables.tofDifferenceHistogramMinInNanoseconds.addListener(arg => {
            this._tofDifferenceHistogramMinInNanoseconds = arg
            this._operation()
        })
        /** @type {number} */
        this._tofDifferenceHistogramMaxInNanoseconds
        variables.tofDifferenceHistogramMaxInNanoseconds.addListener(arg => {
            this._tofDifferenceHistogramMaxInNanoseconds = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._tofDifferenceHistogramMaxInNanoseconds) return
            if (!this._tofDifferenceHistogramMinInNanoseconds) return

            // dt must be 25ns, which is equal to the bin width of NEUNET output
            const dt = 25,
                // when tmax=400ns & tmin=-400ns, nbin is 800/25=32
                numBins = (this._tofDifferenceHistogramMaxInNanoseconds - this._tofDifferenceHistogramMinInNanoseconds)
                    / dt

            variables.tofDifferenceHistogram.assign({
                binCounts: new Array(numBins).fill(0),
                binWidth: dt
            })
        }
    }
}
