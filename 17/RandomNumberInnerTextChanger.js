import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        this._randomNumber
        variables.randomNumber.addListener(arg => {
            this._randomNumber = arg
            this._operation()
        })
        this._operation = () => {
            variables.randomNumberInnerText.assign(`random number is ${this._randomNumber}`)
        }
    }
}

