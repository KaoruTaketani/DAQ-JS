import Operator from './Operator.js'

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
        this._operation = () => {
            if (!this._randomNumberGeneratorIsBusy) return

            variables.startTimeInnerText.assign(`start time is ${new Date(Date.now()).toString()}`)
        }
    }
}

