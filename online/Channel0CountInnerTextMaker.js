import throttle from '../lib/throttle.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._channel0Count
        variables.channel0Count.addListener(arg => {
            this._channel0Count = arg
            this._operation()
        })
        this._operation = throttle(() => {
            variables.channel0CountInnerText.assign(`channel 0: ${this._channel0Count.toLocaleString()} events`)
        }, 200)
    }
}

