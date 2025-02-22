import ThrottleOperator from './ThrottleOperator.js'

export default class extends ThrottleOperator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super(200)
        /** @type {number} */
        this._channel0Count
        variables.channel0Count.addListener(arg => {
            this._channel0Count = arg
            this._operation()
        })
        this._operation = () => {
            variables.channel0CountInnerText.assign(`channel 0: ${this._channel0Count.toLocaleString()} events`)
        }
    }
}

