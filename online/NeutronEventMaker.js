import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._tofDifferenceMax
        variables.tofDifferenceMax.prependListener(arg => { this._tofDifferenceMax = arg })
        /** @type {number} */
        this._tofDifferenceMin
        variables.tofDifferenceMin.prependListener(arg => { this._tofDifferenceMin = arg })
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
            if (dt > this._tofDifferenceMax) return
            if (dt < this._tofDifferenceMin) return

            const tof = (this._pairedEvent.xTOFInNanoseconds + this._pairedEvent.yTOFInNanoseconds) >> 1
            if (tof > 80_000_000) return

            variables.neutronCount.assign(this._neutronCount + 1)

            variables.neutronEvent.assign({
                tofInNanoseconds: tof,
                xPositionInPixels: this._pairedEvent.xPositionInPixels,
                yPositionInPixels: this._pairedEvent.yPositionInPixels,
                pulseheight: 0
            })
        }
    }
}
