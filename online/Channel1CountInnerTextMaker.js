import throttle from '../14n/throttle.js'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._channel1Count
        variables.channel1Count.addListener(arg => {
            this._channel1Count = arg
            this._operation()
        })
        this._operation = throttle(() => {
            variables.channel1CountInnerText.assign(`channel 1: ${this._channel1Count.toLocaleString()} events`)
        }, 200)
    }
}

