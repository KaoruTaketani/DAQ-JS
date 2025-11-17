import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._phase
        variables.phase.addListener(arg => {
            this._phase = arg
            this._operation()
        })
        this._operation = () => {
            console.log(`phase: ${this._phase}`)
        }
    }
}
