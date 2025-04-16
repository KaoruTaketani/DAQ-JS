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
        this._directBeamPhase
        variables.directBeamPhase.prependListener(arg => { this._directBeamPhase = arg })
        /** @type {number[]} */
        this._phase
        variables.phase.addListener(arg => {
            this._phase = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._directBeamFileName) return
            ok(this._phase.length === this._directBeamPhase.length)

            const phaseShift = new Array(this._phase.length).fill(0).map((_, i) => {
                ok(this._directBeamPhase)
                return this._phase[i] - this._directBeamPhase[i]
            })
            variables.phaseShift.assign(phaseShift)
        }
    }
}
