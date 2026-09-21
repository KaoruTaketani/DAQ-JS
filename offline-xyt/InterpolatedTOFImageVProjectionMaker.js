import Operator from './Operator.js'
import prod from '../lib/prod.js'
import sub2ind from '../lib/sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Uint32NDArray} */
        this._tofImageVProjectionBinCounts
        variables.tofImageVProjectionBinCounts.prependListener(arg => { this._tofImageVProjectionBinCounts = arg })
        /** @type {number[]} */
        this._cameraPixelSizeInMillimeters
        variables.cameraPixelSizeInMillimeters.prependListener(arg => { this._cameraPixelSizeInMillimeters = arg })
        /** @type {number[]} */
        this._tofImageVProjectionYBinLimitsInMillimeters
        variables.tofImageVProjectionYBinLimitsInMillimeters.prependListener(arg => { this._tofImageVProjectionYBinLimitsInMillimeters = arg })
        /** @type {number[]} */
        this._tofImageVProjectionXBinLimitsInNanoseconds
        variables.tofImageVProjectionXBinLimitsInNanoseconds.prependListener(arg => { this._tofImageVProjectionXBinLimitsInNanoseconds = arg })
        /** @type {number} */
        this._directBeamImageVProjectionMeanShiftInMillimeters
        variables.directBeamImageVProjectionMeanShiftInMillimeters.prependListener(arg => { this._directBeamImageVProjectionMeanShiftInMillimeters = arg })
        /** @type {number[]} */
        this._trimmedLimitsInMillimeters
        variables.trimmedLimitsInMillimeters.prependListener(arg => { this._trimmedLimitsInMillimeters = arg })
        /** @type {import('../lib/index.js').Uint32NDArray|undefined} */
        this._trimmedTOFImageVProjectionBinCounts
        variables.trimmedTOFImageVProjectionBinCounts.prependListener(arg => { this._trimmedTOFImageVProjectionBinCounts = arg })
        /** @type {import('../lib/index.js').Uint32NDArray|undefined} */
        this._overlappedTOFImageVProjectionBinCounts
        variables.overlappedTOFImageVProjectionBinCounts.addListener(arg => {
            this._overlappedTOFImageVProjectionBinCounts = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._overlappedTOFImageVProjectionBinCounts) return
            if (!this._trimmedTOFImageVProjectionBinCounts) return

            const dx = this._cameraPixelSizeInMillimeters[0]
            const shift = this._directBeamImageVProjectionMeanShiftInMillimeters
            const r = shift / dx
            const t = r - Math.floor(r)
            console.log(r, t)
            const shape = this._trimmedTOFImageVProjectionBinCounts.shape
            /** @type {import('../lib/index.js').Uint32NDArray} */
            const interpolatedBinCounts = {
                shape: shape,
                data: new Uint32Array(prod(this._trimmedTOFImageVProjectionBinCounts.shape))
            }
            for (let j = 0; j < shape[1]; ++j) {
                for (let i = 0; i < shape[0]; ++i) {
                    const v1 = this._overlappedTOFImageVProjectionBinCounts.data[sub2ind(shape, i + 1, j + 1)]
                    const v2 = this._overlappedTOFImageVProjectionBinCounts.data[sub2ind(shape, i + 1, j + 2)]
                    const v = v1 + t * (v2 - v1)
                    // const v = (1 - t) * v1 + t * v2
                    interpolatedBinCounts.data[sub2ind(shape, i + 1, j + 1)] = v
                }
            }

            variables.interpolatedTOFImageVProjectionXBinLimitsInNanoseconds.assign(this._tofImageVProjectionXBinLimitsInNanoseconds)
            variables.interpolatedTOFImageVProjectionYBinLimitsInMillimeters.assign(this._trimmedLimitsInMillimeters)
            variables.interpolatedTOFImageVProjectionBinCounts.assign(interpolatedBinCounts)
        }
    }
}
