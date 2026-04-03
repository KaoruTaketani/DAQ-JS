import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._neutronCount
        variables.neutronCount.prependListener(arg => { this._neutronCount = arg })
        /** @type {number} */
        this._kickerPulseCount
        variables.kickerPulseCount.addListener(arg => {
            this._kickerPulseCount = arg
            this._operation()
        })
        /** @type {number} */
        this._previousCount
        /** @type {number[]} */
        this._neutronPerPulse
        this._operation = () => {
            if (this._kickerPulseCount === 0) {
                this._previousCount = 0
                this._neutronPerPulse = []
            } else {
                this._neutronPerPulse.push(this._neutronCount - this._previousCount)
                this._previousCount = this._neutronCount
                variables.neutronPerPulses.assign(
                    new Uint16Array(this._neutronPerPulse)
                )
            }
        }
    }
}
