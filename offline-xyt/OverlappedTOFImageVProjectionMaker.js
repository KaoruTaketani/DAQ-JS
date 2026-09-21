import Operator from './Operator.js'
import prod from '../lib/prod.js'
import sub2ind from '../lib/sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._cameraPixelSizeInMillimeters
        variables.cameraPixelSizeInMillimeters.prependListener(arg => { this._cameraPixelSizeInMillimeters = arg })
        /** @type {number[]} */
        this._tofImageVProjectionXBinLimitsInNanoseconds
        variables.tofImageVProjectionXBinLimitsInNanoseconds.prependListener(arg => { this._tofImageVProjectionXBinLimitsInNanoseconds = arg })
        /** @type {import('../lib/index.js').Uint32NDArray|undefined} */
        this._directBeamTOFImageVProjectionBinCounts
        variables.directBeamTOFImageVProjectionBinCounts.prependListener(arg => { this._directBeamTOFImageVProjectionBinCounts = arg })
        /** @type {number[]} */
        this._trimmedLimitsInMillimeters
        variables.trimmedLimitsInMillimeters.prependListener(arg => { this._trimmedLimitsInMillimeters = arg })
        /** @type {number} */
        this._directBeamImageVProjectionMeanShiftInMillimeters
        variables.directBeamImageVProjectionMeanShiftInMillimeters.prependListener(arg => { this._directBeamImageVProjectionMeanShiftInMillimeters = arg })
        /** @type {number[]} */
        this._directBeamTOFImageVProjectionYLimitsInMillimeters
        variables.directBeamTOFImageVProjectionYLimitsInMillimeters.prependListener(arg => { this._directBeamTOFImageVProjectionYLimitsInMillimeters = arg })
        /** @type {import('../lib/index.js').Uint32NDArray|undefined} */
        this._trimmedTOFImageVProjectionBinCounts
        variables.trimmedTOFImageVProjectionBinCounts.addListener(arg => {
            this._trimmedTOFImageVProjectionBinCounts = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._directBeamTOFImageVProjectionBinCounts) return
            if (!this._trimmedTOFImageVProjectionBinCounts) return

            // move direct tof image vproj to overlap trimmed tof image vproj     
            // first, find the trimmed limits in direct tof image vproj's coordinate
            const shift = this._directBeamImageVProjectionMeanShiftInMillimeters
            const xmin = this._trimmedLimitsInMillimeters[0] + shift
            const xmax = this._trimmedLimitsInMillimeters[1] + shift
            console.log(`shiftedTrimmedLim: ${[xmin, xmax]}`)
            // then find corresponding index of direct tof image vproj
            const dx = this._cameraPixelSizeInMillimeters[0]
            const imin = Math.floor((xmin - this._directBeamTOFImageVProjectionYLimitsInMillimeters[0]) / dx)
            const imax = Math.ceil((xmax - this._directBeamTOFImageVProjectionYLimitsInMillimeters[0]) / dx)
            console.log(`iLim: ${[imin, imax]}, iLen: ${imax - imin}, shape: ${this._directBeamTOFImageVProjectionBinCounts.shape}, trimmedShape: ${this._trimmedTOFImageVProjectionBinCounts.shape}`)
            if (imax - imin - 1 !== this._trimmedTOFImageVProjectionBinCounts.shape[0]) {
                throw new Error('unexpected')
            }
            const overlappedShape = [imax - imin, this._directBeamTOFImageVProjectionBinCounts.shape[1]]
            // use index to evaluate xlim
            const overlappedLimit = [
                imin * dx + this._directBeamTOFImageVProjectionYLimitsInMillimeters[0], 
                imax * dx + this._directBeamTOFImageVProjectionYLimitsInMillimeters[0]
            ]
            console.log(`indexLim: ${[imin, imax]}, overlappedShape: ${overlappedShape}, overllapedLimit: ${overlappedLimit}`)

            /** @type {import('../lib/index.js').Uint32NDArray} */
            const overlappedBinCounts = {
                shape: overlappedShape,
                data: new Uint32Array(prod(overlappedShape))
            }
            overlappedBinCounts.data.set(
                this._directBeamTOFImageVProjectionBinCounts.data.slice(
                    // sub2ind expects index start from 1
                    sub2ind(this._directBeamTOFImageVProjectionBinCounts.shape, imin + 1, 1)
                )
            )
            variables.overlappedTOFImageVProjectionXBinLimitsInNanoseconds.assign(this._tofImageVProjectionXBinLimitsInNanoseconds)
            variables.overlappedTOFImageVProjectionYBinLimitsInMillimeters.assign(overlappedLimit)
            variables.overlappedTOFImageVProjectionBinCounts.assign(overlappedBinCounts)
        }
    }
}
