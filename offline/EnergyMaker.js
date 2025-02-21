import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._velocityInMetersPerSeconds
        variables.velocityInMetersPerSeconds.addListener(arg => {
            this._velocityInMetersPerSeconds = arg
            this._operation()
        })
        this._operation = () => {
            const energy = new Array(this._velocityInMetersPerSeconds.length).fill(0).map((_, i) => {
                /** see @NeutronEnergyByVelocity */ 
                const v = this._velocityInMetersPerSeconds[i]
                return 5.227e-6 * v ** 2
            })
            variables.energyInMillielectronvolts.assign(energy)
        }
    }
}
