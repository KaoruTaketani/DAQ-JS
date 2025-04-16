import freqspace from './freqspace.js'
import miezeB from './miezeB.js'
import miezeX from './miezeX.js'
import miezeY from './miezeY.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._frequencyVectorLength
        variables.frequencyVectorLength.prependListener(arg => { this._frequencyVectorLength = arg })
        /** @type {import('./index.js').Histogram} */
        this._filteredTOFHistogram
        variables.filteredTOFHistogram.addListener(arg => {
            this._filteredTOFHistogram = arg
            this._operation()
        })
        this._operation = () => {
            if (this._filteredTOFHistogram.binCounts.reduce((a, b) => a + b, 0) === 0) return

            const n = this._frequencyVectorLength,
                fs = freqspace(n)

            const contrast = new Array(this._filteredTOFHistogram.binCounts.length / n).fill(0).map((_, i) => {
                /** see @MIEZEContrast */
                // const x = miezeX8(this._filteredTOFHistogram.binCounts, n * i)
                const x = miezeX(this._filteredTOFHistogram.binCounts, fs, i)
                // const y = miezeY8(this._filteredTOFHistogram.binCounts, n * i)
                const y = miezeY(this._filteredTOFHistogram.binCounts, fs, i)
                // const b = miezeB8(this._filteredTOFHistogram.binCounts, n * i)
                const b = miezeB(this._filteredTOFHistogram.binCounts, fs, i)
                // return b === 0 ? Infinity : 2 * Math.hypot(x, y) / b
                // may be useful not to include NaN into hdf5 files for later use
                return b === 0 ? 1 : 2 * Math.hypot(x, y) / b
            })
            variables.contrast.assign(contrast)
        }
    }
}
