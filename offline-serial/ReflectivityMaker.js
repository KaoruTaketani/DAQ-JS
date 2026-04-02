import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Float64NDArray|undefined} */
        this._directBeamNeutronRate
        variables.directBeamNeutronRate.prependListener(arg => { this._directBeamNeutronRate = arg })
        /** @type {import('../lib/index.js').Float64NDArray} */
        this._neutronRate
        variables.neutronRate.addListener(arg => {
            this._neutronRate = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._directBeamNeutronRate) {
                variables.reflectivity.assign(undefined)
            } else {
                ok(this._neutronRate.data.length === this._directBeamNeutronRate.data.length)

                variables.reflectivity.assign({
                    shape: this._neutronRate.shape,
                    data: new Float64Array(this._neutronRate.shape[0]).map((_, i) => {
                        ok(this._directBeamNeutronRate)
                        const rate = this._neutronRate.data[i]
                        const directRate = this._directBeamNeutronRate.data[i]

                        return directRate === 0 ? NaN : rate / directRate
                    })
                })
            }
        }
    }
}
