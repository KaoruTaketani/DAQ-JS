import Operator from './Operator.js'
import sub2ind from './sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._roiX
        variables.roiX.prependListener(arg => { this._roiX = arg })
        /** @type {number} */
        this._roiY
        variables.roiY.prependListener(arg => { this._roiY = arg })
        /** @type {import('./index.js').Histogram3D} */
        this._filteredTOFImage
        variables.filteredTOFImage.prependListener(arg => { this._filteredTOFImage = arg })
        /** @type {import('./index.js').NeutronEvent} */
        this._filteredNeutronEvent
        variables.filteredNeutronEvent.addListener(arg => {
            this._filteredNeutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._filteredTOFImage.binCounts[sub2ind(
                this._filteredTOFImage.numBins,
                Math.round(this._filteredNeutronEvent.tof / 1_000_000), /** in ms */
                this._filteredNeutronEvent.y - this._roiY, /** in raw image pixcel */
                this._filteredNeutronEvent.x - this._roiX /** in raw image pixcel */
            )]++
        }
    }
}
