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
        variables.imageVProjectionMeanInMillimeters.prependListener(arg => {
            this._imageVProjectionMeanInMillimeters = arg
            this._operation()
        })
        this._operation = () => {
            if (Number.isNaN(this._directBeamImageVProjectionMeanInMillimeters)) return

            const x0 = this._imageVProjectionMeanInMillimeters
            const x0d = this._directBeamImageVProjectionMeanInMillimeters
            const xlim = this._tofImageVProjectionYBinLimitsInMillimeters
            const xlimd = this._directBeamTOFImageVProjectionYLimitsInMillimeters
            console.log(x0, x0d, xlim, xlimd)



        }
    }
}
