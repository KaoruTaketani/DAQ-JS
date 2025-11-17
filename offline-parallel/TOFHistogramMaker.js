import Operator from './Operator.js'
import isbetween from '../lib/isbetween.js'
import rescale from '../lib/rescale.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default|import('./WorkerVariables.js').default} variables 
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
            if (!isbetween(this._filteredNeutronEvent.tofInNanoseconds, this._tofHistogram.binLimits)) return

            const r = rescale(this._filteredNeutronEvent.tofInNanoseconds, this._tofHistogram.binLimits),
                i = Math.floor(r * this._tofHistogram.binCounts.length)
            this._tofHistogram.binCounts[i]++
        }
    }
}
