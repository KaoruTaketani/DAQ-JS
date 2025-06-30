import colon from '../lib/colon.js'
import mean from '../lib/mean.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').Histogram2D} */
        this._horizontalProjectionHistograms
        variables.horizontalProjectionHistograms.addListener(arg => {
            this._horizontalProjectionHistograms = arg
            this._operation()
        })
        this._operation = () => {
            const numBins = this._horizontalProjectionHistograms.numBins,
                means = new Array(numBins[0]).fill(0)

            for (let i = 0; i < numBins[0]; ++i) {
                const weights = this._horizontalProjectionHistograms.binCounts.slice(i * numBins[1], (i + 1) * numBins[1])

                means[i] = mean(colon(0, numBins[1]), weights)
            }
            variables.horizontalProjectionMeans.assign(means)
        }
    }
}
