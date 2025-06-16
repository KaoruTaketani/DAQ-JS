import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string[]} */
        this._hdf5FileNames
        variables.hdf5FileNames.addListener(arg => {
            this._hdf5FileNames = arg
            this._operation()
        })
        this._operation = () => {
            variables.hdf5FileNamesInnerHTML.assign(this._hdf5FileNames.map(fileName => `<option>${fileName}</option>`).join('\n'))
        }
    }
}
