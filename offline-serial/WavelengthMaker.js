import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._energyInMillielectronvolts
        variables.energyInMillielectronvolts.addListener(arg => {
            this._energyInMillielectronvolts = arg
            this._operation()
        })
        this._operation = () => {
            variables.wavelengthInAngstroms.assign(
                this._energyInMillielectronvolts.map(k => {
                    /** see @NeutronWavelengthByEnergy */
                    return 9.044568 / Math.sqrt(k)
                })
            )
        }
    }
}
