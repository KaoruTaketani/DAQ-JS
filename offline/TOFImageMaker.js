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
        /** @type {number} */
        this._roiYInPixels
        variables.roiYInPixels.prependListener(arg => { this._roiYInPixels = arg })
        /** @type {import('./index.js').Histogram3D} */
        this._tofImage
        variables.tofImage.prependListener(arg => { this._tofImage = arg })
        /** @type {import('./index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._tofImage.binCounts[sub2ind(
                this._tofImage.numBins,
                Math.round(this._filteredNeutronEvent.tofInNanoseconds 
                    / this._tofImage.binWidth[0]),
                this._filteredNeutronEvent.y - this._roiYInPixels, /** in raw image pixcel */
                this._filteredNeutronEvent.x - this._roiXInPixels /** in raw image pixcel */
            )]++
        }
    }
}
