import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Histogram} */
        this._tofHistogram
        variables.tofHistogram.prependListener(arg => { this._tofHistogram = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            const binWidth = (this._tofHistogram.binLimits[1] - this._tofHistogram.binLimits[0])
                / this._tofHistogram.binCounts.length
            this._tofHistogram.binCounts[
                Math.floor(this._filteredNeutronEvent.tofInNanoseconds
                    / binWidth)
            ]++
        }
    }
}
