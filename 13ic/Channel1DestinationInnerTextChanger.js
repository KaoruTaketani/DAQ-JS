import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._channel1Destination
        variables.channel1Destination.addListener(arg => {
            this._channel1Destination = arg
            this._operation()
        })
        this._operation = () => {
            variables.channel1DestinationInnerText.assign(this._channel1Destination.toLocaleString())
        }
    }
}

