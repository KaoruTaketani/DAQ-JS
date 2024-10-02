import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            variables.randomNumberStartDisabled.assign(this._randomNumberGeneratorIsBusy)
        }
    }
}

