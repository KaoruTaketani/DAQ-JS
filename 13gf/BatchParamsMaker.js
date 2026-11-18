import Operator from '../13/Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        this._batchParamsMakerInput
        variables.batchParamsMakerInput.addListener(arg => {
            this._batchParamsMakerInput = arg
            this._operation()
        })
        this._operation = () => {
            const args = this._batchParamsMakerInput.split('\n')
                .filter(line => line.trim() !== '')
                .map(line => line.split(':').map(word=>word.trim()))
            // console.log(args)
            variables.batchParams.assign(new URLSearchParams(args))
        }
    }
}

