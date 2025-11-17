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
        /** @type {import('../lib/index.js').Histogram2D} */
        this._filteredImage
        variables.filteredImage.prependListener(arg => { this._filteredImage = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._filteredImage.binCounts[sub2ind(
                this._filteredImage.numBins,
                this._filteredNeutronEvent.yPositionInPixels - this._roiYInPixels,
                this._filteredNeutronEvent.xPositionInPixels - this._roiXInPixels
            )]++
        }
    }
}
