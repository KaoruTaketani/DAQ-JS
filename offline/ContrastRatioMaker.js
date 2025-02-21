import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._contrast
        variables.contrast.prependListener(arg => { this._contrast = arg })
        /** @type {number[]} */
        this._directBeamContrast
        variables.directBeamContrast.addListener(arg => {
            this._directBeamContrast = arg
            this._operation()
        })
        this._operation = () => {
            ok(this._contrast.length === this._directBeamContrast.length)

            const contrastRatio = new Array(this._contrast.length).fill(0).map((_, i) => {
                ok(this._directBeamContrast)
                return Number.isNaN(this._contrast[i])
                    || Number.isNaN(this._directBeamContrast[i])
                    || this._directBeamContrast[i] === 0
                    ? NaN
                    : this._contrast[i] / this._directBeamContrast[i]
            })
            variables.contrastRatio.assign(contrastRatio)
        }
    }
}
