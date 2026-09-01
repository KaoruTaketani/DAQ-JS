import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Float64Array|undefined} */
        this._directBeamTOFHistogramPhase
        variables.directBeamTOFHistogramPhase.prependListener(arg => { this._directBeamTOFHistogramPhase = arg })
        /** @type {Float64Array} */
        this._tofHistogramPhase
        variables.tofHistogramPhase.addListener(arg => {
            this._tofHistogramPhase = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._directBeamTOFHistogramPhase) {
                variables.tofHistogramPhaseShift.assign(undefined)
            } else {
                ok(this._tofHistogramPhase.length === this._directBeamTOFHistogramPhase.length)

                variables.tofHistogramPhaseShift.assign(
                    new Float64Array(this._tofHistogramPhase.length).map((_, i) => {
                        ok(this._directBeamTOFHistogramPhase)
                        return this._tofHistogramPhase[i] - this._directBeamTOFHistogramPhase[i]
                    })
                )
            }
        }
    }
}
