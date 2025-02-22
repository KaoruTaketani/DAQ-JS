import ThrottleOperator from './ThrottleOperator.js'

export default class extends ThrottleOperator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super(200)
        /** @type {number} */
        this._channel1Count
        variables.channel1Count.addListener(arg => {
            this._channel1Count = arg
            this._operation()
        })
        this._operation = () => {
            variables.channel1CountInnerText.assign(`channel 1: ${this._channel1Count.toLocaleString()} events`)
        }
    }
}

