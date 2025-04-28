import { ok } from 'assert'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('./index.js').Histogram} */
        this._pulseHeightHistogram
        variables.pulseHeightHistogram.prependListener(arg => { this._pulseHeightHistogram = arg })
        /** @type {import('./index.js').NeutronEvent} */
        this._neutronEvent
        variables.neutronEvent.addListener(arg => {
            this._neutronEvent = arg
            this._operation()
        })
        this._operation = () => {
            this._operation = () => {
                const id = Math.floor(this._neutronEvent.pulseheight)
                ok(id < this._pulseHeightHistogram.binCounts.length)

                this._pulseHeightHistogram.binCounts[id]++
            }
        }
    }
}
