import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._tofMaxInMilliseconds
        variables.tofMaxInMilliseconds.prependListener(arg => { this._tofMaxInMilliseconds = arg })
        /** @type {number} */
        this._tofDifferenceMaxInNanoseconds
        variables.tofDifferenceMaxInNanoseconds.prependListener(arg => { this._tofDifferenceMaxInNanoseconds = arg })
        /** @type {number} */
        this._tofDifferenceMinInNanoseconds
        variables.tofDifferenceMinInNanoseconds.prependListener(arg => { this._tofDifferenceMinInNanoseconds = arg })
        /** @type {number} */
        this._neutronCount
        variables.neutronCount.prependListener(arg => { this._neutronCount = arg })
        this._pairedEvent
        variables.pairedEvent.addListener(arg => {
            this._pairedEvent = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._pairedEvent) return

            const dt = this._pairedEvent.xTOFInNanoseconds - this._pairedEvent.yTOFInNanoseconds
            if (dt > this._tofDifferenceMaxInNanoseconds) return
            if (dt < this._tofDifferenceMinInNanoseconds) return

            const tof = (this._pairedEvent.xTOFInNanoseconds + this._pairedEvent.yTOFInNanoseconds) >> 1
            if (tof > this._tofMaxInMilliseconds * 1_000_000) return

            variables.neutronCount.assign(this._neutronCount + 1)

            variables.neutronEvent.assign({
                tofInNanoseconds: tof,
                x: this._pairedEvent.xPosition,
                y: this._pairedEvent.yPosition,
                // channelEvent.pulse is 12bit, pairedEvent.pulse is sum of them.
                // to match the pulseHieghtHistogram's 10bit bints, divide here 2^4=16
                pulseheight: (this._pairedEvent.xPulseHeight + this._pairedEvent.yPulseHeight) / 16
            })
        }
    }
}
