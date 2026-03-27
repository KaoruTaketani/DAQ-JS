import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Float64Dataset} */
        this._energyInMillielectronvolts
        variables.energyInMillielectronvolts.addListener(arg => {
            this._energyInMillielectronvolts = arg
            this._operation()
        })
        this._operation = () => {
            variables.wavelengthInAngstroms.assign({
                shape: this._energyInMillielectronvolts.shape,
                data: this._energyInMillielectronvolts.data.map(k => {
                    /** see @NeutronWavelengthByEnergy */
                    return 9.044568 / Math.sqrt(k)
                })
            })
        }
    }
}
