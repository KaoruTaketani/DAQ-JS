import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        variables.randomNumberGeneratorIsBusy.addListener(_ => {
            this._operation()
        })
        this._operation = () => {
            variables.startTimeInnerText.assign(`start time is ${new Date(Date.now()).toString()}`)
        }
    }
}

