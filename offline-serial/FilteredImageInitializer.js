import Operator from './Operator.js'
import prod from '../lib/prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._neutronPositionMaxInMillimeters
        variables.neutronPositionMaxInMillimeters.prependListener(arg => { this._neutronPositionMaxInMillimeters = arg })
        /** @type {number} */
        this._neutronPositionBitLength
        variables.neutronPositionBitLength.prependListener(arg => { this._neutronPositionBitLength = arg })
        /** @type {number} */
        this._imageBinWidthInMillimeters
        variables.imageBinWidthInMillimeters.prependListener(arg => { this._imageBinWidthInMillimeters = arg })
        /** @type {number[]} */
        this._roiInPixels
        variables.roiInPixels.addListener(arg => {
            this._roiInPixels = arg
            this._operation()
        })
        this._operation = () => {
            const [x, y, w, h] = this._roiInPixels

            const size = [h, w]
            variables.filteredImageXBinLimitsInMillimeters.assign([x, x + w + 1].map(v => v * this._imageBinWidthInMillimeters))
            variables.filteredImageYBinLimitsInMillimeters.assign([y, y + h + 1].map(v => v * this._imageBinWidthInMillimeters))
            variables.filteredImageBinCounts.assign({
                shape: size,
                data: new Uint32Array(prod(size))
            })
        }
    }
}
