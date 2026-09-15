import Operator from './Operator.js'
import prod from '../lib/prod.js'
import setColumn from '../lib/setColumn.js'
import getColumn from '../lib/getColumn.js'

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
        /** @type {number[]} */
        this._overlappedLimitsInMillimeters
        variables.overlappedLimitsInMillimeters.addListener(arg => {
            this._overlappedLimitsInMillimeters = arg
            this._operation()
        })
        this._operation = () => {
            const dx = this._cameraPixelSizeInMillimeters[0]
            const oldLim = this._tofImageVProjectionYBinLimitsInMillimeters
            const dx2 = (oldLim[1] - oldLim[0]) / this._tofImageVProjectionBinCounts.shape[0]
            const newLim = this._overlappedLimitsInMillimeters
            // be careful that smaller index is shown above in the image
            // so skip first 
            const offsetMin = (newLim[0] - oldLim[0])
            // const indexMin = offsetMin / dx
            const offsetMax = (newLim[1] - oldLim[0])
            // max must be num dx*(bins+1)
            const indexMax = Math.floor(offsetMax / dx)
            console.log(dx,dx2,oldLim,newLim,offsetMax,indexMax)
            console.log(`this must be an integer: ${indexMax}`)
            const overlappedShape = [indexMax, this._tofImageVProjectionBinCounts.shape[1]]
            /** @type {import('../lib/index.js').Uint32NDArray} */
            const overlappedBinCounts = {
                shape: overlappedShape,
                data: new Uint32Array(prod(overlappedShape))
            }
            console.log(overlappedShape)
            // assuming indexMin is zero
            overlappedBinCounts.data.set(this._tofImageVProjectionBinCounts.data.slice(0,prod(overlappedShape)))
            // for (let j = 0; j < indexMax; ++j) {
            //     const original = getColumn(this._tofImageVProjectionBinCounts, j)
            //     setColumn(overlappedBinCounts, j, original.splice(0, indexMax))
            // }
            // console.log(offsetMin, indexMin, offsetMax, indexMax, this._tofImageVProjectionBinCounts.shape)
            variables.overlappedTOFImageVProjectionXBinLimitsInNanoseconds.assign(this._tofImageVProjectionXBinLimitsInNanoseconds)
            variables.overlappedTOFImageVProjectionYBinLimitsInMillimeters.assign(this._overlappedLimitsInMillimeters)
            variables.overlappedTOFImageVProjectionBinCounts.assign(overlappedBinCounts)
        }
    }
}
