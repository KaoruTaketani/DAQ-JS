import { readdir } from 'fs'
import { join } from 'path'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./Variables.js').default} variables 
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._edrPath
        variables.edrPath.prependListener(arg => { this._edrPath = arg })
        /** @type {string} */
        this._neunetReaderState
        variables.neunetReaderState.addListener(arg => {
            this._neunetReaderState = arg
            this._operation()
        })
        this._operation = () => {
            if (this._neunetReaderState !== 'idle') return

            readdir(this._edrPath, (err, files) => {
                if (err) throw err

                variables.edrFilePath.assign(join(this._edrPath, `rpmt_run${files.length + 1}.edr`))
            })
        }
    }
}
