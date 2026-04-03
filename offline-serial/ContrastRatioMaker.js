import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Float64Array|undefined} */
        this._directBeamContrast
        variables.directBeamContrast.prependListener(arg => { this._directBeamContrast = arg })
        /** @type {Float64Array} */
        this._contrast
        variables.contrast.addListener(arg => {
            this._contrast = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._directBeamContrast) {
                variables.contrastRatio.assign(undefined)
            } else {
                ok(this._contrast.length === this._directBeamContrast.length)

                variables.contrastRatio.assign(
                    new Float64Array(this._contrast.length).map((_, i) => {
                        ok(this._directBeamContrast)
                        return Number.isNaN(this._contrast[i])
                            || Number.isNaN(this._directBeamContrast[i])
                            || this._directBeamContrast[i] === 0
                            ? NaN
                            : this._contrast[i] / this._directBeamContrast[i]
                    })
                )
            }
        }
    }
}
