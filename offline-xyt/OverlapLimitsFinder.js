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
            console.log(x0, x0d, xlim, xlimd)
            const dx = x0d - x0
            const newXlim = [
                Math.max(xlimd[0] - dx, xlim[0]),
                Math.min(xlimd[1] - dx, xlim[1])
            ]
            console.log(dx, newXlim)
            variables.overlapLimitsInMillimeters.assign(newXlim)
        }
    }
}
