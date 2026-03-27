import Operator from './Operator.js'
import sub2ind from '../lib/sub2ind.js'
import diff from '../lib/diff.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._roiInPixels
        variables.roiInPixels.prependListener(arg => { this._roiInPixels = arg })
        /** @type {number[]} */
        this._tofImageZBinLimitsInNanoseconds
        variables.tofImageZBinLimitsInNanoseconds.prependListener(arg => { this._tofImageZBinLimitsInNanoseconds = arg })
        /** @type {import('../lib/index.js').Uint16Dataset} */
        this._tofImage
        variables.tofImage.prependListener(arg => { this._tofImage = arg })
        /** @type {import('../lib/index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            const binWidth = diff(this._tofImageZBinLimitsInNanoseconds)[0]
                / this._tofImage.shape[0],
                [x, y, _w, _h] = this._roiInPixels
            // sub2ind expects indexes to start frpm 1
            this._tofImage.data[sub2ind(
                this._tofImage.shape,
                Math.floor(this._filteredNeutronEvent.tofInNanoseconds / binWidth),
                this._filteredNeutronEvent.yCoordinateInPixels - y,
                this._filteredNeutronEvent.xCoordinateInPixels - x
            )]++
        }
    }
}
