import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._neutronPerPulses
        variables.neutronPerPulses.prependListener(arg => { this._neutronPerPulses = arg })
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
        this._operation = () => {
            if (this._kickerPulseCount === 0) {
                this._previousCount = 0
                variables.neutronPerPulses.assign([])
            } else {
                this._neutronPerPulses.push(this._neutronCount - this._previousCount)
                this._previousCount = this._neutronCount
            }
            // console.log(`${this._neutronCounterCount} ${this._neutronPerPulses.length}`)
            // variables.neutronCounterCount.assign(0)
        }
    }
}
