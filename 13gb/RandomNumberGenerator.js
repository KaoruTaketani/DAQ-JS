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
                    variables.randomNumber.assign(randn(1,1)[0][0])
                }, 1000)
            } else {
                clearInterval(this._interval)
            }
        }
    }
}

