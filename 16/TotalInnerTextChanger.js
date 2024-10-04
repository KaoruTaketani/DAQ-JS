import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._total
        variables.total.addListener(arg => {
            this._total = arg
            this._operation()
        })
        this._operation = () => {
            variables.totalInnerText.assign(`total is ${this._total}`)
        }
    }
}

