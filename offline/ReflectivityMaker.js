import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._neutronRate
        variables.neutronRate.prependListener(arg => { this._neutronRate = arg })
        /** @type {number[]} */
        this._directBeamNeutronRate
        variables.directBeamNeutronRate.addListener(arg => {
            this._directBeamNeutronRate = arg
            this._operation()
        })
        this._operation = () => {
            ok(this._neutronRate.length === this._directBeamNeutronRate.length)

            const reflectivity = new Array(this._neutronRate.length).fill(0).map((_, i) => {
                ok(this._directBeamNeutronRate)
                const rate = this._neutronRate[i]
                const directRate = this._directBeamNeutronRate[i]

                return directRate === 0 ? NaN : rate / directRate
            })
            variables.reflectivity.assign(reflectivity)
        }
    }
}
