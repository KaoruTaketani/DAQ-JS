import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._frequency
        variables.frequency.addListener(arg => {
            this._frequency = arg
            this._operation()
        })
        this._operation = () => {
            console.log(`frequency: ${this._frequency}`)
        }
    }
}
