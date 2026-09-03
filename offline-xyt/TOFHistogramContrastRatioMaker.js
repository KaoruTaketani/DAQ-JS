import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Float64Array|undefined} */
        this._directBeamTOFHistogramContrast
        variables.directBeamTOFHistogramContrast.prependListener(arg => { this._directBeamTOFHistogramContrast = arg })
        /** @type {Float64Array} */
        this._tofHistogramContrast
        variables.tofHistogramContrast.addListener(arg => {
            this._tofHistogramContrast = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._directBeamTOFHistogramContrast) {
                variables.tofHistogramContrastRatio.assign(undefined)
            } else {
                ok(this._tofHistogramContrast.length === this._directBeamTOFHistogramContrast.length)

                variables.tofHistogramContrastRatio.assign(
                    new Float64Array(this._tofHistogramContrast.length).map((_, i) => {
                        ok(this._directBeamTOFHistogramContrast)
                        return Number.isNaN(this._tofHistogramContrast[i])
                            || Number.isNaN(this._directBeamTOFHistogramContrast[i])
                            || this._directBeamTOFHistogramContrast[i] === 0
                            ? NaN
                            : this._tofHistogramContrast[i] / this._directBeamTOFHistogramContrast[i]
                    })
                )
            }
        }
    }
}
