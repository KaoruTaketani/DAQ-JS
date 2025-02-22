import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {boolean} */
        this._usePreset
        variables.usePreset.prependListener(arg => { this._usePreset = arg })
        /** @type {number} */
        this._preset
        variables.preset.prependListener(arg => { this._preset = arg })
        /** @type {number} */
        this._kickerPulseCount
        variables.kickerPulseCount.addListener(arg => {
            this._kickerPulseCount = arg
            this._operation()
        })
        this._operation = () => {
            if (!this._usePreset) return
            if (this._kickerPulseCount < this._preset) return

            variables.neunetReaderIsBusy.assign(false)
        }
    }
}
