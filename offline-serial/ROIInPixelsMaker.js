import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._imageBinWidthInMillimeters
        variables.imageBinWidthInMillimeters.prependListener(arg => { this._imageBinWidthInMillimeters = arg })
        /** @type {number[]} */
        this._roiInMillimeters
        variables.roiInMillimeters.addListener(arg => {
            this._roiInMillimeters = arg
            this._operation()
        })
        this._operation = () => {
            variables.roiInPixels.assign(
                this._roiInMillimeters.map(v => Math.floor(v / this._imageBinWidthInMillimeters))
            )
        }
    }
}
