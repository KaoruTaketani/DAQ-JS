import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumberGetterIsBusy
        variables.randomNumberGetterIsBusy.addListener(arg => {
            this._randomNumberGetterIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            variables.startButtonDisabled.assign(this._randomNumberGetterIsBusy)
        }
    }
}

