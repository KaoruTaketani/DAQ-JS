import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._phase
        variables.phase.prependListener(arg => { this._phase = arg })
        /** @type {number[]} */
        this._directBeamPhase
        variables.directBeamPhase.addListener(arg => {
            this._directBeamPhase = arg
            this._operation()
        })
        this._operation = () => {
            ok(this._phase.length === this._directBeamPhase.length)

            const phaseShift = new Array(this._phase.length).fill(0).map((_, i) => {
                ok(this._directBeamPhase)
                return this._phase[i] - this._directBeamPhase[i]
            })
            variables.phaseShift.assign(phaseShift)
        }
    }
}
