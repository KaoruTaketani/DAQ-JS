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
        /** @type {import('../lib/index.js').Uint32Dataset} */
        this._filteredImageBinCounts
        variables.filteredImageBinCounts.prependListener(arg => { this._filteredImageBinCounts = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._filteredImageBinCounts.data[sub2ind(
                this._filteredImageBinCounts.shape,
                this._filteredNeutronEvent.yCoordinateInPixels - this._roiYInPixels,
                this._filteredNeutronEvent.xCoordinateInPixels - this._roiXInPixels
            )]++
        }
    }
}
