import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./OfflineVariables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {Map<string,string>} */
        this._elementVariables
        variables.elementVariables.prependListener(arg => { this._elementVariables = arg })
        /** @type {string[]} */
        this._hdf5FileNames
        variables.hdf5FileNames.addListener(arg => {
            this._hdf5FileNames = arg
            this._operation()
        })
        this._operation = () => {
            this._elementVariables.set('hdf5FileNamesInnerHTML', this._hdf5FileNames.map(fileName => `<option>${fileName}</option>`).join('\n'))
        }
    }
}
