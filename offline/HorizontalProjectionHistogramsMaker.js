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
        this._horizontalProjectionHistograms
        variables.horizontalProjectionHistograms.prependListener(arg => { this._horizontalProjectionHistograms = arg })
        /** @type {import('./index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            // sub2ind expects indexes to start frpm 1
            this._horizontalProjectionHistograms.binCounts[sub2ind(
                this._horizontalProjectionHistograms.numBins,
                Math.ceil(this._filteredNeutronEvent.tofInNanoseconds
                    / this._horizontalProjectionHistograms.binWidth[0]),
                this._filteredNeutronEvent.xPositionInPixels - this._roiXInPixels
            )]++
        }
    }
}
