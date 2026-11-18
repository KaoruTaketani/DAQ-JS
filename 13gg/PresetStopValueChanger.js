import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._presetStop
        variables.presetStop.addListener(arg => {
            this._presetStop = arg
            this._operation()
        })
        this._operation = () => {
            variables.presetStopValue.assign(this._presetStop.toString())
        }
    }
}

