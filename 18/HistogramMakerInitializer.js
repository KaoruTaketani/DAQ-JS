import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        variables.elementValues.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            variables.totalInnerText.assign('total is NaN')
            variables.startTimeInnerText.assign('start time is undefined')
        }
    }
}

