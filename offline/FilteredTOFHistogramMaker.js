import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').Histogram} */
        this._filteredTOFHistogram
        variables.filteredTOFHistogram.prependListener(arg => { this._filteredTOFHistogram = arg })
        /** @type {import('./index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            const id = Math.floor(this._filteredNeutronEvent.tof / (this._filteredTOFHistogram.binLimits[1] / this._filteredTOFHistogram.binCounts.length))

            this._filteredTOFHistogram.binCounts[id]++
        }
    }
}
