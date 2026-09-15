import Operator from './Operator.js'
import prod from '../lib/prod.js'
import setColumn from '../lib/setColumn.js'
import getColumn from '../lib/getColumn.js'
import sub2ind from '../lib/sub2ind.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Uint32NDArray|undefined} */
        this._directBeamTOFImageVProjectionBinCounts
        variables.directBeamTOFImageVProjectionBinCounts.prependListener(arg => { this._directBeamTOFImageVProjectionBinCounts = arg })
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
        this._directBeamTOFImageVProjectionYLimitsInMillimeters
        variables.directBeamTOFImageVProjectionYLimitsInMillimeters.prependListener(arg => { this._directBeamTOFImageVProjectionYLimitsInMillimeters = arg })
        /** @type {number[]} */
        this._overlappedLimitsInMillimeters
        variables.overlappedLimitsInMillimeters.addListener(arg => {
            this._overlappedLimitsInMillimeters = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._directBeamTOFImageVProjectionBinCounts) return

            // overlapped limits is given not for the direct image
            // so convert the limits to the direct beam coordinate
            // then,
            console.log(this._directBeamImageVProjectionMeanShiftInMillimeters, this._overlappedLimitsInMillimeters)
            const xmin = this._overlappedLimitsInMillimeters[0] + this._directBeamImageVProjectionMeanShiftInMillimeters
            const xmax = this._overlappedLimitsInMillimeters[1] + this._directBeamImageVProjectionMeanShiftInMillimeters
            const imin = (xmin - this._directBeamTOFImageVProjectionYLimitsInMillimeters[0]) / this._cameraPixelSizeInMillimeters[0]
            const imax = (xmax - this._directBeamTOFImageVProjectionYLimitsInMillimeters[0]) / this._cameraPixelSizeInMillimeters[0]
            console.log(xmin, xmax, this._directBeamTOFImageVProjectionYLimitsInMillimeters, this._directBeamTOFImageVProjectionBinCounts.shape, imin, imax)
            const overlappedShape = [imax - Math.ceil(imin), this._directBeamTOFImageVProjectionBinCounts.shape[1]]
            /** @type {import('../lib/index.js').Uint32NDArray} */
            const overlappedBinCounts = {
                shape: overlappedShape,
                data: new Uint32Array(prod(overlappedShape))
            }
            console.log(Math.ceil(imin), imax, (Math.ceil(imin)) * this._directBeamTOFImageVProjectionBinCounts.shape[1], overlappedShape, sub2ind(this._directBeamTOFImageVProjectionBinCounts.shape, Math.ceil(imin) + 1, 1))
            console.log(prod(overlappedShape), this._directBeamTOFImageVProjectionBinCounts.data.length)
            overlappedBinCounts.data.set(
                this._directBeamTOFImageVProjectionBinCounts.data.slice(
                    sub2ind(this._directBeamTOFImageVProjectionBinCounts.shape, Math.ceil(imin) + 1, 1)
                )
            )
            const n = this._directBeamImageVProjectionMeanShiftInMillimeters / this._cameraPixelSizeInMillimeters[0]
            const frac = n - Math.floor(n)
            console.log(this._directBeamImageVProjectionMeanShiftInMillimeters, this._cameraPixelSizeInMillimeters[0], n, frac)
            // const dx = this._cameraPixelSizeInMillimeters[0]
            // const oldLim = this._tofImageVProjectionYBinLimitsInMillimeters
            // const dx2 = (oldLim[1] - oldLim[0]) / this._directBeamTOFImageVProjectionBinCounts.shape[0]
            // const newLim = this._overlappedLimitsInMillimeters
            // // be careful that smaller index is shown above in the image
            // // so skip first 
            // const offsetMin = (newLim[0] - oldLim[0])
            // // const indexMin = offsetMin / dx
            // const offsetMax = (newLim[1] - oldLim[0])
            // // max must be num dx*(bins+1)
            // const indexMax = Math.floor(offsetMax / dx)
            // console.log(dx, dx2, oldLim, newLim, offsetMax, indexMax)
            // console.log(`this must be an integer: ${indexMax}`)
            // const overlappedShape = [indexMax, this._directBeamTOFImageVProjectionBinCounts.shape[1]]
            // /** @type {import('../lib/index.js').Uint32NDArray} */
            // const overlappedBinCounts = {
            //     shape: overlappedShape,
            //     data: new Uint32Array(prod(overlappedShape))
            // }
            // console.log(overlappedShape)
            // // assuming indexMin is zero
            // // if needs offset index, give slice's first index
            // // by using sub2ind(data,innd,1)
            // overlappedBinCounts.data.set(this._directBeamTOFImageVProjectionBinCounts.data.slice(0, prod(overlappedShape)))
            // // for (let j = 0; j < indexMax; ++j) {
            // //     const original = getColumn(this._tofImageVProjectionBinCounts, j)
            // //     setColumn(overlappedBinCounts, j, original.splice(0, indexMax))
            // // }
            // // console.log(offsetMin, indexMin, offsetMax, indexMax, this._tofImageVProjectionBinCounts.shape)
            // variables.overlappedTOFImageVProjectionXBinLimitsInNanoseconds.assign(this._tofImageVProjectionXBinLimitsInNanoseconds)
            // variables.overlappedTOFImageVProjectionYBinLimitsInMillimeters.assign(this._overlappedLimitsInMillimeters)
            // variables.overlappedTOFImageVProjectionBinCounts.assign(overlappedBinCounts)
        }
    }
}
