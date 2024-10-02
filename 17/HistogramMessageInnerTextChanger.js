import Operator from './Operator.js'

export default class extends Operator {
    constructor(variables) {
        super()
        this._histogramTotal
        variables.histogramTotal.addListener(arg => {
            this._histogramTotal = arg
            this._operation()
        })
        this._operation = () => {
            variables.histogramMessageInnerText.assign(`total is ${this._histogramTotal}`)
        }
    }
}

