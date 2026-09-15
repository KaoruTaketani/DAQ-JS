import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._tofImageVProjectionYBinLimitsInMillimeters
        variables.tofImageVProjectionYBinLimitsInMillimeters.prependListener(arg => { this._tofImageVProjectionYBinLimitsInMillimeters = arg })
        /** @type {number[]} */
        this._directBeamTOFImageVProjectionYLimitsInMillimeters
        variables.directBeamTOFImageVProjectionYLimitsInMillimeters.prependListener(arg => { this._directBeamTOFImageVProjectionYLimitsInMillimeters = arg })
        /** @type {number} */
        this._directBeamImageVProjectionMeanInMillimeters
        variables.directBeamImageVProjectionMeanInMillimeters.prependListener(arg => { this._directBeamImageVProjectionMeanInMillimeters = arg })
        /** @type {number[]} */
        this._cameraPixelSizeInMillimeters
        variables.cameraPixelSizeInMillimeters.prependListener(arg => { this._cameraPixelSizeInMillimeters = arg })
        /** @type {number} */
        this._imageVProjectionMeanInMillimeters
        variables.imageVProjectionMeanInMillimeters.addListener(arg => {
            this._imageVProjectionMeanInMillimeters = arg
            this._operation()
        })
        this._operation = () => {
            // if (Number.isNaN(this._directBeamImageVProjectionMeanInMillimeters)) return
            // if (this.__directBeamTOFImageVProjectionYLimitsInMillimeters.length === 0) return

            // x0 first 25 and finally updated to 25.0713 after edr finishes
            // by imageVProjectionBinCounts is used to calculate x0
            // so x0 shuld be cleanup
            const x0 = this._imageVProjectionMeanInMillimeters
            const x0d = this._directBeamImageVProjectionMeanInMillimeters
            const xlim = this._tofImageVProjectionYBinLimitsInMillimeters
            const xlimd = this._directBeamTOFImageVProjectionYLimitsInMillimeters
            const dx = this._cameraPixelSizeInMillimeters[0]
            // console.log(x0, x0d, xlim, xlimd)
            const shift = x0d - x0
            const newMin = Math.max(xlimd[0] - shift, xlim[0])
            const newMax = Math.min(xlimd[1] - shift, xlim[1])
            const minIndex = (xlim[0] - newMin) / dx
            const maxIndex = (xlim[1] - newMax) / dx

            const newXlim = [
                newMin,
                // max must be num dx*(bins+1)
                // newMin + dx * (Math.floor(maxIndex) + 1)
                newMax
            ]
            // console.log(dx, shift, minIndex, Math.ceil(minIndex), maxIndex, Math.floor(maxIndex), newXlim)
            console.log(shift, xlim, xlimd, newXlim)
            variables.overlappedLimitsInMillimeters.assign(newXlim)
        }
    }
}
