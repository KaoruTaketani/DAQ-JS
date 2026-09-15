import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {number} */
        this._preset
        variables.preset.addListener(arg => {
            this._preset = arg
            this._operation()
        })
        /** @type {string} */
        this._neunetReaderState
        variables.neunetReaderState.addListener(arg => {
            this._neunetReaderState = arg
            this._operation()
        })
        this._operation = () => {
            variables.startButtonDisabled.assign(this._neunetReaderState === 'busy'
                || this._preset < 0)
        }
    }
}

