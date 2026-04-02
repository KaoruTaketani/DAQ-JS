import Operator from './Operator.js'
import sub2ind from '../lib/sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._roiInPixels
        variables.roiInPixels.prependListener(arg => { this._roiInPixels = arg })
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._filteredImageBinCounts
        variables.filteredImageBinCounts.prependListener(arg => { this._filteredImageBinCounts = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            const [x, y] = this._roiInPixels
            this._filteredImageBinCounts.data[sub2ind(
                this._filteredImageBinCounts.shape,
                this._filteredNeutronEvent.yCoordinateInPixels - y,
                this._filteredNeutronEvent.xCoordinateInPixels - x
            )]++
        }
    }
}
