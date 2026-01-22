import Operator from './Operator.js'
import fft0 from '../lib/fft0.js'
import sum from '../lib/sum.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._frequencyVectorLength
        variables.frequencyVectorLength.prependListener(arg => { this._frequencyVectorLength = arg })
        /** @type {import('../lib/index.js').Histogram} */
        this._tofHistogram
        variables.tofHistogram.addListener(arg => {
            this._tofHistogram = arg
            this._operation()
        })
        this._operation = () => {
            if (this._tofHistogram.binCounts.reduce((a, b) => a + b, 0) === 0) return

            const numBins = this._frequencyVectorLength

            const contrast = new Array(this._tofHistogram.binCounts.length / numBins).fill(0).map((_, i) => {
                /** see @MIEZEContrast */
                const s = this._tofHistogram.binCounts.slice(i * numBins, (i + 1) * numBins),
                    [x, y] = fft0(s),
                    b = sum(s)

                // return b === 0 ? Infinity : 2 * Math.hypot(x, y) / b
                // may be useful not to include NaN into hdf5 files for later use
                return b === 0 ? 1 : 2 * Math.hypot(x, y) / b
            })
            variables.contrast.assign(contrast)
        }
    }
}
