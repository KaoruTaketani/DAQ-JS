import Operator from './Operator.js'
import sub2ind from './sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._roiXInPixels
        variables.roiXInPixels.prependListener(arg => { this._roiXInPixels = arg })
        /** @type {import('./index.js').Histogram2D} */
        this._filteredHorizontalProjections
        variables.filteredHorizontalProjections.prependListener(arg => { this._filteredHorizontalProjections = arg })
        /** @type {import('./index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._filteredHorizontalProjections.binCounts[sub2ind(
                this._filteredHorizontalProjections.numBins,
                Math.round(this._filteredNeutronEvent.tof / 1_000_000), /** in ms */
                this._filteredNeutronEvent.x - this._roiXInPixels /** in raw image pixcel */
            )]++
        }
    }
}
