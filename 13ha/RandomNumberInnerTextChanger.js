import Operator from '../13/Operator.js'
import throttle from '../lib/throttle.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = throttle(() => {
            variables.randomNumberInnerText.assign(`random number is ${this._randomNumber}`)
        }, 200)
    }
}

