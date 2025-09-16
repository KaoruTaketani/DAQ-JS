import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._startTime
        variables.startTime.addListener(arg => { this._startTime = arg })
        this._randomNumberGeneratorIsBusy
        variables.randomNumberGeneratorIsBusy.addListener(arg => {
            this._randomNumberGeneratorIsBusy = arg
            this._operation()
        })
        this._operation = () => {
            if (this._randomNumberGeneratorIsBusy) {
                variables.startTime.assign(Date.now())
            }
        }
    }
}


