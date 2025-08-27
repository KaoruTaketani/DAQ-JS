import Operator from '../14/Operator.js'

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
                    variables.randomNumber.assign(Math.random())
                }, 50)
            } else {
                clearInterval(this._interval)
            }
        }
    }
}

