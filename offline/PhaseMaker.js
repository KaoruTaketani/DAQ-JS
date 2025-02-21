import Operator from './Operator.js'
import miezeX8 from './miezeX8.js'
import miezeY8 from './miezeY8.js'

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
            const n = 8

            const phase = new Array(this._filteredTOFHistogram.binCounts.length / n).fill(0).map((_, i) => {
                /** see @MIEZEPhase */
                const x = miezeX8(this._filteredTOFHistogram.binCounts, n * i)
                const y = miezeY8(this._filteredTOFHistogram.binCounts, n * i)
                return Math.atan2(y, x)
            })
            variables.phase.assign(phase)
        }
    }
}
