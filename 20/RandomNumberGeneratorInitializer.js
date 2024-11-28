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
            variables.stopButtonDisabled.assign(true)
            variables.randomNumberInnerText.assign('random number is NaN')
        }
    }
}

