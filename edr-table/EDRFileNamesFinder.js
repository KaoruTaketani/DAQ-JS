import { readdir } from 'fs'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._edrPath
        variables.edrPath.addListener(arg => {
            this._edrPath = arg
            this._operation()
        })
        this._operation = () => {
            readdir(this._edrPath, (err, files) => {
                if (err) throw err

                variables.edrFileNamesInnerHTML.assign(files.map(innerText => `<option>${innerText}</option>`).join(''))
            })
        }
    }
}

