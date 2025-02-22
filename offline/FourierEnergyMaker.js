import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number[]} */
        this._fourierTimeInPicoseconds
        variables.fourierTimeInPicoseconds.addListener(arg => {
            this._fourierTimeInPicoseconds = arg
            this._operation()
        })
        this._operation = () => {
            variables.fourierEnergyInMillielectronvolts.assign(
                this._fourierTimeInPicoseconds.map(t => {
                    /** see @FourierEnergy */

                    return 4.13567 / t
                })
            )
        }
    }
}
