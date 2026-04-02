import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Float64NDArray|undefined} */
        this._directBeamContrast
        variables.directBeamContrast.prependListener(arg => { this._directBeamContrast = arg })
        /** @type {import('../lib/index.js').Float64NDArray} */
        this._contrast
        variables.contrast.addListener(arg => {
            this._contrast = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._directBeamContrast) {
                variables.contrastRatio.assign(undefined)
            } else {
                ok(this._contrast.data.length === this._directBeamContrast.data.length)

                variables.contrastRatio.assign({
                    shape: [this._contrast.data.length],
                    data: new Float64Array(this._contrast.data.length).map((_, i) => {
                        ok(this._directBeamContrast)
                        return Number.isNaN(this._contrast.data[i])
                            || Number.isNaN(this._directBeamContrast.data[i])
                            || this._directBeamContrast.data[i] === 0
                            ? NaN
                            : this._contrast.data[i] / this._directBeamContrast.data[i]
                    })
                })
            }
        }
    }
}
