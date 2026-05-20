import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._cmax
        variables.cmax.addListener(arg => {
            this._cmax = arg
            this._operation()
        })
        this._operation = () => {
            variables.cmaxValue.assign(this._cmax.toString())
        }
    }
}

