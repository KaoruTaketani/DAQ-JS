import Operator from './Operator.js'
import VISAQueue from './VISAQueue.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._visaParsers
        variables.visaParsers.addListener(arg => {
            this._visaParsers = arg
            this._operation()
        })
        this._operation = () => {
            variables.visaQueue.assign(new VISAQueue(this._visaParsers))
        }
    }
}