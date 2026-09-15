import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._neunetReaderState
        variables.neunetReaderState.addListener(arg => {
            this._neunetReaderState = arg
            this._operation()
        })
        this._operation = () => {
            variables.saveToEDRDisabled.assign(this._neunetReaderState === 'busy')
        }
    }
}

