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
        /** @type {number} */
        this._roiYInPixels
        variables.roiYInPixels.prependListener(arg => { this._roiYInPixels = arg })
        /** @type {import('../lib/index.js').Histogram3D} */
        this._tofImage
        variables.tofImage.prependListener(arg => { this._tofImage = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            const binWidth = (this._tofImage.zBinLimits[1] - this._tofImage.zBinLimits[0])
                / this._tofImage.numBins[0]
            // sub2ind expects indexes to start frpm 1
            this._tofImage.binCounts[sub2ind(
                this._tofImage.numBins,
                Math.floor(this._filteredNeutronEvent.tofInNanoseconds / binWidth),
                this._filteredNeutronEvent.yPositionInPixels - this._roiYInPixels,
                this._filteredNeutronEvent.xPositionInPixels - this._roiXInPixels
            )]++
        }
    }
}
