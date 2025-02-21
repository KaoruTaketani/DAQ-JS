import miezeB8 from './miezeB8.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._kickerPulseCount
        variables.kickerPulseCount.prependListener(arg => { this._kickerPulseCount = arg })
        /** @type {import('./index.js').Histogram} */
        this._filteredTOFHistogram
        variables.filteredTOFHistogram.addListener(arg => {
            this._filteredTOFHistogram = arg
            this._operation()
        })
        this._operation = () => {
            const n = 8

            const neutronRate = new Array(this._filteredTOFHistogram.binCounts.length / n).fill(0).map((_, i) => {
                const b = miezeB8(this._filteredTOFHistogram.binCounts, n * i)
                return b / this._kickerPulseCount
            })
            variables.neutronRate.assign(neutronRate)
        }
    }
}
