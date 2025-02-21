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
            const wavelength = new Array(this._energyInMillielectronvolts.length).fill(0).map((_, i) => {
                /** see @NeutronWavelengthByEnergy */ 
                const k = this._energyInMillielectronvolts[i]
                return 9.044568 / Math.sqrt(k)
            })
            variables.wavelengthInAngstroms.assign(wavelength)
        }
    }
}
