import Operator from '../13/Operator.js'
import randn from '../lib/randn.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._interval
        this._operation = () => {
            if (this._randomNumberGeneratorIsBusy) {
                this._interval = setInterval(() => {
                    const r = randn(1, 2)[0]
                    variables.randomNumber.assign([r[0] * 5 + 32, r[1] * 5 + 16])
                }, 5)
            } else {
                clearInterval(this._interval)
            }
        }
    }
}

