import Operator from './Operator.js'
import sub2ind from '../lib/sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._roiXInPixels
        variables.roiXInPixels.prependListener(arg => { this._roiXInPixels = arg })
        /** @type {import('../lib/index.js').Histogram2D} */
        this._horizontalProjectionHistograms
        variables.horizontalProjectionHistograms.prependListener(arg => { this._horizontalProjectionHistograms = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            const binWidth = (this._horizontalProjectionHistograms.yBinLimits[1] - this._horizontalProjectionHistograms.yBinLimits[0])
                / this._horizontalProjectionHistograms.numBins[0]
            // sub2ind expects indexes to start frpm 1
            this._horizontalProjectionHistograms.binCounts[sub2ind(
                this._horizontalProjectionHistograms.numBins,
                Math.floor(this._filteredNeutronEvent.tofInNanoseconds / binWidth),
                this._filteredNeutronEvent.xCoordinateInPixels - this._roiXInPixels
            )]++
        }
    }
}
