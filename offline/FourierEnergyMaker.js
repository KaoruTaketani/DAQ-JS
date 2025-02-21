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
            const fourierEnergy = new Array(this._fourierTimeInPicoseconds.length).fill(0).map((_, i) => {
                /** see @FourierEnergy */
                const t = this._fourierTimeInPicoseconds[i]

                return 4.13567 / t
            })
            variables.fourierEnergyInMillielectronvolts.assign(fourierEnergy)
        }
    }
}
