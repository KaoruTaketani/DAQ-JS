import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._directBeamFileName
        variables.directBeamFileName.prependListener(arg => { this._directBeamFileName = arg })
        /** @type {number[]} */
        this._directBeamNeutronRate
        variables.directBeamNeutronRate.prependListener(arg => { this._directBeamNeutronRate = arg })
        /** @type {number[]} */
        this._neutronRate
        variables.neutronRate.addListener(arg => {
            this._neutronRate = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._directBeamFileName) return
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
