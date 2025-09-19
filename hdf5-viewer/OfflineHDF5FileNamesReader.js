import { readdir } from 'fs'
import { join } from 'path'
import Operator from './Operator.js'

export default class extends Operator {
    /**
     * @param {import('./OfflineVariables.js').default} variables
     */
    constructor(variables) {
        super()
        /** @type {string} */
        this._hdf5Path
        variables.hdf5Path.addListener(arg => {
            this._hdf5Path = arg
            this._operation()
        })
        this._operation = () => {
            readdir(this._hdf5Path, (err, files) => {
                if (err) throw err

                variables.hdf5FileNames.assign(files.filter(file => file.endsWith('.h5')))
            })
        }
    }
}
