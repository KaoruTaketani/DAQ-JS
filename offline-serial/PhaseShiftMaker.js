import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Float64Dataset|undefined} */
        this._directBeamPhase
        variables.directBeamPhase.prependListener(arg => { this._directBeamPhase = arg })
        /** @type {import('../lib/index.js').Float64Dataset} */
        this._phase
        variables.phase.addListener(arg => {
            this._phase = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._directBeamPhase) {
                variables.phaseShift.assign(undefined)
            } else {
                ok(this._phase.data.length === this._directBeamPhase.data.length)

                variables.phaseShift.assign({
                    shape: this._phase.shape,
                    data: new Float64Array(this._phase.shape[0]).map((_, i) => {
                        ok(this._directBeamPhase)
                        return this._phase.data[i] - this._directBeamPhase.data[i]
                    })
                })
            }
        }
    }
}
