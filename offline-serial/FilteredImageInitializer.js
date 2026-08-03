import Operator from './Operator.js'
import prod from '../lib/prod.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._neutronPositionBitLength
        variables.neutronPositionBitLength.prependListener(arg => { this._neutronPositionBitLength = arg })
        /** @type {number[]} */
        this._cameraPixelSizeInMillimeters
        variables.cameraPixelSizeInMillimeters.prependListener(arg => { this._cameraPixelSizeInMillimeters = arg })
        /** @type {number[]} */
        this._roiInPixels
        variables.roiInPixels.addListener(arg => {
            this._roiInPixels = arg
            this._operation()
        })
        this._operation = () => {
            const [x, y, w, h] = this._roiInPixels

            const size = [h, w]
            variables.filteredImageXBinLimitsInMillimeters.assign([x, x + w + 1].map(v => v * this._cameraPixelSizeInMillimeters[0]))
            variables.filteredImageYBinLimitsInMillimeters.assign([y, y + h + 1].map(v => v * this._cameraPixelSizeInMillimeters[1]))
            variables.filteredImageBinCounts.assign({
                shape: size,
                data: new Uint32Array(prod(size))
            })
        }
    }
}
