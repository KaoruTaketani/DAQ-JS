import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').Histogram} */
        this._tofHistogram
        variables.tofHistogram.prependListener(arg => { this._tofHistogram = arg })
        /** @type {import('./index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._tofHistogram.binCounts[
                Math.floor(this._filteredNeutronEvent.tofInNanoseconds
                    / this._tofHistogram.binWidth)
            ]++
        }
    }
}
