import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._channel2Destination
        variables.channel2Destination.addListener(arg => {
            this._channel2Destination = arg
            this._operation()
        })
        this._operation = () => {
            variables.channel2DestinationInnerText.assign(this._channel2Destination.toLocaleString())
        }
    }
}

