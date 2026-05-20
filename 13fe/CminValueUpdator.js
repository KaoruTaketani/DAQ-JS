import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._cmin
        variables.cmin.addListener(arg => {
            this._cmin = arg
            this._operation()
        })
        this._operation = () => {
            variables.cminValue.assign(this._cmin.toString())
        }
    }
}

