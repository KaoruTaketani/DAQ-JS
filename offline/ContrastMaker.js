import miezeB8 from './miezeB8.js'
import miezeX8 from './miezeX8.js'
import miezeY8 from './miezeY8.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').Histogram} */
        this._filteredTOFHistogram
        variables.filteredTOFHistogram.addListener(arg => {
            this._filteredTOFHistogram = arg
            this._operation()
        })
        this._operation = () => {
            if (this._filteredTOFHistogram.binCounts.reduce((a, b) => a + b, 0) === 0) return
            
            const n = 8

            const contrast = new Array(this._filteredTOFHistogram.binCounts.length / n).fill(0).map((_, i) => {
                /** see @MIEZEContrast */
                const x = miezeX8(this._filteredTOFHistogram.binCounts, n * i)
                const y = miezeY8(this._filteredTOFHistogram.binCounts, n * i)
                const b = miezeB8(this._filteredTOFHistogram.binCounts, n * i)
                // return b === 0 ? Infinity : 2 * Math.hypot(x, y) / b
                // may be useful not to include NaN into hdf5 files for later use
                return b === 0 ? 1 : 2 * Math.hypot(x, y) / b
            })
            variables.contrast.assign(contrast)
        }
    }
}
