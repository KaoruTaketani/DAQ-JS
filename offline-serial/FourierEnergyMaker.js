import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {import('../lib/index.js').Float64Dataset} */
        this._fourierTimeInPicoseconds
        variables.fourierTimeInPicoseconds.addListener(arg => {
            this._fourierTimeInPicoseconds = arg
            this._operation()
        })
        this._operation = () => {
            variables.fourierEnergyInMillielectronvolts.assign({
                shape: this._fourierTimeInPicoseconds.shape,
                data: this._fourierTimeInPicoseconds.data.map(t => {
                    /** see @FourierEnergy */

                    return 4.13567 / t
                })
            })
        }
    }
}
