import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._flightLengthInMeters
        variables.flightLengthInMeters.addListener(arg => {
            this._flightLengthInMeters = arg
            this._operation()
        })
        /** @type {number} */
        this._tofInMilliseconds
        variables.tofInMilliseconds.addListener(arg => {
            this._tofInMilliseconds = arg
            this._operation()
        })
        this._operation = () => {
            // console.log(`${this._tofInMilliseconds}, ${this._flightLengthInMeters}`)
            if (!this._tofInMilliseconds) return
            if (!this._flightLengthInMeters) return

            variables.velocityMessageInnerText.assign(`velocity is ${this._flightLengthInMeters / (this._tofInMilliseconds * 1e-3)} m/s`)
        }
    }
}

