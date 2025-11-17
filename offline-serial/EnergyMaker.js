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
            variables.energyInMillielectronvolts.assign(
                this._velocityInMetersPerSeconds.map(v => {
                    /** see @NeutronEnergyByVelocity */
                    return 5.227e-6 * v ** 2
                })
            )
        }
    }
}
