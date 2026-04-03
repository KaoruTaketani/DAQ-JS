import colon from '../lib/colon.js'
import mean from '../lib/mean.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._horizontalProjectionHistograms
        variables.horizontalProjectionHistogramsBinCounts.addListener(arg => {
            this._horizontalProjectionHistograms = arg
            this._operation()
        })
        this._operation = () => {
            const numBins = this._horizontalProjectionHistograms.shape,
                means = new Float64Array(numBins[0])

            for (let i = 0; i < numBins[0]; ++i) {
                const weights = this._horizontalProjectionHistograms.data.slice(i * numBins[1], (i + 1) * numBins[1])

                means[i] = mean(colon(1, numBins[1]), weights)
            }
            variables.horizontalProjectionMeans.assign(means)
        }
    }
}
