import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._presetStart
        variables.presetStart.addListener(arg => {
            this._presetStart = arg
            this._operation()
        })
        this._presetStop
        variables.presetStop.addListener(arg => {
            this._presetStop = arg
            this._operation()
        })
        this._presetStep
        variables.presetStep.addListener(arg => {
            this._presetStep = arg
            this._operation()
        })
        this._operation = () => {
            if (this._presetStep < 0) return
            if (this._presetStart > this._presetStop) return

            variables.presets.assign([10, 20, 30, 40, 50])
            variables.batchParams.assign([
                'preset=10',
                'randomNumberGeneratorIsBusy=true',
                'preset=20',
                'randomNumberGeneratorIsBusy=true',
                'preset=30',
                'randomNumberGeneratorIsBusy=true',
                'preset=40',
                'randomNumberGeneratorIsBusy=true',
                'preset=50',
                'randomNumberGeneratorIsBusy=true'
            ])
        }
    }
}

