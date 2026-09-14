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
        this._kickerIndex
        variables.kickerIndex.prependListener(arg => { this._kickerIndex = arg })
        /** @type {Uint32Array} */
        this._neutronCountPerPulses
        variables.neutronCountPerPulses.prependListener(arg => { this._neutronCountPerPulses = arg })
        /** @type {number} */
        this._kickerTime
        variables.kickerTime.addListener(arg => {
            this._kickerTime = arg
            this._operation()
        })
        /** @type {number} */
        this._previousCount = 0
        this._operation = () => {
            if (this._neutronCount < this._previousCount) {
                // initialized
                this._neutronCountPerPulses[this._kickerIndex] = this._neutronCount
            } else {
                this._neutronCountPerPulses[this._kickerIndex] = this._neutronCount - this._previousCount
            }
            this._previousCount = this._neutronCount
        }
    }
}
